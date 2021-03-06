var maxWidth;
var x = 0;
var y = 0;
var currentX, currentY;
var innerRad = 1;
var angle = 0;
var r, g, b;
var rMod, gMod, bMod;
var maxR = 255, maxG = 255, maxB = 255;
var playing = 1;

function setup() {
	//maxWidth = window.innerHeight;
	maxWidth = 800;
	createCanvas(maxWidth, maxWidth);
	frameRate(60);
	x = maxWidth / 2;
	y = maxWidth / 2;
	currentX = x;
	currentY = y;
	r = randomSingle(125);
	g = randomSingle(125);
	b = randomSingle(125);
	rMod = randomSingle(10) < 5 ? -1 : 1;
	gMod = randomSingle(10) < 5 ? -1 : 1;
	bMod = randomSingle(10) < 5 ? -1 : 1;
	fill(r, g, b);
	background(r, g, b);

	document.getElementsByTagName('canvas')[0].addEventListener('click', togglePlay);
	document.getElementsByTagName('canvas')[0].addEventListener('touchstart', togglePlay);
}

function draw() {
	ellipse(currentX, currentY, innerRad, innerRad);
	currentX += (innerRad * Math.cos(angle));
	currentY += (innerRad * Math.sin(angle));
	innerRad += 0.05;
	angle += 0.25;

	if (angle % 8 == 0) {
		// slightly modify the params for randomSingle for different colors
		r = clamp(r + (randomSingle(7) * rMod), 0, maxR);
		g = clamp(g + (randomSingle(8) * gMod), 0, maxG);
		b = clamp(b + (randomSingle(7) * bMod), 0, maxB);
		fill(r, g, b);

		if (r == maxR || r == 0) { rMod *= -1; }
		if (g == maxG || g == 0) { gMod *= -1; }
		if (b == maxB || b == 0) { bMod *= -1; }
	}

	if (currentX < 0 - (innerRad * 2)) {
		frameRate(0);
	}
}

function togglePlay() {
	if (playing) {
		noLoop();
	} else {
		loop();
	}
	playing = !playing;
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
