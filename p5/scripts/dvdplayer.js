class Circle {
	x = width / 2;
	y = height / 2;
	radius = 50;
	minRadius = 50;
	maxRadius = 250;

	xmod = 2;
	ymod = 1;
	radmod = 1;
	r = 24; g = 32; b = 75;
	rmin = 24; gmin = 32; bmin = 48;
	rmod = 0.75; gmod = 1; bmod = 1;

	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.r = randomSingle(25) + this.rmin;
		this.g = randomSingle(25) + this.gmin;
		this.b = randomSingle(50) + this.bmin;

		if (randomSingle(100) > 60) this.xmod *= -1;
		if (randomSingle(100) > 70) this.ymod *= -1;
	}

	Draw() {
		this.r += this.rmod;
		this.g += this.gmod;
		this.b += this.bmod;

		if (this.r > 255 || this.r < this.rmin) this.rmod *= -1;
		if (this.g > 255 || this.g < this.gmin) this.gmod *= -1;
		if (this.b > 255 || this.b < this.bmin) this.bmod *= -1;

		fill(this.r, this.g, this.b);
		circle(this.x, this.y, this.radius);
		this.x += (1 + randomDifference(3)) * this.xmod;
		this.y += (1 + randomDifference(3)) * this.ymod;
		this.radius += (randomSingle(1) + 1) * this.radmod;

		if (this.x + this.radius / 2 > width || this.x - this.radius / 2 < 0) this.xmod *= -1;
		if (this.y + this.radius / 2 > height || this.y - this.radius / 2 < 0) this.ymod *= -1;
		if (this.radius > this.maxRadius || this.radius < this.minRadius || randomSingle(1000) > 998) this.radmod *= -1;

	}
}

// canvas
var canvas;
var width, height;

// drawing related
var c1, c2;

function setup() {
	width = 1080;
	height = 1080;

	c1 = new Circle(width / 2, height / 2);
	c2 = new Circle(width / 2, height / 2);

	canvas = createCanvas(width, height);
	canvas.parent("#canvas-container");
	frameRate(90);

	smooth();
	noStroke();
	background(0);
}

function draw() {
	c1.Draw();
	c1.Draw()
	c2.Draw();
	c2.Draw();
}

function mouseClicked() {
	setup();
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
