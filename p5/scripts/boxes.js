// canvas
var canvas;
var width, height;

// drawing related
//var x, y;
var test;

class Box {

	x = 20;
	y = 200;
	width = 150;
	height = 100;
	depth = 10;
	r = 230;
	g = 180;
	b = 180;
	a = 255;

	constructor() {}

	/**
	 * x6, y6--> _________ <-- x7, y7
	 *  x, y -->|\_________\ <-- x2, y2
	 *          | |        |
	 *          | |        |
	 * x5, y5-->| |        |
	 * x4, y4 -->\|________| <-- x3, y3
	 */
	draw() {
		var x2 = this.x + this.width;
		var y2 = this.y;
		var x4 = this.x;
		var y4 = this.y + this.height;
		var x5 = this.x - this.depth;
		var y5 = y4 - this.depth;
		var x6 = x5;
		var y6 = this.y - this.depth;
		var x7 = x2 - this.depth;
		var y7 = y6;

//		rect(this.x - this.depth, this.y - this.depth, this.width, this.height);
		stroke(this.r * 0.6, this.g * 0.6, this.b * 0.6);
		fill(this.r, this.g, this.b, this.a);
		rect(this.x, this.y, this.width, this.height);

		fill(this.r * 0.8, this.g * 0.8, this.b * 0.8, this.a);
		quad(this.x, this.y, x6, y6, x7, y7, x2, y2);
		quad(this.x, this.y, x4, y4, x5, y5, x6, y6);

//		this.x += 1;
//		this.y += randomDifference(4);
	}
}

function setup() {
	width = 800;
	height = 800;

	test = new Box();
	
	canvas = createCanvas(width, height);
	frameRate(60);
//	background("#2b2b2b");
	background("#ddeedd");
	stroke("#cfcfcf");
	strokeWeight(0.5);
//	noStroke();
}

function draw() {
	point(width / 2, height / 2);
	test.draw();
}

function clamp255(val) {
	if (val > 255) {
		return 255;
	}

	if (val < 0) {
		return 0;
	}

	return val;
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
