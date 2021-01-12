function action(){
	var controlPanel = document.getElementById('controlPanel'),
		actionBtn = document.getElementById('action');
	actionBtn.onclick = function() {
		var left = controlPanel.style.left;
		if (left == '0px' || left == '') {
			controlPanel.style.left = '-190px';
			actionBtn.textContent = '>>';
		} else {
			controlPanel.style.left = '0px';
			actionBtn.textContent = '<<';
		};
	};
}