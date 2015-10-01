/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function deurEen() {
        var location = {
            name: 'Een donkere gang met een deur',
            fileLocation: 'GevaarlijkeGrot/DeurEen',
            destinations: new game.Collection(
                {
                    text: 'De kamer in',
                    target: game.locations.kamerEen
                },
                {
                    text: 'Donkere gang',
                    target: game.locations.linkergang
                }
            ),
            actions: {
                schoppen: {
                    text: 'Schop tegen de deur',
                    type: 'fight',
                    action: function (game) {
                        var check = Math.floor(Math.random() * 6 + 1);
                        var result;
                        result = check * game.character.kracht;

                        if (result > 8) {
                            game.changeLocation(game.locations.kamerEen);
                            game.logLocation('Met een enorme klap schop je de deur doormidden. Je hoort een verrast gegrom en ziet een ork opspringen.');
                        }
                        else {
                            game.logAction('Auw je tenen!! De deur is nog heel.');
                        };
                    }
                },

                inbreken: game.actions.unlock({
                    difficulty: 10,
                    success: function (game) {
                        game.changeLocation(game.locations.kamerEen);
                        game.logLocation('Met meegebrachte pinnetjes duw je in het slot op het mechanisme tot je een klik voelt. De deur is open!');
                        game.logLocation('Je duwt de deur open en kijkt naar binnen.');
                    },
                    fail: function (game) {
                    }
                }),

                zoek: game.actions.search({
                    difficulty: 10,
                    success: function (game) {
                        game.logLocation('Je tast de deur, vloer en muren af. Hoog aan de rechtermuur vind je aan een haakje een grote sleutel!')
                    },
                    fail: function (game) {
                        game.logLocation('Je tast de deur, vloer en muren af. Stenen, hout en gruis. Je vindt niets nuttigs.');
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);

// De destination 'west' hier moet pas beschikbaar zijn na succesvolle skill-check (1 van de drie). Item sleutel nog maken, of sleutel-actie?
// Schoppen moet ook een effect krijgen (een status?) bijv. dat de orks dan alert zijn, of dat sneaken niet meer kan
// Kan ik de sleutel een effect laten hebben op de 'open het slot' actie? Of kan ik dat beter vanuit het item regelen?