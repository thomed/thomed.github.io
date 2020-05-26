// canvas related
var canvas;
var width, height;

// drawing related
var x, y;
var spacing;
var margin;

function setup() {
	width = 800;
	height = 800;
	margin = 50;
	spacing = 25;
	x = spacing;
	y = margin;
	
	canvas = createCanvas(width, height);
	canvas.id("mtncanvas");
	frameRate(60);
//	noStroke();
	background("#2b2b2b");
	stroke("#cfcfcf");
	stroke("#8fc0ff")
	strokeWeight(11);
//	noStroke();
}

function step() {
	if (x + spacing >= width - margin) {
		x = spacing;
		y += spacing;

		if (y >= height - margin) {
			frameRate(0);
		}
	}

	x += spacing;
}

function draw() {

	var i;
	for (i = 0; i < 6; i++) {
		var r = randomSingle(10);

		if (r != 0 && r != 10) {
			step();
		}

		if (r >= 7) {
			line(x, y, x + spacing, y + spacing);
		}

		if (r <= 3 && y > margin + spacing) {
			line(x, y, x + spacing, y - spacing);
		}
	}

}

// random [0, max]
function randomSingle(max) {
	return Math.floor(Math.random() * max);
}

// return a random modifier between +- max to add roughness
function randomDifference(max) {
	var diff = Math.floor(Math.random() * max);
	diff *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	return diff;
}

