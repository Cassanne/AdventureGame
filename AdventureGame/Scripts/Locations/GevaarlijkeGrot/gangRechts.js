(function () {
    'use strict';

    adventureGame.locations.register(function gangRechts() {
        var location = {
            name: 'Een gemetselde gang',
            fileLocation: 'GevaarlijkeGrot/GangRechts',
            destinations: new adventureGame.Collection(
                {
                    text: 'Naar het kruispunt (noord)',
                    target: adventureGame.locations.kruispunt
                },
                {
                    text: 'Door de houten deur (zuid)',
                    target: adventureGame.locations.kamerEen
                }
            ),
            actions: {

            }
        };

        return location;
    });

})();


//SANNE: hier gaat in het spel iets mis. Beide destinations gaan naar kamerEen.