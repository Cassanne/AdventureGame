/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function temp() {
        var location = {
            name: 'Deze locatie bestaat nog niet',
            fileLocation: 'GevaarlijkeGrot/ATempRoom',
            destinations: new game.Collection(
                {
                    text: 'Ga terug naar de ingang',
                    target: game.locations.ingang,
                }

            ),
        };
        return location;
    });

})(adventureGame);

//placeholder voor locaties die ik nog moet maken