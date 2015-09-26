(function () {
    'use strict';

    angular.module('adventureGame').factory('combatService', ['game', function (game) {
        return {
            init: init,
            initCombat: initCombat,
            addFleeAction: addFleeAction,
            fight: fight,
        };

        function init() {
            game.fight = fight;
        }

        function initCombat(location) {
            location.enemies = location.enemies || new game.Collection();

            // Log the presense of enemies to the action log.
            location.enemies.forEach(function (item) {
                game.logAction('Er is hier een ' + item.name);
            });

            addFleeAction(location);
        }

        function addFleeAction(location, modifier) {
            // If there are enemies and the character is quick enough, add a flee action.
            if (isNaN(modifier)) {
                modifier = 0;
            }

            if (location.enemies && location.enemies.length < (modifier ? game.character.vlugheid + modifier : game.character.vlugheid)) {
                if (!location.combatActions) {
                    location.combatActions = {};
                }

                location.combatActions.flee = adventureGame.actions.flee({});
            }
            else if (location.combatActions && location.combatActions.flee) {
                delete location.combatActions.flee;
            }
        }

        function fight(game, enemy) {
            // Todo: change when multiple enemies of the same type can be present.
            var enemy = game.currentLocation.enemies.find(enemy.id);
            var check = game.rollDice(game.character.kracht + 'd6');

            var characterDamage = check + game.character.oplettendheid + game.calculateBonus(game.character, 'attack') - game.calculateBonus(enemy, 'defense');
            game.logAction('Je doet de ' + enemy.name + ' ' + characterDamage + ' schade!');

            enemy.hitpoints -= characterDamage;

            if (enemy.hitpoints <= 0) {
                game.logAction('Je verslaat de ' + enemy.name + '!');
                game.logLocation('Er ligt hier een dode ' + enemy.name + ', door jou verslagen.');

                if (enemy.items && enemy.items.any) {
                    enemy.items.forEach(function (item) {
                        game.currentLocation.items.push(item);
                    });

                    enemy.items.clear();
                }

                if (enemy.reward) {
                    game.character.score += enemy.reward;
                }

                if (enemy.onDefeat) {
                    enemy.onDefeat(game);
                }

                game.currentLocation.enemies.remove(enemy);
            }

            game.currentLocation.enemies.forEach(function (enemy) {
                var check = game.rollDice(enemy.attack);
                var enemyDamage = Math.max(0, (check - (game.character.vlugheid + game.calculateBonus(game.character, 'defense'))) + game.calculateBonus(enemy, 'damage'));
                game.logAction('De ' + enemy.name + ' doet ' + enemyDamage + ' schade!');
                game.character.currentHitpoints -= enemyDamage;
            });
        }
    }]);
})();

// alle effecten van items moeten hier nog bij