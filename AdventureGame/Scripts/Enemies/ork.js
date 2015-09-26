(function () {
    'use strict';

    adventureGame.enemies.register(function ork() {
        return {
            name: 'Ork',
            hitpoints: 12,
            attack: '2d4+1',
            reward: 1,
            items: new adventureGame.Collection
        (
            adventureGame.items.ijzerHelm
        )
        };
    });

})();