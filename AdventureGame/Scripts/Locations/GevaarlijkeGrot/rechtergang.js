/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function rechtergang() {
        var location = {
            name: 'Een schemerige gang',
            fileLocation: 'GevaarlijkeGrot/Rechtergang',
            enemies: new game.Collection([
                game.enemies.reuzenvleermuis
            ]),
            destinations: new game.Collection(
                {
                    text: 'Richting het licht',
                    target: game.locations.kaarsGrot
                },
                {
                    text: 'Richting ingang',
                    target: game.locations.ingang
                }
            ),
            actions: {
                zoek: game.actions.search({
                    difficulty: 8,
                    success: function (game) {
                        game.logLocation('Je ruikt de geur van brandende kaarsen.')
                    },
                    fail: function (game) {
                        game.logLocation('Er zijn hier heel veel vleermuizen. En heel veel vleermuispoep.');
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);