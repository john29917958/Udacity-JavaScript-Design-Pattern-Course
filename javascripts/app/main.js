var Cat = require('./Cat.js'),
	CatUI = require('./CatUI.js'),
	cats = document.getElementsByClassName('cat-clicker');

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

initCats(cats);