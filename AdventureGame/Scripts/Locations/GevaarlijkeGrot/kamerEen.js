/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.locations.register(function kamerEen() {
        var location = {
            name: 'De kamer van de ork',
            fileLocation: 'GevaarlijkeGrot/KamerEen',
            enemies: new game.Collection(
                game.enemies.ork
        //        game.enemies.goblin
            ),
            items: new game.Collection(
                game.items.blackKey
            ),
            destinations: new game.Collection([
                {
                    text: 'Noord',
                    target: game.locations.gangRechts,
                    barrier: {
                        text: 'Houten deur',
                        actions: {
                            inspect:
                            {
                                text: 'Onderzoek de deur',
                                action: game.actions.inspect({ text: 'Een eikenhouten deur met een ijzeren hendel. De deur is niet op slot.' })
                            },
                            open:
                            {
                                text: 'Open de deur',
                                action: game.actions.open({
                                    success: function (game, destination) {
                                        game.logLocation('Je opent de eikenhouten deur.');
                                        destination.text = 'Gang (noord)';
                                    }
                                })
                            }
                        }
                    }
                },
                {
                    text: 'Tweede deur (west)',
                    target: game.locations.middenKamer,
                },
                {
                    text: 'Derde deur (zuid)',
                    target: game.locations.linkerKamer
                },
                {
                    text: 'Deuropening (oost); richting ingang',
                    target: game.locations.linkergang
                }

            ]),
            actions: {
            }
        };

        return location;
    });
})(adventureGame);
