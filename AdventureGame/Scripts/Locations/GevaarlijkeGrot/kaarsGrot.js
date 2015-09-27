/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function kaarsGrot() {
        var location = {
            name: 'Een grot met kaarslicht',
            fileLocation: 'GevaarlijkeGrot/KaarsGrot',

            destinations: new game.Collection(
                {
                    text: 'Onderzoek het kaarslicht',
                    target: game.locations.arena
                },
                {
                    text: 'Sluip naar de donkere gang',
                    target: game.locations.donkereGang
                },
                {
                    text: 'Richting ingang',
                    target: game.locations.rechtergang
                }
            ),
            actions: {
                zoek: game.actions.search({
                    difficulty: 12,
                    success: function (game) {
                        game.logLocation('Je voelt dat hier kortgeleden sterke magie gebruikt is. Ook zie je aan sporen op de vloer dat hier vaak orks lopen.')
                    },
                    fail: function (game) {
                        game.logAction('Terwijl je rondzoekt, struikel je over een losse steen en maak je veel herrie. Er komt een ork op af!');
                        game.currentLocation.enemies.push(game.enemies.ork);
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);