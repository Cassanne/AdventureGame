/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function donkereGang() {
        var location = {
            name: 'Een donkere smalle gang',
            fileLocation: 'GevaarlijkeGrot/DonkereGang',
            enemies: new game.Collection([
                game.enemies.ork
            ]),
            destinations: new game.Collection(
                {
                    text: 'Richting grote grot (oost)',
                    target: game.locations.kaarsGrot
                },
                {
                    text: 'Richting kruispunt (west)',
                    target: game.locations.kruispunt
                }
            ),
        };

        return location;
    });

})(adventureGame);