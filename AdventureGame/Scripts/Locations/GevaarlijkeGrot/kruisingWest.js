/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function kruisingWest() {
        var location = {
            name: 'Een donkere gemetselde gang',
            fileLocation: 'GevaarlijkeGrot/KruisingWest',
            enemies: new game.Collection(
                game.enemies.goblin
            ),
            destinations: new game.Collection(
                {
                    text: 'Richting kruispunt (oost)',
                    target: game.locations.kruispunt
                },
                {
                    text: 'Deur (west)',
                    target: game.locations.arena,
                    barrier: {
                        text: 'Metalen deur',
                        key: game.items.blackKey,
                        actions: {
                            inspect:
                        {
                            text: 'Onderzoek de deur',
                            action: game.actions.inspect({ text: 'Een deur van een dof grijs metaal, met een rode deurknop. Op de deur staat een grote afbeelding: een rood zwaard. Zodra je het handvat aanraakt, gloeit het zwaard op met een rood licht. De deur is niet op slot.' })
                        },
                            open:
                        {
                            text: 'Open de deur',
                            action: game.actions.open({
                                success: function (game, destination) {
                                    game.logLocation('Je opent de deur.');
                                    destination.text = 'Donkere kamer';
                                }
                            })
                        }
                        }
                    }
                }
            ),
        };

        return location;
    });
})(adventureGame);