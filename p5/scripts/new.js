var width, height;
var startX, startY;
var margin;
var shapeWidth;
var squares = [];
var numWide, numTall;

class Square {
	constructor(x, y, width) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.r = randomSingle(255);
		this.g = randomSingle(255);
		this.b = randomSingle(255);
		this.angle = 0;
	}

	draw() {
		if (mouseInSquare(this)) {
			this.angle += 0.01;
		}

		// rectMode(CENTER);
		rotate(this.angle);
		fill(this.r, this.g, this.b);
		//square(this.x, this.y, this.width);
		rect(this.x, this.y, this.width, this.width);
		// this.angle -= 0.01;
	}

}

function setup() {
	width = 480;
	height = 480;
	shapeWidth = 25;
	margin = 4;
	startX = margin;
	startY = margin;
	x = startX;
	y = startY;
	rectMode(CENTER);

	for (var i = 0; y < height; i++) {
		for (var j = 0; x < width; j++) {
			squares[squares.length] = new Square(x, y, shapeWidth);
			x += shapeWidth + margin;
		}
		x = startX;
		y += shapeWidth + margin;
	}

//	squares[0] = new Square(margin, margin, shapeWidth);

	createCanvas(width, height);
	frameRate(10);
}

function draw() {
	clear();
	for (var i = 0; i < squares.length; i++) {
		push();
		squares[i].draw();
		pop();
	}

	if (x > width) {
		x = startX;
		startY += 10;
		y = startY;
	}
}

function mouseInSquare(square) {
	return (mouseX > square.x) && (mouseY > square.y) && (mouseX < square.x + square.width) && (mouseY < square.y + square.width);
}

function randomSingle() {
	return Math.floor(Math.random() * 255);
}
