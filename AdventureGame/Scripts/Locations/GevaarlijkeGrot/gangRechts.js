/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function gangRechts() {
        var location = {
            name: 'Een gemetselde gang',
            fileLocation: 'GevaarlijkeGrot/GangRechts',
            destinations: new game.Collection(
                {
                    text: 'Naar het kruispunt (noord)',
                    target: game.locations.kruispunt
                },
                {
                    text: 'Door de houten deur (zuid)',
                    target: game.locations.kamerEen
                }
            ),
            actions: {

            }
        };

        return location;
    });

})(adventureGame);


//SANNE: hier gaat in het spel iets mis. Beide destinations gaan naar kamerEen.