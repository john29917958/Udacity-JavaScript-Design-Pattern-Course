/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var octopus = __webpack_require__(1);

	octopus.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function convertNumber(number) {
	    var map = ['zero', 'one', 'two', 'three', 'four', 'five'];

	    return map[number];
	}

	module.exports = (function () {
	    var catListView = __webpack_require__(2),
	        catClickerView = __webpack_require__(3),
	        adminView = __webpack_require__(4),
	        model = __webpack_require__(5);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = (function () {
	    var catList = {
	        init: function(octopus) {
	            this.octopus = octopus;
	            this.listDOM = document.getElementsByClassName('cat-list')[0];

	            return this;
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = (function () {
	    var jsSelector = __webpack_require__(6);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = (function () {
		var jsSelector,
			catAdminUI = {
				init: function(octopus) {
					var that = this;

					jsSelector = __webpack_require__(6);
					this.octopus = octopus;
					this.adminPanel = jsSelector(document.getElementsByClassName('cat-clicker-admin'));
					this.functionalityBox = this.adminPanel.findByClassName('admin-functionality-box').first();
					this.adminButton = this.adminPanel.findByClassName('btn admin-btn').first();
					this.inputElements = this.adminPanel.findByTagName('form').findByTagName('input');
					this.cancelButton = this.adminPanel.findByClassName('btn cancel-btn').first();
					this.confirmButton = this.adminPanel.findByClassName('btn confirm-btn').first();

					this.adminButton.addEventListener('click', function () {
						that.toggleAdminPanel();
					});

					this.cancelButton.addEventListener('click', function () {
						that.hideAdminPanel();
					});

					this.confirmButton.addEventListener('click', function () {
						var updateContent = {};

						that.inputElements.each(function (index, input) {
							updateContent[input.name] = input.value;
						});

						octopus.updateCat(updateContent);
					});
				},

				showAdminPanel: function() {
					this.functionalityBox.style.visibility = 'visible';
				},

				hideAdminPanel: function() {
					this.functionalityBox.style.visibility = 'hidden';
				},

				toggleAdminPanel: function() {
					var visibility = this.functionalityBox.style.visibility;

					if (!visibility || visibility === 'visible') {
						this.hideAdminPanel();
					}
					else {
						this.showAdminPanel();
					}
				}
		}

		return catAdminUI;
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 6 */
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
/******/ ])