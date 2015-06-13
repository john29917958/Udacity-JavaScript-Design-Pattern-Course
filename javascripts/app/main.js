'use strict';

var octopus = require('./octopus.js');

octopus.init();

for (var i = 1; i <= 5; i++) {
    octopus.addCat('Catty number ' + i, 'images/' + 'cat_number_' + convertNumber(i) + '.jpg');
}

function convertNumber(number) {
    var map = ['zero', 'one', 'two', 'three', 'four', 'five'];

    return map[number];
}