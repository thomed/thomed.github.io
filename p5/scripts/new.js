var width, height;
var x, y, startX, startY, nextX, nextY;
var scaleX = 0.5;

var baseWidth, baseHeight;
var limitY;

function setup() {
	width = window.innerWidth;
	height = 480;
	//startX = width / 2;
	startX = 0;
	startY = 0;
	baseWidth = 50;
	baseHeight = 250;
	limitY = height + baseHeight;
	x = 0;
	y = 0;
	nextX = x;
	createCanvas(width, height);
	frameRate(60);
}

function draw() {
	// nextX += 1;
	// nextY = (Math.pow(nextX * scaleX, 2));
	// line(startX + x, startY + y, startX + nextX, startY + nextY);
	// line(startX - x, startY + y, startX - nextX, startY + nextY);
	// x = nextX;
	// y = nextY;
	makeShape(startX, startY, baseWidth, baseHeight);
	startY += 30;

	if (startY > limitY) {
		startY = 0;
		startX += 20;
	}

	if (startX > width) {
		noLoop();
	}
}

function makeShape(startX, startY, shapeWidth, shapeHeight) {
	beginShape();
	vertex(startX, startY);
	quadraticVertex(startX + shapeWidth / 2, startY - shapeHeight, startX + shapeWidth, startY);
	endShape(CLOSE);
}

function randomSingle() {
	return Math.floor(Math.random() * 255);
}