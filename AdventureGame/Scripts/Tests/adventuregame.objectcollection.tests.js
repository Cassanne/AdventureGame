/// <reference path="../_references.js" />

describe("AdventureJS Collection tests", function () {
    it("A new collection can be initialized with primitives", function () {
        var collection = adventureGame.Collection([1, 2, 3, 4, 5]);
        expect(collection.length).toBe(5);
        expect(collection[2]).toBe(3);
    });

    it("A new collection can be initialized with objects", function () {
        var orc = { name: 'Orc', health: 12 };
        var goblin = { name: 'Goblin', health: 5 };

        var collection = adventureGame.Collection(orc, goblin);
        expect(collection.length).toBe(2);
        expect(collection[0].name).toBe(orc.name);
        expect(collection[1].health).toBe(goblin.health);
    });

    it("A new collection can be initialized with functions", function () {
        var start = function start() { return { name: 'Entry', destination: end }; };
        var end = function end() { return { name: 'Exit' }; };

        var collection = adventureGame.Collection(start, end);
        expect(collection.length).toBe(2);
        expect(collection[0].id).toBe(start.name);
        expect(collection[1].id).toBe(end.name);
    });
});