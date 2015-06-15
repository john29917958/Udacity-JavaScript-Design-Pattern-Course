'use strict';

function convertNumber(number) {
    var map = ['zero', 'one', 'two', 'three', 'four', 'five'];

    return map[number];
}

module.exports = (function () {
    var catListView = require('./cat_list.js'),
        catClickerView = require('./cat_clicker.js'),
        model = require('./cat_storage.js');

    function addCat(name, photoPath) {
        model.cats.push({
            name: name,
            photoPath: photoPath,
            clicks: 0
        });
    }

    var octopus = {
        init: function() {
            model.init();

            for (var i = 1; i <= 5; i++) {
                addCat('Catty number ' + i, 'images/' + 'cat_number_' + convertNumber(i) + '.jpg');
            }
            model.currentCat = model.cats[0];
            
            catListView.init(this).render();;
            catClickerView.init(this).render();;
        },

        addCat: function(name, photoPath) {
            addCat(name, photoPath);
            catListView.render();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getAllCats: function() {
            return model.getAllCats();
        },

        setCurrentCat: function(name) {
            var switched = false;

            model.getAllCats().forEach(function (currentCat) {
                if (!switched && currentCat.name === name) {
                    model.currentCat = currentCat;
                }
            });

            catClickerView.render();
        },

        increamentClick: function() {
            model.currentCat.clicks += 1;
            catClickerView.render();
        }
    };

    return octopus;
})();