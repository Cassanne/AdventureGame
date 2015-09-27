/// <reference path="_references.js" />
(function (game) {
    'use strict';

    game.enemies.register(function reuzenvleermuis() {
        return {
            name: 'Reuzenvleermuis',
            hitpoints: 7,
            attack: '1d6',
            reward: 1
            
        };
    });

})(adventureGame);