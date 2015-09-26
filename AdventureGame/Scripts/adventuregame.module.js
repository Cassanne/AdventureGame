(function (game) {
    'use strict';

    angular.module('adventureGame', ['ngSanitize', 'ngStorage']);
    angular.module('adventureGame').value('game', game);

    game.locations = new game.DefinitionCollection();
    game.enemies = new game.DefinitionCollection();
    game.items = new game.DefinitionCollection();
    game.actions = game.actions || {};

    game.keys = {
        HIGHSCORES: 'highScores',
        CHARACTER: 'character',
        LOCATION: 'location',
        PREVIOUSLOCATION: 'previousLocation',
        WORLD: 'world'
    };

})(adventureGame);