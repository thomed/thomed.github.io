// canvas related
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
	capStart = 34;		// rectangles taller than this will have snow
	currentStep = 0;	// count for math fn (basically isolated x)
	maxStep = 85;		// restart mnt after this many steps

	constructor(baseX, baseY) {
		this.x = baseX;
		this.y = baseY;
	}
	
	// calculate the next step of the mountain
	step() {
		this.x += this.recWidth + 1;
		this.recHeight = -Math.abs((this.currentStep - (this.maxStep / 2))) + this.heightMod;
		this.recHeight += randomDifference(3);
		this.currentStep++;

		if (this.currentStep > this.maxStep * 0.7 && randomSingle(10) > 4) {
			console.log("HeightMod = " + this.heightMod + ". RecHeight = " + this.recHeight);
			this.heightMod = this.recHeight + this.baseHeightMod - 5;
			this.currentStep = 0;
		}
	}

	// draw rectangles for this step
	draw() {
		rect(this.x, this.y - this.recHeight, this.recWidth, this.recHeight);

		// snow caps
		if (this.recHeight >= this.capStart) {
			var capHeight = this.recHeight - this.capStart + randomDifference(3);

			fill(peakColor);
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
	if (mtn.x > width) {
		frameRate(0);
		console.log("done");
	}

	fill(mtnColor);

	mtn.draw();
	mtn.step();
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

