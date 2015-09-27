/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.DefinitionCollection = function () {
        var _functions = [];
        var self = this;

        self.toString = function () {
            return 'adventureGame.DefinitionCollection';
        }

        self.register = function (value) {
            if (typeof value == 'function') {
                var key = value.name;

                if (self[key]) {
                    throw new Error('Registration duplication: trying to register ' + key + ' twice.');
                }
                else {
                    Object.defineProperty(self, key, {
                        enumerable: true,
                        writable: false,
                        configurable: false,
                        value: value
                    });

                    _functions.push(value);
                }
            }
            else {
                throw new Error('Trying to register something other than a function with this collection.');
            }
        }

        self.find = function (id) {
            var result = null;

            if (typeof id == 'function') {
                id = id.name;
            }

            if (Array.prototype.find) {
                result = Array.prototype.find.call(_functions, function (x) {
                    return x.name == id;
                });
            }
            else {
                result = Array.prototype.filter.call(_functions, function (x) {
                    return x.name == id;
                })[0];
            }

            return getObject(result);
        };

        self.forEach = function (func) {
            for (var n in _functions) {
                var entity = getObject(_functions[n]);
                func(entity);
            }
        }

        self.allObjects = function () {
            var objects = [];

            for (var n in _functions) {
                objects.push(getObject(_functions[n]));
            }

            return objects;
        }

        return self;

        function getObject(func) {
            var entity = func();
            entity.id = func.name;
            return entity;
        }

    }
})(adventureGame);