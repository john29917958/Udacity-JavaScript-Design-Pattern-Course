var lib = require('./library.js'),
	Cat = require('./Cat.js'),
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

lib.init();
//initCats(cats);

var nums = [1, 2, 3],
	currentCat;

for (var i = 0; i < nums.length; i++) {
	var num = nums[i];
	
	currentCat = cats[i];

}