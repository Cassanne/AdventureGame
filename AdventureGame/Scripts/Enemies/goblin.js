(function () {
    'use strict';

    adventureGame.enemies.register(function goblin() {
        return {
            name: 'Goblin',
            hitpoints: 6,
            attack: 'd4+3',
            reward: 1,
            items: new adventureGame.Collection
            (
               adventureGame.items.dolk         
            )
        };
    });

})();