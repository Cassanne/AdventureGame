/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.actions.openWithKey = function (settings) {
        return function (game, destination, barrier, action) {
            // Todo: remove the key used from the character's inventory.

            delete destination.barrier;

            if (settings.success) {
                settings.success(game, destination);
            }
        }
    }
})(adventureGame);