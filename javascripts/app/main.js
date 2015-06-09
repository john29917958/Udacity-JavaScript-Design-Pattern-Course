var CollectionHelper = require('./CollectionHelper.js'),
	Cat = require('./Cat.js'),
	CatUI = require('./CatUI.js'),
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