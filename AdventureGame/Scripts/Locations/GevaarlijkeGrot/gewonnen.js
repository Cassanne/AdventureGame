/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function gewonnen() {
        var location = {
            name: 'Gewonnen!',
            fileLocation: 'GevaarlijkeGrot/Gewonnen',
            actions: {
                links: {
                    text: 'Begin overnieuw',
                    type: 'move',
                    action: function (game) {
                        game.restart();
                    },
                },
            }
        };

        return location;
    });

})(adventureGame);

//deze moet vervangen worden door een modal, ipv een locatie. Maar misschien zijn er meerdere eindes, dus even over nadenken nog.