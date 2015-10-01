/// <reference path="../../_references.js" />
(function (game) {
    'use strict';

    game.items.register(function lerenHelm() {
        return {
            name: 'Helm van leer',
            defense: 1,
            equipmentType: 'head'
        };
    });

})(adventureGame);

// helm geeft een +1 op je defense