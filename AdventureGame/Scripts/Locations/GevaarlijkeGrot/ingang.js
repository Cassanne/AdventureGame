/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function ingang() {
        var location = {
            name: 'De grot',
            // Example
            //descriptionSelector: function() {
            //    return game.currentLocation.descriptions['lantern'];
            //},
            //navigationDisabled: true,
            fileLocation: 'GevaarlijkeGrot/Ingang',
            items: new game.Collection(
                game.items.lantaren,
                game.items.healingPotion,
                game.items.zwaard
            ),
            events: {
                scentBlood: function (game) {
                    if (game.character.oplettendheid > 1) {
                        game.logLocation('Je ruikt bloed.');
                    }
                }
            },
            destinations: new game.Collection(
                {
                    text: 'Donkere gang (west)',
                    target: game.locations.linkergang
                },
                {
                    text: 'Schemerige gang (oost)',
                    target: game.locations.rechtergang
                }
            ),
            actions: {
                zoek: game.actions.search({
                    difficulty: 5,
                    success: function (game) {
                        game.logLocation('Op de muur staat een pijl, getekend met bloed. Hij wijst naar de rechtergang.')
                    },
                    fail: function (game) {
                        game.logLocation('Je vindt alleen stenen en stof.');
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);

//na zoek-check moet die button verdwijnen