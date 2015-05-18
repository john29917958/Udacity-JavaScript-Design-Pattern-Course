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