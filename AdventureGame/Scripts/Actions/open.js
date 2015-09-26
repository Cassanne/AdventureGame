(function () {
    'use strict';

    adventureGame.actions.open = function (settings) {
        return function (game, destination, barrier, action) {
            delete destination.barrier;

            if (settings.success) {
                settings.success(game, destination);
            }
        }
    }

})();