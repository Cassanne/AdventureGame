/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function arena() {
        var location = {
            name: 'Een hoek van de grot waar kaarsen branden',
            fileLocation: 'GevaarlijkeGrot/Arena',
            enemies: new game.Collection([
                game.enemies.ork
            ]),
            destinations: new game.Collection(
                    {
                        text: 'De grote grot in',
                        target: game.locations.kaarsGrot
                    }
            ),
            actions: {
                ritueel: {
                    text: 'Onderzoek symbool',
                    type: 'skill',
                    action: function (game) {
                        game.currentLocation.enemies.push(game.enemies.trol);
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
})(adventureGame);