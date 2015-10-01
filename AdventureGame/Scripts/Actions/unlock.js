/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.actions.unlock = function (settings) {
        return {
            text: settings.text || 'Slot openen',
            type: 'skill',
            active: settings.active == undefined ? true : settings.active,
            action: function (game) {
                var check = game.rollDice(game.character.vlugheid + 'd6');
                var result;
                result = check * game.character.vlugheid;

                if (result >= settings.difficulty) {
                    settings.success(game);
                }
                else {
                    settings.fail(game);
                    game.logAction('Het lukt niet.');
                };
            }
        }
    }

})(adventureGame);

//deze button moet active blijven, behalve bij een critical fail misschien. Dus een extra setting, kan dat? 
// Of kunnen we bijvoorbeeld drie pogingen geven voor hij inactive wordt?