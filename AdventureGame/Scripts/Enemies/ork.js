/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.enemies.register(function ork() {
        return {
            name: 'Ork',
            hitpoints: 12,
            attack: '2d4+1',
            reward: 1,
            items: new game.Collection
        (
            game.items.ijzerHelm
        )
        };
    });

})(adventureGame);