/// <reference path="_references.js" />
(function () {
    'use strict';

    angular.module('adventureGame').factory('gameService', ['dataService', 'locationService', 'characterService', 'combatService', 'game', function (dataService, locationService, characterService, combatService, game) {
        return {
            init: init,
            startNewGame: startNewGame,
            saveGame: saveGame,
            restart: restart,
            reset: reset,
            watchGameState: watchGameState
        };

        function init() {
            locationService.init();
            characterService.init();
            combatService.init();

            game.highScores = dataService.load(game.keys.HIGHSCORES);

            game.actionLog = [];

            game.logLocation = function (message) {
                game.currentLocation.log = game.currentLocation.log || [];
                game.currentLocation.log.push(message);
            }

            game.logAction = function (message) {
                game.actionLog.splice(0, 0, message);
            }

            game.rollDice = rollDice;
            game.calculateBonus = calculateBonus;

            var locationName = dataService.load(game.keys.LOCATION);

            if (locationName) {
                var lastLocation = game.world.find(locationName);

                var previousLocationName = dataService.load(game.keys.PREVIOUSLOCATION);

                if (previousLocationName) {
                    game.previousLocation = game.world.find(previousLocationName);
                }

                locationService.changeLocation(lastLocation);
                game.state = 'play';
            }
            else {
                game.state = 'createCharacter';
            }
        }

        function startNewGame() {
            characterService.buildCharacter();
            dataService.save(game.keys.CHARACTER, game.character);
            locationService.changeLocation(game.locations.start);
        }

        function saveGame() {
            dataService.save(game.keys.CHARACTER, game.character);
            dataService.save(game.keys.WORLD, { locations: game.world });
        }

        function restart() {
            dataService.save(game.keys.CHARACTER, {});
            dataService.save(game.keys.LOCATION, '');
            dataService.save(game.keys.PREVIOUSLOCATION, '');
            dataService.save(game.keys.WORLD, {});
            init();
        }

        function reset() {
            dataService.save(game.keys.WORLD, {});
            //dataService.save(game.keys.HIGHSCORES, []);
            locationService.init();
            var location = dataService.load(game.keys.LOCATION);

            if (location) {
                locationService.changeLocation(location);
            }
        }

        function rollDice(input) {
            //'xdy+/-z'

            var positiveModifier = input.indexOf('+') > -1;
            var splitResult = input.split('d');
            var numberOfDice = parseInt(splitResult[0]);
            splitResult = positiveModifier ? splitResult[1].split('+') : splitResult[1].split('-');
            var dieCount = parseInt(splitResult[0]);
            var bonus = parseInt(splitResult[1]);
            bonus = isNaN(bonus) ? 0 : bonus;
            bonus = positiveModifier ? bonus : bonus * -1;

            var result = 0;

            for (var i = 0; i < numberOfDice; i++) {
                result += Math.floor(Math.random() * dieCount + 1);
            }

            result += bonus;

            return result;
        }

        function calculateBonus(person, type) {
            var bonus = 0;

            if (game.character == person) {
                for (var n in person.equipment) {
                    var item = person.equipment[n];

                    if (item[type]) {
                        bonus += item[type];
                    }
                };
            }
            else {
                if (person.items && person.items.each) {
                    person.items.forEach(function (item) {
                        if (item[type]) {
                            bonus += item[type];
                        }
                    });
                }
            }

            return bonus;
        }

        function watchGameState(newValue, oldValue) {
            if (newValue == 'gameOver' || newValue == 'victory') {
                updateHighScore();
            }
        }

        function updateHighScore() {
            var scoreEntry = { name: game.character.name, score: game.character.score };

            if (!game.highScores || !game.highScores.length) {
                game.highScores = [];
            }

            var scoreAdded = false;

            for (var n in game.highScores) {
                var entry = game.highScores[n];

                if (game.character.score > entry.score) {
                    if (game.highScores.length >= 5) {
                        game.highScores.splice(n, 1, scoreEntry);
                        break;
                    }
                    else {
                        game.highScores.splice(n, 0, scoreEntry);
                        scoreAdded = true;
                        break;
                    }
                }
            }

            if (game.highScores.length < 5 && !scoreAdded) {
                game.highScores.push(scoreEntry);
            }

            dataService.save(game.keys.HIGHSCORES, game.highScores);
        }
    }]);
})();