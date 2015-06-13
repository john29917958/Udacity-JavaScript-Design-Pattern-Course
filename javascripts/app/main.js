var jsSelector = require('./jsSelector.js'),
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