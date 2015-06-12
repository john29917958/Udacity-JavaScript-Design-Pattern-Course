'use strict';

module.exports = (function () {
	var validParameterList = ['Array', 'HTMLElement'];

	/**
	 * Check if given element is undefined or is null
	 * or not.
	 *
	 * @param {Any} element.
	 * @returns {Boolean} Returns True if element is empty,
	 * returns False otherwise.
	 */
	function isEmpty(element) {
		if (element === undefined || element === null) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Check if given element is an HTMLCollection or not.
	 *
	 * @param {Any} element.
	 * @returns {Boolean} Returns True if the given element
	 * is a HTMLCollection, returns False otherwise.
	 */
	function isHTMLCollection(element) {
		if (element instanceof Object &&
			element.constructor.name === 'HTMLCollection') {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Check if the parameter is valid for the JsSelector
	 * constructor.
	 *
	 * @param {Any} parameter
	 * @returns {Boolean} Returns True if the parameter is
	 * valid, returns False otherwise.
	 */
	function isParameterValid(parameter) {
		if (!isEmpty(parameter)) {
			for (var i = 0; i < validParameterList.length; i++) {
				if (parameter instanceof window[validParameterList[i]]) {
					return true;
				}
			}

			if (isHTMLCollection(parameter)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * @constructor
	 * Generates an instance of JsSelector.
	 */
	function JsSelector(elements) {
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

	/**
	 * Retrieves the ith item.
	 *
	 * @param {Integer} i The index of item.
	 * @returns {Null or HTMLElement} Returns the
	 * ith element if exists, returns Null if the
	 * element is not found.
	 */
	JsSelector.prototype.item = function(i) {
		return this[i] != null ? this[i] : null;
	};

	/**
	 * Retrieves element by name.
	 *
	 * @param {String} name The name of element.
	 * @returns {HTMLElement or Null} Returns the
	 * found element, if element not found, returns
	 * Null.
	 */
	JsSelector.prototype.namedItem = function(name) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].id === name || this[i].name === name) {
				return this[i];
			}
		}

		return null;
	};

	/**
	 * Retrieves element whose specified attribute has
	 * the given value.
	 *
	 * @param {String} attr The attribute name.
	 * @param {String} value The value to be matched.
	 * @returns {Array} Returns an array with matched elements.
	 */
	JsSelector.prototype.find = function(attr, value) {
		var results = [],
			currentElement;
		
		for (var i = 0; i < this.length; i++) {
			currentElement = this[i];

			if (currentElement[attr] === value) {
				results.push(currentElement);
			}
			
			if (currentElement.children.length > 0) {
				results = results.concat(new JsSelector(currentElement.children).find(attr, value));
			}
		}

		return results;
	};

	/**
	 * Check if this JsSelector is empty or not.
	 *
	 * @returns {Boolean} Returns True if it is empty,
	 * returns False otherwise.
	 */
	JsSelector.prototype.isEmpty = function() {
		return (this.length === 0) ? true : false;
	};

	/**
	 * Retrieves the first element.
	 *
	 * @returns {Null or HTMLElement} Returns the first
	 * element if this JsSelector is not empty, returns
	 * Null otherwise.
	 */
	JsSelector.prototype.first = function() {
		return this.item(0);
	};

	/**
	 * Find and retrieves matched element by tag name.
	 *
	 * @param {String} tagName
	 * @returns {JsSelector} Returns a JsSelector with matched
	 * elements.
	 */
	JsSelector.prototype.findByTagName = function(tagName) {
		return new JsSelector(this.find('tagName', tagName.toUpperCase()));
	};

	/**
	 * Find and retrieves matched element by id.
	 *
	 * @param {String} id
	 * @returns {JsSelector} Returns a JsSelector with matched
	 * elements.
	 */
	JsSelector.prototype.findById = function(id) {
		return new JsSelector(this.find('id', id));
	};

	/**
	 * Find and retrieves matched element by class name.
	 *
	 * @param {String} className
	 * @returns {JsSelector} Returns a JsSelector with matched
	 * elements.
	 */
	JsSelector.prototype.findByClassName = function(className) {
		return new JsSelector(this.find('className', className));
	};

	/**
	 * Iterates through all elements and call the given callback
	 * function with current element passed into.
	 *
	 * @param {Function} callback
	 * @returns {JsSelector} Returns itself.
	 */
	JsSelector.prototype.each = function(callback) {
		if (callback && typeof callback === 'function') {
			for (var i = 0; i < this.length; i++) {
				switch (callback.length) {
					case 1:
						callback.call(this[i], i);
						break;
					case 2:
						callback.call(this[i], i, this[i]);
						break;
					default:
						callback.call(this[i]);
						break;
				}
			}
		}

		return this;
	};

	/**
	 * Exports all elements in JsSelector to an Array.
	 *
	 * @returns {Array} Returns an Array containing all
	 * elements in JsSelector.
	 */
	JsSelector.prototype.toArray = function() {
		var result = [];

		for (var i = 0; i < this.length; i++) {
			result.push(this[i]);
		}

		return result;
	}

	/**
	 * Facade.
	 *
	 * @param {HTMLCollection or Array or HTMLElement} elements
	 * @returns {JsSelector} Returns a JsSelector with given elements.
	 */
	function jsSelector(elements) {
		return new JsSelector(elements);
	}

	return jsSelector;
})();