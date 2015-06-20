'use strict';

module.exports = (function () {
	var jsSelector,
		catAdminUI = {
			init: function(octopus) {
				var that = this;

				jsSelector = require('../vendor/js_selector.js');
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