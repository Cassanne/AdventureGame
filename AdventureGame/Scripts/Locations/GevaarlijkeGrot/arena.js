(function () {
    'use strict';

    adventureGame.locations.register(function arena() {
        var location = {
            name: 'Een hoek van de grot waar kaarsen branden',
            fileLocation: 'GevaarlijkeGrot/Arena',
            enemies: new adventureGame.Collection([
                adventureGame.enemies.ork
            ]),
            destinations: new adventureGame.Collection(
                    {
                        text: 'De grote grot in',
                        target: adventureGame.locations.kaarsGrot
                    }
            ),
            actions: {
                ritueel: {
                    text: 'Onderzoek symbool',
                    type: 'skill',
                    action: function (game) {
                        game.currentLocation.enemies.push(adventureGame.enemies.trol);
                        game.logAction('Er verschijnt op magische wijze een enorme trol waar het symbool was! Hij valt je aan!');
                    }
                },
            }
        };

        var ork = location.enemies[0];
        ork.onDefeat = onDefeat;

        return location;
    });

    function onDefeat(game) {
        var randomEnemy = game.actions.randomEnemy(game);
        randomEnemy.onDefeat = this.onDefeat;
    }
})();