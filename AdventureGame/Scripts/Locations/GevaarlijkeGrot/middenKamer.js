(function () {
    'use strict';

    adventureGame.locations.register(function middenKamer() {
        var location = {
            name: 'Een opslagkamer',
            fileLocation: 'GevaarlijkeGrot/MiddenKamer',
            destinations: new adventureGame.Collection(
                {
                    text: 'De kamer van de ork',
                    target: adventureGame.locations.kamerEen
                }
            ),
            actions: {
                zoek: adventureGame.actions.search({
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

})();

// nog een item toevoegen om te vinden. bij voorkeur healing potion