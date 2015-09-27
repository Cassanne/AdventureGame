/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.items.register(function dolk() {
        return {
            name: 'Dolk',
            damage: 1,
            equipmentType: 'rightHand'
        };
    });

})(adventureGame);

// dolk geeft je een +1 op je damage result