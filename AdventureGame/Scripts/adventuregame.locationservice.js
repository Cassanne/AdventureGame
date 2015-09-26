(function () {
    'use strict';

    angular.module('adventureGame').factory('locationService', ['dataService', 'combatService', 'game', function (dataService, combatService, game) {
        return {
            init: init,
            changeLocation: changeLocation
        };

        function init() {
            game.changeLocation = changeLocation;
            game.currentLocation = {};
            game.previousLocation = {};
            loadWorld();
        }

        function loadWorld() {
            var loadedWorld = dataService.load(game.keys.WORLD);

            if (loadedWorld.locations) {
                game.world = loadedWorld.locations;
            }
            else {
                initWorld();
                game.world = dataService.load(game.keys.WORLD).locations;
            }

            // Add a proxy to the destination collection push function, to replace the target function pointer
            // with the target id when adding destinations and enemies at runtime.
            game.world.forEach(function (location) {
                location.destinations.push = location.destinations.push.proxy(addDestination);
                location.enemies.push = location.enemies.push.proxy(addEnemy);
            });
        }

        function addDestination() {
            var args = [].slice.apply(arguments);
            var originalFunction = args.shift();

            // Replace the target function pointer with the target id.
            for (var n in args) {
                var param = args[n];
                param.target = param.target.name;
            }

            originalFunction.apply(this, args);
        }

        function addEnemy() {
            var args = [].slice.apply(arguments);
            var originalFunction = args.shift();
            combatService.addFleeAction(game.currentLocation);
            originalFunction.apply(this, args);
        }

        function initWorld() {
            var world = new game.Collection();

            // Execute all definitions to build a pristine world.
            game.locations.forEach(function (definition) {
                var location = definition();
                location.id = definition.name;
                world.push(location);

                // Warn if a location has no destinations. This is not an error, as destinations can be
                // added and removed dynamically.
                if (!location.destinations || !location.destinations.length) {
                    console.log('No destinations specified for location ' + location.id);
                    location.destinations = new game.Collection();
                }
                else {
                    // Replace the function pointers for the destination targets with the function keys.
                    // That's all that is needed to navigate, and makes it easy to save these targets.
                    // Also set the barrier selected actions to the first one available for each barrier.
                    location.destinations.forEach(function (destination) {
                        if (typeof destination.target == 'function') {
                            destination.target = destination.target.name;
                        }

                        if (destination.barrier) {
                            for (var n in destination.barrier.actions) {
                                destination.barrier.selectedAction = n;
                                break;
                            }
                        }
                    });
                }

                // Make sure all collections are initialized properly.
                initCollection(location, ['enemies', 'items']);
                initCollection(location, ['items']);
            });

            // Save the pristine world, then load it later. This way, we always work with a saved world which
            // reduces the confusion about world state (restored from a saved game or not).
            dataService.save(game.keys.WORLD, { locations: world });
        }

        function initCollection(item, names) {
            if (names.length) {
                var key = names[0];

                if (!item[key]) {
                    item[key] = new game.Collection();
                }
                else if (item[key].toString() != 'adventureGame.Collection') {
                    throw new Error('The ' + key + 'object for location ' + item + ' is not an adventureGame collection.')
                }
                else if (names.length > 1) {
                    item[key].forEach(function (item) {
                        names.shift();
                        initCollection(item, names);
                    });
                }
            }
        }

        function changeLocation(location) {
            // remove the return message from the current location destinations.
            if (game.currentLocation.destinations) {
                game.currentLocation.destinations.forEach(function (destination) {
                    if (destination.isPreviousLocation) {
                        destination.isPreviousLocation = false;
                    }
                });
            }

            // If no location is specified, go to the previous location.
            if (!location) {
                var tempLocation = game.currentLocation;
                game.currentLocation = game.previousLocation;
                game.previousLocation = tempLocation;
                location = game.currentLocation;
            }
                // If currently at a location, make this the previous location.
            else if (!game.isEmpty(game.currentLocation)) {
                game.previousLocation = game.currentLocation;
            }

            var key = typeof location == 'function' ? location.name : location.id ? location.id : location;

            game.currentLocation = game.world.find(key);

            // Mark the previous location in the current location's destinations to allow
            // the player to more easily backtrack his last step. Also, check if the user
            // has the key for one or more barriers at this location, and add the key actions
            // if that is the case.
            if (game.currentLocation.destinations) {
                game.currentLocation.destinations.forEach(function (destination) {
                    if (destination.target && destination.target == game.previousLocation.id) {
                        destination.isPreviousLocation = true;
                    }

                    if (destination.barrier && destination.barrier.key) {
                        var key = game.character.items.find(destination.barrier.key);

                        if (key) {
                            destination.barrier.actions.openWithKey = key.open();
                        }
                    }
                });
            }

            // Save the previous and current location, then get the location text.
            dataService.save(game.keys.LOCATION, game.currentLocation.id);
            dataService.save(game.keys.PREVIOUSLOCATION, game.previousLocation.id);

            loadLocationDescriptions();

            combatService.initCombat(game.currentLocation);

            // Todo: tekst reviewen.
            game.logAction('Je komt aan in ' + game.currentLocation.name);

            // If the player hasn't been here before, play the location events.
            if (!game.currentLocation.hasVisited) {
                game.currentLocation.hasVisited = true;

                if (key != 'start') {
                    game.character.score += 1;
                }

                playEvents(game.currentLocation);
            }
        }

        function loadLocationDescriptions() {
            dataService.getLocation(game.currentLocation.fileLocation).then(function (descriptions) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(descriptions, "text/xml");
                game.currentLocation.descriptions = {};

                for (var i = 0; i < xmlDoc.childNodes.length; i++) {
                    var node = xmlDoc.childNodes[i];
                    var nameAttribute = node.attributes['name'];
                    var name = nameAttribute ? nameAttribute.value : 'default';

                    if (game.currentLocation.descriptions[name]) {
                        throw new Error('There is already a description with name ' + name + ' for location ' + game.currentLocation.id + '.');
                    }

                    game.currentLocation.descriptions[name] = node.textContent;
                }

                // A location can specify how to select the proper selection using a descriptor selection function. If it is not specified,
                // use the default description selector function.
                if (game.currentLocation.descriptionSelector) {
                    game.currentLocation.text = game.currentLocation.descriptionSelector();
                }
                else {
                    game.currentLocation.text = defaultDescriptionSelector();
                }

                // If the description selector did not return a text, use the default description.
                if (!game.currentLocation.text) {
                    game.currentLocation.text = game.currentLocation.descriptions['default'];
                }
            });
        }

        function defaultDescriptionSelector() {
            return game.currentLocation.descriptions['default'];
        }

        function playEvents(location) {
            for (var n in location.events) {
                location.events[n](game);
            }
        }
    }]);
})();