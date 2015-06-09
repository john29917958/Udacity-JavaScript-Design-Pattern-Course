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