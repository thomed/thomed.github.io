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
	capStart = 40;		// rectangles taller than this will have snow
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
			console.log("HeightMod = " + this.heightMod + ". RecHeight = " + this.recHeight);
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

		rect(this.x, this.y - this.recHeight, this.recWidth, this.recHeight);

		// snow caps
		if (this.recHeight >= this.capStart) {
			var capHeight = this.recHeight - this.capStart + randomDifference(4);

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
	mtn = new Mountain(startX, height);
	console.log(mtn);
	
	createCanvas(width, height);
	frameRate(60);
	noStroke();
	background(skyColor);
}

function draw() {
	// stop running after passing the edge of canvas
	if (mtn.x < width) {
		mtn.draw();
		mtn.step();
	} else {
		frameRate(0);
		console.log("done");
	}

	fill(mtnColor);


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

