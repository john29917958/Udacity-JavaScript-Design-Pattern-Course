'use strict';

module.exports = (function () {
    var catListView = require('./cat_list.js'),
        catClickerView = require('./cat_clicker.js'),
        model = require('./cat_storage.js');

    var octopus = {
        init: function() {
            model.init();
            catListView.init(this);
            catClickerView.init(this);
        },

        addCat: function(name, photoPath) {
            model.cats.push({
                name: name,
                photoPath: photoPath,
                clicks: 0
            });

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