/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.items.register(function lantaren() {
        return {
            name: 'Lantaren',
            perception: 1,
            equipmentType: 'leftHand'
        };
    });

})(adventureGame);

// lantaren geeft je een +1 op je search & unlock result