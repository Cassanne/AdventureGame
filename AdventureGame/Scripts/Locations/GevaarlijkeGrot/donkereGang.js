(function () {
    'use strict';

    adventureGame.locations.register(function donkereGang() {
        var location = {
            name: 'Een donkere smalle gang',
            fileLocation: 'GevaarlijkeGrot/DonkereGang',
            enemies: new adventureGame.Collection([
                adventureGame.enemies.ork
            ]),
            destinations: new adventureGame.Collection(
                {
                    text: 'Richting grote grot (oost)',
                    target: adventureGame.locations.kaarsGrot
                },
                {
                    text: 'Richting kruispunt (west)',
                    target: adventureGame.locations.kruispunt
                }
            ),
        };

        return location;
    });

})();