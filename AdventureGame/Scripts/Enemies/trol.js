(function () {
    'use strict';

    adventureGame.enemies.register(function trol() {
        return {
            name: 'Trol',
            hitpoints: 20,
            attack: '2d6',
            reward: 2,
            items: new adventureGame.Collection
            (
                adventureGame.items.healingPotion
            )
        };
    });

})();
