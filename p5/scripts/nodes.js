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
	}
}

function setup() {
	width = 800;
	height = 800;
	margin = 50;
	spacing = 25;

	// Create 2d array of nodes
	var x = margin;
	var y = margin;
	for (i = 0; y < height - margin; i++) {
		nodes.push([]);
		for (j = 0; x < width - margin; j++) {
//			nodes[i][j] = new Node(x, y);
			nodes[i].push(new Node(x, y));
			x += spacing;
		}

		x = margin;
		y += spacing;
	}
	
	canvas = createCanvas(width, height);
	frameRate(60);
	background("#2b2b2b");
	stroke("#cfcfcf");
	stroke("#8fc0ff")
	strokeWeight(10);

	console.log(nodes);
	console.log(nodes.length);
	console.log(nodes[0].length);
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

