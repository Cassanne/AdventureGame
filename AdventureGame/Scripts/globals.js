/// <reference path="_references.js" />
var adventureGame = adventureGame || {};

(function (game) {
    'use strict';

    if (Function.prototype.name === undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                return /function ([^(]*)/.exec(this + "")[1];
            }
        });
    }

    if (Function.prototype.proxy === undefined) {
        Function.prototype.proxy = function (proxyFunction) {
            var self = this;

            return (function () {
                return function () {
                    var args = [].slice.call(arguments);
                    args.splice(0, 0, self);
                    return proxyFunction.apply(this, args);
                }
            })();
        }
    }

    game.isEmpty = function (object, property) {
        var objectToCheck = property ? object[property] : object;
        return objectToCheck ? Object.keys(objectToCheck).length == 0 : true;
    }

})(adventureGame);