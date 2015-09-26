(function () {
    'use strict';

    adventureGame.items.register(function healingPotion() {
        return {
            name: 'Toverdrank',
            use: adventureGame.actions.heal({
                potency: '1d8'
            })
        };
    });

})();
