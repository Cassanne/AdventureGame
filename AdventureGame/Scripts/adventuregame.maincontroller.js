/// <reference path="_references.js" />
(function () {
    'use strict';

    angular.module('adventureGame').controller('maincontroller', ['$scope', 'gameService', 'characterService', 'game', function ($scope, gameService, characterService, game) {
        $scope.game = game;
        $scope.init = init;
        game.restart = restart;

        // Interface properties.
        $scope.specialties = characterService.getSpecialties();
        $scope.rewards = characterService.getRewards();
        $scope.items = characterService.getItems();

        // Menu handling functions.
        $scope.startNewGame = startNewGame;
        $scope.restart = restart;
        $scope.reset = gameService.reset;
        $scope.claimReward = characterService.levelUp;

        // Button handling functions.
        $scope.getButtonClass = getButtonClass;
        $scope.getActionName = getActionName;
        $scope.enemiesPresent = enemiesPresent;
        $scope.barriersPresent = barriersPresent;
        $scope.actionsPresent = actionsPresent;
        $scope.disableActionButton = disableActionButton;
        $scope.executeAction = executeAction;
        $scope.executeBarrierAction = executeBarrierAction;
        $scope.pickup = characterService.pickupItem;
        $scope.changeLocation = changeLocation;

        // Character sheet functions
        $scope.equip = characterService.equip;

        // Watch functions.
        $scope.$watch('game.character.currentHitpoints', characterService.watchCharacterHitpoints);
        $scope.$watch('game.character.score', characterService.watchCharacterScore);
        $scope.$watch('game.state', gameService.watchGameState);

        function init() {
            gameService.init();
            $scope.fight = game.fight;
        }

        function startNewGame() {
            gameService.startNewGame();
            game.state = 'play';
        }

        function restart() {
            gameService.restart();
            init();
        }

        function getButtonClass(action) {
            var type = action.type || 'move';
            var buttonClass = 'btn-';

            switch (type) {
                case 'move': {
                    buttonClass += 'info'
                } break;
                case 'skill': {
                    buttonClass += 'warning';
                } break;
                case 'fight': {
                    buttonClass += 'danger';
                } break;
            }

            return buttonClass;
        }

        function getActionName(barrier, action) {
            // Get the name of the barrier action from the barrier without the need to specify it
            // in the definition.
            for (var n in barrier.actions) {
                var currentAction = barrier.actions[n];

                if (currentAction == action) {
                    return n;
                }
            }
        }

        function enemiesPresent() {
            return game.currentLocation.enemies && game.currentLocation.enemies.length;
        }

        function barriersPresent() {
            return game.currentLocation.destinations && game.currentLocation.destinations.some(function (destination) { return !game.isEmpty(destination.barrier); });
        }

        function actionsPresent() {
            return !enemiesPresent() && !game.isEmpty(game.currentLocation.actions);
        }

        function disableActionButton(action) {
            return typeof action.active === "function" ? !action.active(game) : action.active == undefined ? false : !action.active;
        }

        function executeAction(action) {
            if (action && typeof action === 'function') {
                // Modify the arguments collection to add the game to the collection before
                // calling the function specified.
                var args = [].slice.call(arguments);
                args.shift();
                args.splice(0, 0, game);
                action.apply(this, args);

                // After each action, save the game.
                gameService.saveGame();
            }
        }

        function executeBarrierAction(destination, barrier) {
            // Get the selected action manually because ng-options does not work and I have to use ng-repeat
            // which does not supply a full object.
            var action = barrier.actions[barrier.selectedAction];
            var args = [action.action, destination, barrier, action];
            executeAction.apply(this, args);
        }

        function changeLocation(location) {
            // Call changeLocation without using the execute action as the game parameter is not needed.
            game.changeLocation(location);
            gameService.saveGame();
        }
    }]);
})();