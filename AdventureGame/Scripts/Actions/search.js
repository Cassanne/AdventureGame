﻿(function () {
    'use strict';

    adventureGame.actions.search = function (settings) {
        var text = settings.text || 'Zoek';

        return {
            text: text,
            type: 'skill',
            active: settings.active == undefined ? true : settings.active,
            action: function (game) {
                var check = game.rollDice(game.character.oplettendheid + 'd6');
                var result;
                result = check * game.character.oplettendheid;

                for (var n in game.currentLocation.actions)
                {
                    var action = game.currentLocation.actions[n];

                    if (action.text == text) {
                        delete game.currentLocation.actions[n];
                        break;
                    }
                }

                if (result >= settings.difficulty) {
                    settings.success(game);
                }
                else {
                    settings.fail(game);
                };
            }
        }
    }

})();

// Na het uitvoeren van de check moet de button inactive worden
// hoe en waar gaan items hierin meegerekend worden?