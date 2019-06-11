var maxWidth;
var x = 0;
var y = 0;
var currentX, currentY;
var innerRad = 1;
var angle = 0;
var r, g, b;

function setup() {
	//maxWidth = window.innerHeight;
	maxWidth = 800;
	createCanvas(maxWidth, maxWidth);
	frameRate(60);
	x = maxWidth / 2;
	y = maxWidth / 2;
	currentX = x;
	currentY = y;
	r = randomSingle(50);
	g = randomSingle(50);
	b = randomSingle(50);
	fill(r, g, b);
	background(r, g, b);
}

function draw() {
	ellipse(currentX, currentY, innerRad, innerRad);
	currentX += (innerRad * Math.cos(angle));
	currentY += (innerRad * Math.sin(angle));
	innerRad += 0.05;
	angle += 0.25;

	if (angle % 8 == 0) {
		// slightly modify the params for randomSingle for different colors
		r = clamp(r + randomSingle(4), 0, 255);
		g = clamp(g + randomSingle(6), 0, 255);
		b = clamp(b + randomSingle(6), 0, 255);
		fill(r, g, b);
	}

	if (currentX < 0 - (innerRad * 2)) {
		frameRate(0);
	}
}

function randomSingle(max) {
	return Math.floor(Math.random() * max);
}

function clamp(val, min, max) {
	if (val > max) {
		return max;
	}

	if (val < min) {
		return min;
	}

	return val;
}
