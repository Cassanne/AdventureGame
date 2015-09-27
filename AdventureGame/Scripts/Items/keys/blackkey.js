/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.items.register(function blackKey() {
        return {
            name: 'Black key',
            description: 'This black iron key has a gargoyle figurine on it.',
            open: function (game) {
                return {
                    text: 'Open de deur met de zwarte sleutel',
                    action: game.actions.openWithKey({
                        success: function (game, destination) {
                            game.logLocation('Je opent de deur.');
                            destination.text = 'Donkere kamer';
                        }
                    })
                }
            }
        };
    });
})(adventureGame);