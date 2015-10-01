/// <reference path="../_references.js" />

describe("adventureGame", function () {
    beforeEach(module('adventureGame'));

    describe("maincontroller", function () {
        //parse out the scope for use in our unit tests.
        var scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            var gameService = {};
            var characterService = {
                getSpecialties: function () { },
                getRewards: function () { },
                getItems: function () { }
            };
            var game = {};
            var ctrl = $controller('maincontroller', { $scope: scope, gameService: gameService, characterService: characterService, game: game });
        }));

        it('init is a function', function () {
            expect(typeof scope.init).toBe('function');
        });
    });

    describe("gameService", function () {
        it('init is a function', inject(function (combatService) {
            expect(typeof combatService.init).toBe('function');
        }));
    });
});