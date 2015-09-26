(function () {
    'use strict';

    adventureGame.actions.randomEnemy = function (game) {
        var allEnemies = game.enemies.all();

        var randomEnemy = allEnemies[game.rollDice('1d' + allEnemies.length) - 1]();
        game.currentLocation.enemies.push(randomEnemy);

        return randomEnemy;
    }
})();