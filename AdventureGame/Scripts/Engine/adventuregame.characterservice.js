/// <reference path="_references.js" />
(function () {
    'use strict';

    angular.module('adventureGame').factory('characterService', ['dataService', 'game', function (dataService, game) {
        return {
            init: init,
            getSpecialties: getSpecialties,
            getItems: getItems,
            buildCharacter: buildCharacter,
            getRewards: getRewards,
            pickupItem: pickupItem,
            equip: equip,
            levelUp: levelUp,
            watchCharacterHitpoints: watchCharacterHitpoints,
            watchCharacterScore: watchCharacterScore
        };

        function init() {
            var character = dataService.load(game.keys.CHARACTER);

            if (!game.isEmpty(character)) {
                game.character = character;
            }
            else {
                game.character = createNewCharacter();
            }

            if (!game.character.items || game.isEmpty(game.character.items)) {
                game.character.items = new game.Collection();
            }
        }

        function createNewCharacter() {
            var character = {
                name: '',
                kracht: 1,
                vlugheid: 1,
                oplettendheid: 1,
                hitpoints: 20,
                currentHitpoints: 20,
                score: 0,
                scoreToNextLevel: 0,
                level: 1,

                items: {
                },

                equipment: {
                    head: {},
                    amulet: {},
                    body: {},
                    hands: {},
                    leftHand: {},
                    leftRing: {},
                    rightHand: {},
                    rightRing: {},
                    legs: {},
                    feet: {}
                }
            };

            character.defense = character.vlugheid;

            return character;
        }

        function getSpecialties() {
            return [
            {
                name: 'sterk',
                value: 'Sterk'
            },
            {
                name: 'snel',
                value: 'Snel'
            },
            {
                name: 'slim',
                value: 'Slim'
            }
            ];
        }

        function getRewards() {
            return [
            {
                name: 'kracht',
                value: 'Kracht'
            },
            {
                name: 'vlugheid',
                value: 'Vlugheid'
            },
            {
                name: 'oplettendheid',
                value: 'Oplettendheid'
            },
            {
                name: 'gezondheid',
                value: 'Gezondheid'
            }
            ];
        }

        function getItems() {
            return [
                game.items.dolk(),
                game.items.lerenHelm(),
                game.items.lantaren()
            ];
        }

        function buildCharacter() {
            switch (game.selectedSpecialty.name) {
                case 'sterk': {
                    game.character.kracht++;
                } break;
                case 'snel': {
                    game.character.vlugheid++;
                } break;
                case 'slim': {
                    game.character.oplettendheid++;
                } break;
            }

            if (game.isEmpty(game.character.items)) {
                game.character.items = new game.Collection();
            }

            game.character.items.push(game.selectedItem);
        }

        function pickupItem(item) {
            game.character.items.push(item);
            game.currentLocation.items.remove(item);
        }

        function levelUp() {
            if (game.selectedReward.name != 'gezondheid') {
                game.character[game.selectedReward.name]++;
            }
            else {
                game.character.hitpoints += 10;
                game.character.currentHitpoints += 10;
            }

            game.state = 'play';
        }

        function equip(game, item) {
            var equippedItem = game.character.equipment[item.equipmentType];

            if (!game.isEmpty(equippedItem)) {
                game.character.items.push(equippedItem);
            }

            game.character.equipment[item.equipmentType] = item;
            game.character.items.remove(item);
        }

        function watchCharacterHitpoints(newValue, oldValue) {
            if (newValue < 5) {
                game.logAction('Pas op! Je bent zwaar gewond!');

                if (newValue <= 0) {
                    game.state = 'gameOver';
                }
            }
        }

        function watchCharacterScore(newValue, oldValue) {
            // Todo: change if xp can be lost.
            if (newValue > oldValue) {
                var gained = newValue - oldValue;
                var character = game.character;
                character.scoreToNextLevel += gained;

                var levelUp = character.level >= 1 && character.scoreToNextLevel >= 2 + (2 * (character.level));

                game.logAction('Je verdient ' + gained + ' punt(en)');

                if (levelUp) {
                    character.level += 1;
                    character.scoreToNextLevel = 0;
                    game.logAction('Je wordt hier beter in! Je bent nu niveau ' + character.level);
                    game.state = 'levelUp';
                }
            }
        }
    }]);
})();