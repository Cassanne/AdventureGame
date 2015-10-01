/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.actions.flee = function (settings) {
        return {
            text: settings.text || 'Vluchten!',
            type: 'fight',
            active: function (game) {
                return !game.isEmpty(game.currentLocation, 'enemies');
            },
            action: function (game) {
                var check = game.rollDice(game.character.vlugheid + 'd6');
                var result = check * game.character.vlugheid;
                var totalHitpoints = 0;

                game.currentLocation.enemies.forEach(function (enemy) {
                    totalHitpoints += enemy.hitpoints;
                });

                if (result >= totalHitpoints / 2) {
                    game.changeLocation();
                }
                else {
                    game.logAction('Je ontsnapping mislukt!');
                };
            }
        }
    }
})(adventureGame);
