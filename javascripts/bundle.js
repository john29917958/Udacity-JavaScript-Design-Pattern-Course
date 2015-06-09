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

	var CollectionHelper = __webpack_require__(1),
		Cat = __webpack_require__(2),
		CatUI = __webpack_require__(3),
		cats = new CollectionHelper(document.getElementsByClassName('cat-clicker'));

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

	//initCats(cats);

	var nums = [1, 2, 3],
		currentCat;

	for (var i = 0; i < cats.length; i++) {
		var num = nums[i];
		
		currentCat = new CollectionHelper(cats[i]);
		currentCat.findByClassName('cat-clicker-count')[0].textContent = num;
		/* Immediately-involked Function Expression. */
		currentCat.findByClassName('cat-clicker-photo').findByTagName('img')[0].addEventListener('click', (function (numCopy) {
			return function () {
				alert(numCopy);
			};
		})(num));
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = (function () {
		function validateString(str) {
			if (typeof str === 'string' && str.length > 0) {
				return true;
			}
			else {
				return false;
			}
		}

		function Cat(name, photo) {
			if (validateString(name) && validateString(photo)) {
				this.catName = name;
				this.photoPath = photo;
				this.clicked = 0;
			}
			else {
				return null;
			}
		}

		Cat.prototype.getName = function() {
			return this.catName;
		};

		Cat.prototype.setName = function(name) {
			if (validateString(name)) {
				this.catName = name;

				return true;
			}
			else {
				return false;
			}
		};

		Cat.prototype.getPhotoPath = function() {
			return this.photoPath;
		};

		Cat.prototype.setPhotoPath = function(photoPath) {
			if (validateString(photoPath)) {
				this.photoPath = photoPath;

				return true;
			}
			else {
				return false;
			}
		};

		Cat.prototype.getClickCount = function() {
			return this.clicked;
		};

		Cat.prototype.clickMe = function() {
			this.clicked += 1;
		};

		return Cat;
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = (function () {
		function eventInit() {
			var that = this;

			this.catPhotoImg.addEventListener('click', function () {
				that.cat.clickMe();
				that.refresh();
			}, false);
		}

		function CatUI(ui, cat) {
			if (ui && cat) {
				this.cat = cat;
				this.wrapper = ui;
				this.catName = ui.firstElementChild;
				this.catPhoto = ui.children[1];
				this.catPhotoImg = ui.children[1].firstElementChild;
				this.catClickerCount = ui.children[2];
				this.countNumber = ui.children[2].firstElementChild;

				eventInit.call(this);
			}
			else {
				return null;
			}
		}

		CatUI.prototype.refresh = function() {
			this.catName.innerHTML = this.cat.getName();
			this.catPhotoImg.src = this.cat.getPhotoPath();
			this.countNumber.textContent = this.cat.getClickCount();
		};

		return CatUI;
	})();

/***/ }
/******/ ]);