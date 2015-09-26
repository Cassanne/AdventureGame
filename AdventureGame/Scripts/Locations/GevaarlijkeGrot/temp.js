(function () {
    'use strict';

    adventureGame.locations.register(function temp() {
        var location = {
            name: 'Deze locatie bestaat nog niet',
            fileLocation: 'GevaarlijkeGrot/ATempRoom',
            destinations: new adventureGame.Collection(
                {
                    text: 'Ga terug naar de ingang',
                    target: adventureGame.locations.ingang,
                }

            ),
        };
        return location;
    });

})();

//placeholder voor locaties die ik nog moet maken