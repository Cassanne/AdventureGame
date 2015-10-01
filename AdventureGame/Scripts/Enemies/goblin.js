/// <reference path="../_references.js" />
(function (game) {
    'use strict';

    game.enemies.register(function goblin() {
        return {
            name: 'Goblin',
            hitpoints: 6,
            attack: 'd4+3',
            reward: 1,
            items: new game.Collection
            (
               game.items.dolk
            )
        };
    });

})(adventureGame);