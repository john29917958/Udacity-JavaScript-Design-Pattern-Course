var catClicker = document.getElementsByClassName('cat-clicker');

for (var i = 0; i < catClicker.length; i++) {
	catClicker[i].firstElementChild.addEventListener('click', function() {
		var counter = catClicker[0].lastElementChild.lastElementChild,
			currentCount = Number(counter.innerText);
		
		counter.innerHTML = currentCount + 1;
	}, false);
}