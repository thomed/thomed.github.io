/**
 * promising directions for function for northern side of canyon:
 * y = sqrt(x) * xrt(x)
 * y = xrt(logx)
 */

// canvas related
var width, height;

// drawing
var skyColor;
var mtnColor;
var peakColor;
var mtn;
var startX, startY;

class Mountain {
	recWidth = 4; 
	recHeight = 50;
	heightMod = 50;
	capStart = 34;
	currentStep = 0;
	maxStep = 100;

	constructor(baseX, baseY) {
		this.x = baseX;
		this.y = baseY;
	}
	
	step() {
		if (this.currentStep > this.maxStep) {

			this.currentStep = 0;
		}

		this.x += this.recWidth + 1;

		this.recHeight = -Math.abs((this.currentStep - (this.maxStep / 2))) + this.heightMod;
		this.recHeight += randomDifference(3);

		this.currentStep++;
	}

	draw() {
		rect(this.x, this.y - this.recHeight, this.recWidth, this.recHeight);

		//if (this.currentStep >= this.maxStep * 0.33 && this.currentStep <= this.maxStep * 0.66) {
		if (this.recHeight >= this.capStart) {
			fill(peakColor);
			//rect(this.x, this.y - this.recHeight, this.recWidth, this.recHeight * 0.2);
			var capHeight = this.recHeight - this.capStart + randomDifference(3);
			rect(this.x, this.y - this.recHeight, this.recWidth, capHeight);
			fill(mtnColor);
		}
	}

};

function setup() {
	width = window.innerWidth;
	height = 480;
	startX = 0;
	startY = 0;
	x = 0;
	y = height / 2;

	skyColor = color('#60baff');
	mtnColor = color('#998877');
	peakColor = color('#ddeafa');
	mtn = new Mountain(startX, y + 50);
	console.log(mtn);
	
	createCanvas(width, height);
	frameRate(60);
	noStroke();
	background(skyColor);
}

function draw() {
	// stop running after passing the edge of canvas
	if (x > width) {
		frameRate(0);
		console.log("done");
	}

//	fill(150, 130, 120);
	fill(mtnColor);

	// y = 40 * log_10(x + 1)^(log_100(x+1)
//	recHeight = 40 * Math.pow(Math.log10(x + 1), 1 / (Math.log(x + 1) / Math.log(100)));

	mtn.draw();
	mtn.step();
}

// random [0, 255]
function randomSingle() {
	return Math.floor(Math.random() * 255);
}

// return a random modifier between +- max to add roughness
function randomDifference(max) {
	var diff = Math.floor(Math.random() * max);
	diff *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	return diff;
}

