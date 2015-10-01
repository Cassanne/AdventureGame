/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.actions.open = function (settings) {
        return function (game, destination, barrier, action) {
            delete destination.barrier;

            if (settings.success) {
                settings.success(game, destination);
            }
        }
    }

})(adventureGame);