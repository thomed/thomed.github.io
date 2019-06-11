var p1 = 30;

document.addEventListener('DOMContentLoaded', function() {
	console.log("ready");
	document.getElementById('part-one').style.paddingTop = p1 + "vh";
});

// TODO mobile...
window.addEventListener('wheel', function(e) {
	var mod = e.deltaY > 0 ? 2 : -2;
	var partOne = document.getElementById("part-one");
	p1 = p1 + mod > 0 && p1 + mod <= 30 ? p1 + mod : p1;
	partOne.style.paddingTop = p1 + "vh";
});
