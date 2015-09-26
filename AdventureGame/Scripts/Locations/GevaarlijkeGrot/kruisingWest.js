(function () {
    'use strict';

    adventureGame.locations.register(function kruisingWest() {
        var location = {
            name: 'Een donkere gemetselde gang',
            fileLocation: 'GevaarlijkeGrot/KruisingWest',
            enemies: new adventureGame.Collection(
                adventureGame.enemies.goblin
            ),
            destinations: new adventureGame.Collection(
                {
                    text: 'Richting kruispunt (oost)',
                    target: adventureGame.locations.kruispunt
                },
                {
                    text: 'Deur (west)',
                    target: adventureGame.locations.arena,
                    barrier: {
                        text: 'Metalen deur',
                        key: adventureGame.items.blackKey,
                        actions: {
                            inspect:
                        {
                            text: 'Onderzoek de deur',
                            action: adventureGame.actions.inspect({ text: 'Een deur van een dof grijs metaal, met een rode deurknop. Op de deur staat een grote afbeelding: een rood zwaard. Zodra je het handvat aanraakt, gloeit het zwaard op met een rood licht. De deur is niet op slot.' })
                        },
                            open:
                        {
                            text: 'Open de deur',
                            action: adventureGame.actions.open({
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
})();