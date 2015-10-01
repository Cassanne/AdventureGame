/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.actions.heal = function (settings) {
        return function (game, item) {
            var healed = game.rollDice(settings.potency);
            game.character.currentHitpoints += healed;

            if (item.charges) {
                item.charges--;
            }

            if (!item.charges) {
                game.character.items.remove(item);
            }
        }
    }
})(adventureGame);