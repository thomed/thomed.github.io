// canvas
var canvas;
var width, height;

// drawing related

function setup() {
	width = 800;
	height = 800;

	canvas = createCanvas(width, height);
	frameRate(60);
	background("#ddeedd");
	stroke("#cfcfcf");
}

function draw() {

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
