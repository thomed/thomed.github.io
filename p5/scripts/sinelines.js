var canvasWidth;
var currentX, currentY;
var nextX, nextY;
var angle;
var angleMod;
var r, g, b;
var rMod = 0.05, gMod = 0.1, bMod = 0.09;
var weight = 30;
var weightMod = 0.01;
var gap = 30;

function setup() {
	canvasWidth = 800;
	currentX = 0;
	currentY = 50;
	angle = 0;
	angleMod = 0;
	r = 20;
	g = 130;
	b = 170;
	createCanvas(canvasWidth, canvasWidth);
	frameRate(30);
	fill(255);
	stroke(r, g, b);
	strokeWeight(weight);
}

function draw() {
	clear();
	background(55);

	currentX = 0;
	currentY = 10;
	angle = 0 + angleMod;
	while (currentX < canvasWidth) {
		nextY = currentY + Math.sin(8 * angle) * 8;
		nextX = currentX + 10;
		for (var count = 0; count * gap < canvasWidth; count += 2) {
			line(currentX, currentY + (gap * count), nextX, nextY + (gap * count));
		}

		angle += (Math.PI / 64);
		currentX = nextX;
		currentY = nextY;

		r += rMod;
		g += gMod;
		b += bMod;
		rMod = r >= 255 || r <= 0 ? -rMod : rMod;
		gMod = g >= 255 || g <= 0 ? -gMod : gMod;
		bMod = b >= 255 || b <= 0 ? -bMod : bMod;

		weight += weightMod;
		weightMod = weight > 35 || weight < 15 ? -weightMod : weightMod;
		strokeWeight(weight);
		stroke(r, g, b);
	}

	angleMod -= 0.01;
}