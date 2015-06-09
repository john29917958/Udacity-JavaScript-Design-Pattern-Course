'use strict';

module.exports = (function () {
	var validParameterList = ['Array', 'HTMLElement'];

	function isParameterValid(parameter) {
		for (var i = 0; i < validParameterList.length; i++) {
			if (parameter instanceof window[validParameterList[i]]) {
				return true;
			}
		}

		if (parameter instanceof Object &&
			parameter.constructor.name === 'HTMLCollection') {
			return true;
		}

		return true;
	}

	function CollectionHelper(elements) {
		if (isParameterValid(elements)) {
			var length = 0;

			if (elements instanceof HTMLElement) {
				this[0] = elements;
				length = 1;
			}
			else {
				for (var i = 0; i < elements.length; i++) {
					this[i] = elements[i];
				}
				length = elements.length;
			}

			Object.defineProperty(this, 'length', {
				get: function () {
					return length;
				}
			});

			Object.freeze(this);
		}
		else {
			return null;
		}
	}

	CollectionHelper.prototype.item = function(i) {
		return this[i] != null ? this[i] : null;
	};

	CollectionHelper.prototype.namedItem = function(name) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].id === name || this[i].name === name) {
				return this[i];
			}
		}

		return null;
	};

	CollectionHelper.prototype.find = function(attr, value) {
		var results = [],
			currentElement;
		
		for (var i = 0; i < this.length; i++) {
			currentElement = this[i];

			if (currentElement[attr] === value) {
				results.push(currentElement);
			}
			
			if (currentElement.children.length > 0) {
				results = results.concat(new CollectionHelper(currentElement.children).find(attr, value));
			}
		}

		return results;
	};

	CollectionHelper.prototype.findByTagName = function(tagName) {
		return new CollectionHelper(this.find('tagName', tagName.toUpperCase()));
	};

	CollectionHelper.prototype.findById = function(id) {
		return new CollectionHelper(this.find('id', id));
	};

	CollectionHelper.prototype.findByClassName = function(className) {
		return new CollectionHelper(this.find('className', className));
	};

	return CollectionHelper;
})();