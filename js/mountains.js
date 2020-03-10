// canvas related
var canvas;
var width, height;

// drawing
var startX, startY;
var skyColor;
var mtnColor;
var peakColor;
var mtn;

// use to cache the values of each step
class CacheValley {
	x = [];
	recHeight = [];
	capStart = [];
	capHeight = [];
}


class Mountain {
	i = 0;                           // iteration index
	cacheValley = new CacheValley(); // cache for the steps
	recWidth = 4;                    // width of rectangles
	recHeight = 5;                   // height of initial rectangle
	heightMod = 50;                  // add to rectangle height
	baseHeightMod = 50;              // starting heightmod
	capStart = 40;                   // rectangles taller than this will have snow
	capMin = 35;                     // minimum cap start
	capMax = 80;                     // maximum cap start
	currentStep = 0;                 // count for math fn (basically isolated x)
	maxStep = 85;                    // restart mnt after this many steps
	absMult = 1;                     // modify absolute value fn

	constructor(baseX, baseY) {
		this.x = baseX - this.recWidth;
		this.y = baseY;
		this.currentStep = randomSingle(this.maxStep / 3);
	}
	
	// calculate the next step of the mountain
	step() {
		this.x += this.recWidth;
		this.recHeight = -Math.abs((this.absMult * this.currentStep - (this.maxStep / 2))) + this.heightMod;
		this.recHeight += randomDifference(3);
		this.currentStep++;

		// defining snowy peaks at certain elevations
		if (this.recHeight >= this.capStart) {
			this.capStart = clamp(this.capStart + randomDifference(3), this.capMin, this.capMax);
			this.cacheValley.capStart[this.i] = this.capStart;
			this.cacheValley.capHeight[this.i] = this.recHeight - this.capStart + randomDifference(4);
		} else {
			this.cacheValley.capStart[this.i] = 0;
			this.cacheValley.capHeight[this.i] = 0;
		}

		// starting a new peak some time after this peak
		if (this.currentStep > this.maxStep * 0.6 && randomSingle(10) > 4) {
			this.heightMod = this.recHeight + this.baseHeightMod - 5;
			this.currentStep = 0;
			this.absMult = randomSingle(2) + 1;
		}


		this.cacheValley.x[this.i] = this.x;
		this.cacheValley.recHeight[this.i] = this.recHeight;
		this.i++;
	}

	// draw rectangles for this step
	draw() {
		var i = this.i;

		// if no cached values at index, step to create
		while (mtn.cacheValley.x.length - 1 < i) {
			mtn.step();
		}

		var x = this.cacheValley.x[i];
		var y = this.y;
		var recHeight = this.cacheValley.recHeight[i];
		var capHeight = this.cacheValley.capHeight[i];

		if (recHeight <= 0) { return; }

		fill(mtnColor);
		rect(x, y - recHeight, this.recWidth, recHeight);
		fill(peakColor);
		rect(x, y - recHeight, this.recWidth, capHeight);
	}

};

function setup() {
	width = window.innerWidth;
	height = 200;
	startX = 0;
	startY = height;
	x = 0;

	skyColor = color('#60baff');
//	mtnColor = color('#7a8469');
	mtnColor = color('#5e6354');
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
		mtn.draw();
	} else {
		frameRate(0);
		console.log("done");
	}
}

/**
 * resize the canvas to the window width and copy over the contents.
 * continue drawing until the end of the new width.
 */
function windowResized() {
	frameRate(0);
	resizeCanvas(window.innerWidth, height);
//	background(skyColor);

	// redraw from cache
	var it = mtn.i;
	for (i = 0; mtn.cacheValley.x[i] <= window.innerWidth && i < mtn.cacheValley.x.length; i++) {
		mtn.i = i;
		mtn.draw();
	}

	mtn.i = it;
	width = window.innerWidth;
	updatePixels();
	frameRate(60);
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

