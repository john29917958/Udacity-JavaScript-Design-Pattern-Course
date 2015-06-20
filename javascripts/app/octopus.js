'use strict';

function convertNumber(number) {
    var map = ['zero', 'one', 'two', 'three', 'four', 'five'];

    return map[number];
}

module.exports = (function () {
    var catListView = require('./cat_list.js'),
        catClickerView = require('./cat_clicker.js'),
        adminView = require('./cat_admin.js'),
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
            
            catListView.init(this).render();
            catClickerView.init(this).render();
            adminView.init(this);
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

        increamentClick: function() {
            model.currentCat.clicks += 1;
            catClickerView.render();
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

        updateCat: function(contents) {
            var catsToBeUpdated = null;

            if (contents.name &&
                (catsToBeUpdated = model.findCatsByName(contents.name))) {
                catsToBeUpdated.forEach(function (cat, index) {
                    cat.name = contents.name ? contents.name : cat.name;
                    cat.photoPath = contents.photo ? 'images/' + contents.photo : cat.photoPath;
                    cat.clicks = contents.count ? contents.count : cat.clicks;
                });

                catClickerView.render();

                return true;
            }
            else {
                return false;
            }
        }
    };

    return octopus;
})();