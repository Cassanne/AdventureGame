(function () {
    'use strict';

    adventureGame.locations.register(function ingang() {
        var location = {
            name: 'De grot',
            // Example
            //descriptionSelector: function() {
            //    return game.currentLocation.descriptions['lantern'];
            //},
            //navigationDisabled: true,
            fileLocation: 'GevaarlijkeGrot/Ingang',
            items: new adventureGame.Collection(
                adventureGame.items.lantaren,
                adventureGame.items.healingPotion,
                adventureGame.items.zwaard
            ),
            events: {
                scentBlood: function (game) {
                    if (game.character.oplettendheid > 1) {
                        game.logLocation('Je ruikt bloed.');
                    }
                }
            },
            destinations: new adventureGame.Collection(
                {
                    text: 'Donkere gang (west)',
                    target: adventureGame.locations.linkergang
                },
                {
                    text: 'Schemerige gang (oost)',
                    target: adventureGame.locations.rechtergang
                }
            ),
            actions: {
                zoek: adventureGame.actions.search({
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

})();

//na zoek-check moet die button verdwijnen