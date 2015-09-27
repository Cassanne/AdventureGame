/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.items.register(function zwaard() {
        return {
            name: 'Zwaard',
            damage: 3,
            equipmentType: 'rightHand'
        };
    });

})(adventureGame);
