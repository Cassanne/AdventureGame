/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function linkergang() {
        var location = {
            name: 'Een pikdonkere gang',
            fileLocation: 'GevaarlijkeGrot/Linkergang',
            events: {
                fallInHole: function (game) {
                    var damage = Math.floor(Math.random() * 6 + 1) - game.character.vlugheid;
                    game.character.currentHitpoints -= Math.max(0, damage);
                    game.logAction('Aah! Je valt plotseling in een diepe kuil en bezeert je. Je krijgt ' + damage + ' schade door het vallen!');
                    game.logLocation('Er is hier een diepe valkuil.')
                }
            },
            actions: {

                klimmen: {
                    text: 'Klim uit de kuil',
                    type: 'skill',
                    action: function (game) {
                        // Todo: skill check
                        if (false)
                        {
                            game.logAction('Het lukt je niet uit de kuil te klimmen.');
                            return;
                        }

                        game.logAction('Je klimt uit de kuil.');

                        game.currentLocation.destinations.push(
                            {
                                text: 'Dieper de grot in',
                                target: game.locations.deurEen
                            },
                            {
                                text: 'Richting ingang',
                                target: game.locations.ingang
                            }
                        );

                        delete game.currentLocation.actions['klimmen'];
                    }
                },

                zoek: game.actions.search({
                    text: 'Doorzoek de kuil',
                    difficulty: 9,
                    success: function (game) {
                        game.currentLocation.items.push(game.items.lerenHelm);
                        game.logLocation('In de kuil voel je botten, spinrag en de resten van kleding. Ook vind je er een nog bruikbare helm!')
                    },
                    fail: function (game) {
                        game.logLocation('In de kuil voel je botten, spinrag en de resten van kleding.');
                    }
                })
            }
        };

        return location;
    });

})(adventureGame);

// je moet 'kracht' 5 rollen om uit de valkuil te klimmen. Hier nog een check van maken. 
// Hier aangepaste resultaten als je een lichtbron (lantaren) hebt.
// Hier tweede zoekactie toevoegen voor de gang, naast die voor de kuil. hiervoor moet text van deknop aanpasbaar zijn en knoppen beschibaar afhankelijk van of je in de kuil zit of niet
