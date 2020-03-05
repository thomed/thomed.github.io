// canvas related
var canvas;
var width, height;

// drawing
var startX, startY;
var skyColor;
var mtnColor;
var peakColor;
var mtn;

class Mountain {
	recWidth = 4;		// width of rectangles
	recHeight = 5;		// height of initial rectangle
	heightMod = 50;		// add to rectangle height
	baseHeightMod = 50;	// starting heightmod
	capStart = 40;		// rectangles taller than this will have snow
	capMin = 35;
	capMax = 80;
	currentStep = 0;	// count for math fn (basically isolated x)
	maxStep = 85;		// restart mnt after this many steps
	absMult = 1;

	constructor(baseX, baseY) {
		this.x = baseX;
		this.y = baseY;
		this.currentStep = randomSingle(this.maxStep / 3);
		this.recHeight = -Math.abs((this.absMult * this.currentStep - (this.maxStep / 2))) + this.heightMod;
	}
	
	// calculate the next step of the mountain
	step() {
		this.x += this.recWidth;
		this.recHeight = -Math.abs((this.absMult * this.currentStep - (this.maxStep / 2))) + this.heightMod;
		this.recHeight += randomDifference(3);
		this.currentStep++;

		if (this.currentStep > this.maxStep * 0.6 && randomSingle(10) > 4) {
			this.heightMod = this.recHeight + this.baseHeightMod - 5;
			this.currentStep = 0;
			this.absMult = randomSingle(2) + 1;
		}
	}

	// draw rectangles for this step
	draw() {
		if (this.recHeight <= 0) {
			return;
		}

		fill(mtnColor);
		rect(this.x, this.y - this.recHeight, this.recWidth, this.recHeight);

		// snow caps
		if (this.recHeight >= this.capStart) {
			this.capStart = clamp(this.capStart + randomDifference(4), this.capMin, this.capMax);

			var capHeight = this.recHeight - this.capStart + randomDifference(4);
			fill(peakColor);
			rect(this.x, this.y - this.recHeight, this.recWidth, capHeight);
		}
	}

};

function setup() {
	width = window.innerWidth;
	height = 200;
	startX = 0;
	startY = height;
	x = 0;
	y = height / 2;

	skyColor = color('#60baff');
	mtnColor = color('#7a8469');
	peakColor = color('#ced9ef');
	mtn = new Mountain(startX, startY);
	
	canvas = createCanvas(width, height);
	canvas.id("mtncanvas");
	frameRate(60);
	noStroke();
//	background(skyColor);
}

function draw() {
	// stop running after passing the edge of canvas
	if (mtn.x < width) {
		fill(mtnColor);
		mtn.draw();
		mtn.step();
	} else {
		frameRate(0);
		mtn.x = width;
	}
}

/**
 * resize the canvas to the window width and copy over the contents.
 * continue drawing until the end of the new width.
 */
function windowResized() {
	frameRate(0);

	var p5img;
	var currentImg = new Image();
	var currentData = canvas.canvas.toDataURL();
	currentImg.src = currentData;

	currentImg.onload = function() {
		width = window.innerWidth;
		resizeCanvas(width, height);
		p5img = createImage(currentImg.width, currentImg.height);
		p5img.drawingContext.drawImage(currentImg, 0, 0);
//		background(skyColor);
		image(p5img, 0, 0);
		mtn.x -= mtn.recWidth;
		frameRate(60);
	}
}

function clamp(val, min, max) {
	if (val < min) {
		return min;
	} else if (val > max) {
		return max;
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

