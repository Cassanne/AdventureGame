/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.actions.randomEnemy = function (game) {
        var allEnemies = game.enemies.allObjects();

        var randomEnemy = allEnemies[game.rollDice('1d' + allEnemies.length) - 1];
        game.currentLocation.enemies.push(randomEnemy);

        return randomEnemy;
    }
})(adventureGame);