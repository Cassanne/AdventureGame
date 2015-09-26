(function () {
    'use strict';

    adventureGame.locations.register(function kruispunt() {
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
            destinations: new adventureGame.Collection(
                {
                    text: 'Donkere tunnel (oost)',
                    target: adventureGame.locations.donkereGang
                },
                {
                    text: 'Nog niet! Gang (noord)',
                    target: adventureGame.locations.temp
                },
                {
                    text: 'Donkere tunnel (west)',
                    target: adventureGame.locations.kruisingWest
                },
                {
                    text: 'Gang (zuid)',
                    target: adventureGame.locations.gangRechts
                }
            ),
            actions: {

            },
        };

        return location;
    });

})();

//na zoek-check moet die button verdwijnen