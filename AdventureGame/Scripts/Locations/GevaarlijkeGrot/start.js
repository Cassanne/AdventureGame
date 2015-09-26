(function () {
    'use strict';

    adventureGame.locations.register(function start() {
        var location = {
            name: 'De ingang van de Gevaarlijke Grot',
            fileLocation: 'GevaarlijkeGrot/Start',
            destinations: new adventureGame.Collection(
                {
                    text: 'Ga de grot in',
                    target: adventureGame.locations.ingang,
                }

            ),
            actions: {
                zoek: adventureGame.actions.search({
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

})();

//willen we hier nog een knop 'remake character' oid? En een 'go home' (voor de humor)?