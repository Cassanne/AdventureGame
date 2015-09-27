/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.items.register(function healingPotion() {
        return {
            name: 'Toverdrank',
            use: game.actions.heal({
                potency: '1d8'
            })
        };
    });

})(adventureGame);
