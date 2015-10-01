/// <reference path="../_references.js" />
// Todo: is not used anywhere. Remove?
(function (game) {
    'use strict';

    game.actions.attack = function (settings) {
        return {
            text: settings.text || 'Val aan!',
            type: 'fight',
            active: settings.active || false,
            action: function (game) {
                var check = game.rollDice(game.character.kracht + 'd6');
                var characterDamage;
                characterDamage = check * game.character.kracht + game.character.oplettenheid;
                return characterDamage;
                game.logAction('Je doet ' + characterDamage + ' schade!');
                // nu gaat characterDamage van enemyHitpoints af
                // nu check je of enemyHitpoints <0 is (dan verdwijnt enemy & attack knop en is er een victory message (en later ook + xp / items)
                // als enemyHitpoints <0 is voert nu de enemy zijn attack uit
            }

        }
    }

})(adventureGame);

// hier moeten we iets aangeven over wat de vijand is. check voor enemy, dan is hij active
// is characterDamage nu (kracht) d6 + (oplettendheid)? volgens mij gaat dat nog niet goed, iig niet de oplettendheid optellen
// characterDamage moet afgaan van enemy hitpoints, als die =< nul is moet er een 'win-event' plaatsvinden
// hoe en waar gaan wapens (items) hierin meegerekend worden?