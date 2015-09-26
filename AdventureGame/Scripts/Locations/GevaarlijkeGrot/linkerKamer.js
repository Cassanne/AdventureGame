(function () {
    'use strict';

    adventureGame.locations.register(function linkerKamer() {
        var location = {
            name: 'De slaapkamer van de orks',
            fileLocation: 'GevaarlijkeGrot/LinkerKamer',
            enemies: new adventureGame.Collection(
                adventureGame.enemies.ork,
                adventureGame.enemies.goblin
            ),
            destinations: new adventureGame.Collection(
                {
                    text: 'De kamer van de ork',
                    target: adventureGame.locations.kamerEen
                }
            ),
            actions: {
            }
        };

        return location;
    });

})();

// de twee tegenstanders vallen nog niet tegelijk aan. Ik zou ze unieke namen kunnen geven