(function () {
    'use strict';

    adventureGame.locations.register(function rechtergang() {
        var location = {
            name: 'Een schemerige gang',
            fileLocation: 'GevaarlijkeGrot/Rechtergang',
            enemies: new adventureGame.Collection([
                adventureGame.enemies.reuzenvleermuis
            ]),
            destinations: new adventureGame.Collection(
                {
                    text: 'Richting het licht',
                    target: adventureGame.locations.kaarsGrot
                },
                {
                    text: 'Richting ingang',
                    target: adventureGame.locations.ingang
                }
            ),
            actions: {
                zoek: adventureGame.actions.search({
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

})();