/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function kruispunt() {
        var location = {
            name: 'Een kruispunt',
            fileLocation: 'GevaarlijkeGrot/Kruispunt',
            events: {
                hearork: function (game) {
                    var orkCorridor = game.world.find(game.locations.donkereGang);
                    var orkPresent = !orkCorridor.hasVisited;

                    if (game.character.oplettendheid > 2 && orkPresent) {
                        game.logLocation('Je hoort vanuit de westelijke gang een snuivende ademhaling.');
                    }
                }
            },
            destinations: new game.Collection(
                {
                    text: 'Donkere tunnel (oost)',
                    target: game.locations.donkereGang
                },
                {
                    text: 'Nog niet! Gang (noord)',
                    target: game.locations.temp
                },
                {
                    text: 'Donkere tunnel (west)',
                    target: game.locations.kruisingWest
                },
                {
                    text: 'Gang (zuid)',
                    target: game.locations.gangRechts
                }
            ),
            actions: {

            },
        };

        return location;
    });

})(adventureGame);
