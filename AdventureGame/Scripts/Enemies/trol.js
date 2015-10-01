/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.enemies.register(function trol() {
        return {
            name: 'Trol',
            hitpoints: 20,
            attack: '2d6',
            reward: 2,
            items: new game.Collection
            (
                game.items.healingPotion
            )
        };
    });

})(adventureGame);
