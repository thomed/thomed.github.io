// canvas related
var canvas;
var width, height;

// drawing related
//var x, y;
var nodes = [];
var spacing;
var margin;

class Node {

	lleft = null;
	lright = null;
	uleft = null;
	uright = null;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		point(this.x, this.y);
//		stroke("#8fc0ff");
	}
}

function setup() {
	width = 800;
	height = 800;
	margin = 50;
	spacing = 25;

	var x = margin;
	var y = margin;

	// initialize 2d array of nodes
	for (i = 0; y < height - margin; i++) {
		nodes.push([]);
		for (j = 0; x < width - margin; j++) {
			nodes[i].push(new Node(x, y));
			x += spacing;
		}

		x = margin;
		y += spacing;
	}
	
	// set node relations
	for (i = 0; i < nodes.length; i++) {
		for (j = 0; j < nodes[0].length; j++) {

			// set lower right (above bottom row, left of right edge)
			if (i != nodes.length - 1 && j != nodes[0].length - 1) {
				nodes[i][j].lright = nodes[i + 1][j + 1];
			}

			// set lower left (above bottom row, right of left edge)
			if (i != nodes.length - 1 && j > 0) {
				nodes[i][j].lleft = nodes[i + 1][j - 1];
			}

			// set upper right
			if (i > 0 && j < nodes[0].length - 1) {
				nodes[i][j].uright = nodes[i - 1][j + 1];
			}

			// set upper left
			if (i > 0 && j > 0) {
				nodes[i][j].uleft = nodes[i - 1][j - 1];
			}
		}
	}

	// p5 config
	canvas = createCanvas(width, height);
	frameRate(60);
	background("#2b2b2b");
	stroke("#8fc0ff")
	strokeWeight(10);
}

function draw() {
	clear();
	background("#2b2b2b");
	for (i = 0; i < nodes.length; i++) {
		for (j = 0; j < nodes[0].length; j++) {
			nodes[i][j].draw();
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

