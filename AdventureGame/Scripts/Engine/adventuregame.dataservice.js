/// <reference path="_references.js" />
(function () {
    'use strict';

    angular.module('adventureGame').factory('dataService', ['$q', '$http', '$localStorage', 'game', function ($q, $http, $localStorage, game) {
        return {
            getLocation: getLocation,
            save: save,
            load: load
        };

        function getLocation(locationName) {
            var deferred = $q.defer();
            var url = '/Content/' + locationName + '.html';

            $http.get(url)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data, status);
                });

            return deferred.promise;
        }

        function save(key, value) {
            var clone = cloneAndTransform(value);
            $localStorage[key] = JSON.stringify({ data: clone });
        }

        function load(key) {
            try {
                var savedValue = JSON.parse($localStorage[key]).data;
                savedValue = restoreCollectionsAndFunctions(savedValue);
                return savedValue;
            }
            catch (exception) {
                console.log('No data loaded for key ' + key);
            }
        }

        function cloneAndTransform(item, chainPointer) {
            if (!item) {
                return;
            }

            var clone = {};
            var chainPointer = chainPointer || '';

            if (typeof item !== "object") {
                return item;
            }

            if (item.id) {
                chainPointer += '_' + item.id;
            }

            if (item.target) {
                chainPointer += '_' + item.target;
            }
            for (var key in item) {
                if (!item.hasOwnProperty(key)) {
                    continue;
                }

                // Ignore combat actions, they should be reapplied on init combat when a location loads.
                if (key == 'combatActions') {
                    continue;
                }

                var value = item[key];

                if (value.toString() == 'adventureGame.Collection') {
                    clone[key + 'ItemCollection'] = [];

                    // For collections, point to the default object. This allows restoring functions on items added to collections
                    // at runtime.
                    var pointer = game[key] ? '_' + key : chainPointer + '_' + key;

                    value.forEach(function (entry) {
                        clone[key + 'ItemCollection'].push(cloneAndTransform(entry, pointer));
                    });
                }
                else if (typeof value === "object" && value) {
                    clone[key] = cloneAndTransform(item[key], chainPointer + '_' + key);
                }
                else if (typeof value == 'function') {
                    clone[key] = getFunctionPointerOrStringValue(chainPointer, item, key);
                }
                else {
                    clone[key] = value;
                }
            }

            return clone;
        }

        function getFunctionPointerOrStringValue(chainPointer, item, key) {
            // Check whether the function exists on the original entity. If it does, return a pointer
            // to that function. If it does not, the function was added at runtime and must be saved
            // as a string.
            var pointerParts = chainPointer.split('_');
            pointerParts.shift();

            // Is there a definition collection for this pointer?
            var definitionCollection = game[pointerParts[0]];
            var original;

            if (definitionCollection) {
                // Get the original entity.
                original = definitionCollection[pointerParts[1]]();

                if (original) {
                    pointerParts.shift();
                    pointerParts.shift();

                    // Traverse the original entity and its collections to get to the key value;
                    for (var n in pointerParts) {
                        if (original.toString() == 'adventureGame.Collection') {
                            original = original.find(pointerParts[n]);
                        }
                        else {
                            original = original[pointerParts[n]];
                        }

                        if (!original) {
                            break;
                        }
                    }
                }
            }

            if (!original || !original[key]) {
                original = game.actions[key];

                if (original) {
                    return '_fp_actions_' + key;
                }
                    // If the original does not have the function, return the function's string value;
                else {
                    return item[key].toString();
                }
            }

            // Either there is no definition collection or the original also has the function. Return
            // the function pointer.
            return '_fp' + chainPointer;
        }

        function restoreCollectionsAndFunctions(item) {
            if (!item) {
                return;
            }

            if (typeof item !== "object") {
                return item;
            }

            var arrayObject = getArrayForObject(item);

            if (arrayObject) {
                item = arrayObject;

                for (var n in arrayObject) {
                    restoreCollectionsAndFunctions(arrayObject[n]);
                }

                return item;
            }

            for (var key in item) {
                if (!item.hasOwnProperty(key)) {
                    continue;
                }

                var value = item[key];

                if (value) {
                    var collectionName;

                    if (key.indexOf('ItemCollection') != -1) {
                        var collectionKey = key.replace('ItemCollection', '');
                        item[collectionKey] = new game.Collection(value);

                        item[collectionKey].forEach(function (entry) {
                            restoreCollectionsAndFunctions(entry);
                        });

                        delete item[key];
                    }
                    else if (typeof value === "object") {
                        var arrayObject = getArrayForObject(item[key]);

                        if (arrayObject) {
                            item[key] = arrayObject;

                            for (var n in arrayObject) {
                                restoreCollectionsAndFunctions(arrayObject[n]);
                            }
                        }
                        else {
                            restoreCollectionsAndFunctions(item[key]);
                        }
                    }

                    if (typeof value == 'string') {
                        if (value.substring(0, 3) == '_fp') {
                            var pointerParts = value.split('_');
                            pointerParts.shift();
                            pointerParts.shift();
                            var functionPointer = game;

                            for (var n in pointerParts) {
                                if (functionPointer.toString() == 'adventureGame.Collection' || functionPointer.toString() == 'adventureGame.DefinitionCollection') {
                                    functionPointer = functionPointer.find(pointerParts[n]);
                                }
                                else {
                                    functionPointer = functionPointer[pointerParts[n]];
                                }
                            }

                            item[key] = functionPointer[key];
                        }
                        else if (value.indexOf('function ') == 0) {
                            item[key] = eval('(' + value + ')');
                        }
                    }
                }
            }

            return item;
        }

        function getArrayForObject(item) {
            var isArray = !game.isEmpty(item);

            for (var n in item) {
                if (isNaN(parseInt(n))) {
                    isArray = false;
                    break;
                }
            }

            if (!isArray) {
                return;
            }

            var newArray = [];

            for (var n in item) {
                newArray.push(item[n]);
            }

            return newArray;
        }
    }]);
})();