'use strict';

module.exports = (function () {
    var catStorage = {
        init: function() {
            this.cats = [];
            this.currentCat = {};
        },

        getAllCats: function() {
            return this.cats;
        }
    };

    return catStorage;
})();