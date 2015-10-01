/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.actions.inspect = function (settings) {
        return function (game, destination, barrier, action) {
            for (var n in barrier.actions) {
                var currentAction = barrier.actions[n];

                if (currentAction == action) {
                    delete barrier.actions[n];
                    
                    for (var n in barrier.actions) {
                        barrier.selectedAction = n;
                        break;
                    }

                    break;
                }
            }

            if (settings.text) {
                game.logLocation(settings.text);
            }
        }
    }

})(adventureGame);