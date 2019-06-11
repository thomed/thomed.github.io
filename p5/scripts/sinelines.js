var canvasWidth;
var currentX, currentY;
var nextX, nextY;
var angle;
var angleMod;
var r, g, b;
var rMod = 0.1, gMod = 0.3, bMod = 0.2;
var weight = 30;

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
	for (currentY = 10; currentY < canvasWidth + weight; currentY += (weight * 2)) {
		currentX = 0;
		angle = 0 + angleMod;
		while (currentX < canvasWidth) {
			// mess around with sine/angle modifiers for interesting things
			nextY = currentY + Math.sin(8 * angle) * 2;
			nextX = currentX + 4;
			line(currentX, currentY, nextX, nextY);
			angle += (Math.PI / 64);
			currentX = nextX;
			currentY = nextY;
		}

		r += rMod;
		g += gMod;
		b += bMod;

		rMod = r >= 255 || r <= 0 ? -rMod : rMod;
		gMod = g >= 255 || g <= 0 ? -gMod : gMod;
		bMod = b >= 255 || b <= 0 ? -bMod : bMod;
		stroke(r, g, b);
	}

//	currentX = 0;
//	currentY = 50;
//	angle = 0 + angleMod;
//	while (currentX < canvasWidth) {
//		//nextY = currentY + Math.sin(4 * angle) / 8;
//		nextY = currentY + Math.sin(4 * angle) / 8;
//		nextX = currentX + 4;
//		//for (var y = currentY; y < canvasWidth + weight; y += (weight * 4)) {
//		for (var count = 0; count * width < canvasWidth; count++) {
//			line(currentX, currentY * count, nextX, 50 * count);
//			console.log(count);
//		}
//		angle += (Math.PI / 64);
//		currentX = nextX;
//		currentY = nextY;
//	}

	angleMod -= 0.01;
}