/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.Collection = function (collection) {
        var self = new Array();

        self.toString = function () {
            return 'adventureGame.Collection';
        };

        self.push = function () {
            for (var n in arguments) {
                var value = arguments[n];

                if (typeof value == 'function') {
                    var id = value.name;
                    value = value();
                    value.id = id;
                }

                Array.prototype.push.call(self, value);
            }
        };

        self.find = function (id) {
            var result = null;

            if (typeof id == 'function') {
                id = id.name;
            }

            if (Array.prototype.find) {
                return Array.prototype.find.call(self, function (x) {
                    return x.id == id || (x.target && x.target == id || (typeof x.target == 'function' && x.target.name == id));
                });
            }
            else {
                return Array.prototype.filter.call(self, function (x) {
                    return x.id == id || (x.target && x.target == id || (typeof x.target == 'function' && x.target.name == id));
                })[0];
            }
        };

        self.filter = function (id) {
            if (typeof id == 'function') {
                id = id.name;
            }

            return Array.prototype.filter.call(self, function (x) {
                return x.name == id || (x.target && x.target == id || (typeof x.target == 'function' && x.target.name == id));
            })[0];
        }

        self.remove = function (item) {
            var index = self.findIndex(function (x) {
                return x === item || (item.id && x.id && item.id === x.id);
            });

            self.splice(index, 1);
        };

        self.clear = function () {
            Array.prototype.splice.call(self, self.length);
        }

        for (var n in arguments) {
            var argument = arguments[n];

            if (argument instanceof Array) {
                for (var i in argument) {
                    self.push(argument[i]);
                }
            }
            else {
                self.push(argument);
            }
        }

        return self;
    };
})(adventureGame);