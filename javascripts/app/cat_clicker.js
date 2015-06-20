'use strict';

module.exports = (function () {
    var jsSelector = require('../vendor/js_selector.js');

    var catClicker = {
        init: function(octopus) {
            var that = this,
                catClicker = jsSelector(document.getElementsByClassName('cat-clicker'));

            this.octopus = octopus;
            this.catNameField = catClicker.findByClassName('cat-clicker-name')[0];
            this.catImg = catClicker.findByClassName('cat-clicker-photo').findByTagName('img')[0];
            this.clicksCountField = catClicker.findByClassName('cat-clicker-count')[0];

            this.catImg.addEventListener('click', function () {
                that.octopus.increamentClick();
            });

            return this;
        },

        render: function() {
            var currentCat = this.octopus.getCurrentCat();

            this.catNameField.innerHTML = currentCat.name;
            this.catImg.src = currentCat.photoPath;
            this.clicksCountField.innerHTML = currentCat.clicks;
        }
    };

    return catClicker;
})();