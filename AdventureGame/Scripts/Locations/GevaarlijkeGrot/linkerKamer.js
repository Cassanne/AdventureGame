/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function linkerKamer() {
        var location = {
            name: 'De slaapkamer van de orks',
            fileLocation: 'GevaarlijkeGrot/LinkerKamer',
            enemies: new game.Collection(
                game.enemies.ork,
                game.enemies.goblin
            ),
            destinations: new game.Collection(
                {
                    text: 'De kamer van de ork',
                    target: game.locations.kamerEen
                }
            ),
            actions: {
            }
        };

        return location;
    });

})(adventureGame);
