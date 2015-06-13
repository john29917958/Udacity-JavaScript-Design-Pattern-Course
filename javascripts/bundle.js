/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var jsSelector = __webpack_require__(1),
		catLists = jsSelector(document.getElementsByClassName('cat-list')).findByClassName('list'),
		catClicker = jsSelector(document.getElementsByClassName('cat-clicker')),
		name = catClicker.findByClassName('cat-clicker-name')[0],
		photo = catClicker.findByClassName('cat-clicker-photo')[0],
		count = catClicker.findByClassName('cat-clicker-count')[0];

	function initCats(cats) {
		var currentCat,
			currentCatName,
			currentCatPhotoPath;

		for (var i = 0; i < cats.length; i++) {
			currentCat = cats[i];
			currentCatName = currentCat.firstElementChild.innerText;
			currentCatPhotoPath = currentCat.children[1].firstElementChild.src;

			new CatUI(currentCat, new Cat(currentCatName, currentCatPhotoPath));
		}
	}

	for (var i = 1; i <= catLists.length; i++) {
		(function() {
			var currentCatName = 'Catty number ' + i,
				currentCatPhotoPath = 'images/cat_number_' + convertNumToString(i) + '.jpg',
				currentPhoto = document.createElement('IMG'),
				currentCatCount = 0;

			catLists[i - 1].textContent = currentCatName;
			currentPhoto.src = currentCatPhotoPath;

			catLists[i - 1].addEventListener('click', function() {
				name.textContent = currentCatName;
				photo.innerHTML = '';
				photo.appendChild(currentPhoto);
				count.textContent = currentCatCount;
			});

			currentPhoto.addEventListener('click', function() {
				currentCatCount += 1;
				count.textContent = currentCatCount;
			});
		})();
	}

	function convertNumToString(num) {
		var map = ['zero', 'one', 'two', 'three', 'four', 'five'];

		return map[num];
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ]);