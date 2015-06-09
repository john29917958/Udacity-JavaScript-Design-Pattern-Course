'use strict';

module.exports = (function () {
	function init() {
		HTMLCollection.prototype.findById = function(id) {
			var results = [],
				collectionLength = this.length;

			for (var i = 0; i < collectionLength; i++) {
				if (this[i].id === id) {
					results.push(this[i]);
				}
			}

			return results;
		};

		HTMLCollection.prototype.findByClassName = function(className) {
			var results = [],
				collectionLength = this.length;

			for (var i = 0; i < collectionLength; i++) {
				if (this[i].className === className) {
					results.push(this[i]);
				}
			}

			return results;
		};
	}

	return {
		init: init
	};
})();