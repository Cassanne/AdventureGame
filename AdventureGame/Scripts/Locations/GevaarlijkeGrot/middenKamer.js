/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function middenKamer() {
        var location = {
            name: 'Een opslagkamer',
            fileLocation: 'GevaarlijkeGrot/MiddenKamer',
            destinations: new game.Collection(
                {
                    text: 'De kamer van de ork',
                    target: game.locations.kamerEen
                }
            ),
            actions: {
                zoek: game.actions.search({
                    difficulty: 9,
                    success: function (game) {
                        game.logLocation('Je vindt een schild!');
                        game.character.items.push(game.items.kleinSchild);
                    },
                    fail: function (game) {
                        game.logLocation('Je vindt niets.');
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);

// nog een item toevoegen om te vinden. bij voorkeur healing potion