/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function start() {
        var location = {
            name: 'De ingang van de Gevaarlijke Grot',
            fileLocation: 'GevaarlijkeGrot/Start',
            destinations: new game.Collection(
                {
                    text: 'Ga de grot in',
                    target: game.locations.ingang,
                }

            ),
            actions: {
                zoek: game.actions.search({
                    difficulty: 10,
                    success: function (game) {
                        game.logLocation('Aan de achterkant van het waarschuwingsbord staan enkele runen in de taal van de orken en trollen. Je kan deze taal helaas niet lezen. Het lijkt erop dat er bloed gebruikt is als inkt.')
                    },
                    fail: function (game) {
                        game.logLocation('Je ziet gras, bomen en struiken. Alle plantengroei stopt een paar centimeter buiten de grot. Binnen is het donker.');
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);

//willen we hier nog een knop 'remake character' oid? En een 'go home' (voor de humor)?