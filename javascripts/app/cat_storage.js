'use strict';

module.exports = (function () {
    var catStorage = {
        init: function() {
            this.cats = [];
            this.currentCat = {};
        },

        getAllCats: function() {
            return this.cats;
        },

        findCatsByName: function(name) {
            var results = [];

            for (var i = 0; i < this.cats.length; i++) {
                if (this.cats[i].name === name) {
                    results.push(this.cats[i]);
                }
            }

            return results;
        }
    };

    return catStorage;
})();