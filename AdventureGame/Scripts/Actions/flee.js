(function () {
    'use strict';

    adventureGame.actions.flee = function (settings) {
        return {
            text: settings.text || 'Vluchten!',
            type: 'fight',
            active: function (game) {
                return !game.isEmpty(game.currentLocation, 'enemies');
            },
            action: function (game) {
                var check = game.rollDice(game.character.vlugheid + 'd6');
                var result = check * game.character.vlugheid;
                var totalHitpoints = 0;

                game.currentLocation.enemies.forEach(function (enemy) {
                    totalHitpoints += enemy.hitpoints;
                });

                if (result >= totalHitpoints / 2) {
                    game.changeLocation();
                }
                else {
                    game.logAction('Je ontsnapping mislukt!');
                };
            }
        }
    }
})();

// het wordt ofwel een difficulty die van de vijanden afhangt, of een opposed check (vijanden rollen een attack). Als vijanden winnen krijg je het effect van de attack (damage dus)
// succes betekent dat je van locatie wisselt
// deze moet active worden als er een vijand / gevecht op deze locatie is