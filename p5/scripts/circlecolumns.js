var x = 0;
var y = 0;
var rad = 40;
var mult = 1;

function setup() {
	createCanvas(window.innerWidth, 480);
	frameRate(60);
}

function draw() {
	fill(randomSingle(), randomSingle(), randomSingle(), randomSingle());
	ellipse(x, y, rad, rad);
	x += rad;

	if (x > window.innerWidth) {
		x = 0;
		y += rad;
	}

	if (y > 480) {
		y = rad / 2 * mult;
		mult += 0.33;
	}
}

function randomSingle() {
	return Math.floor(Math.random() * 255);
}