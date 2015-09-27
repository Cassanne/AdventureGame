/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.items.register(function kleinSchild() {
        return {
            name: 'Klein schild',
            defense: 2,
            equipmentType: 'leftHand'
        };
    });

})(adventureGame);

