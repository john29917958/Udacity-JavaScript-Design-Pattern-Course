'use strict';

module.exports = (function () {
    var catList = {
        init: function(octopus) {
            this.octopus = octopus;
            this.listDOM = document.getElementsByClassName('cat-list')[0];
        },

        render: function() {
            var that = this;

            this.listDOM.innerHTML = '';

            this.octopus.getAllCats().forEach(function (currentCat) {
                var newList = document.createElement('LI');

                newList.className += 'list';
                newList.textContent = '- ' + currentCat.name;
                newList.addEventListener('click', function() {
                    that.octopus.setCurrentCat(currentCat.name);
                });

                that.listDOM.appendChild(newList);
            });
        }
    };

    return catList;
})();