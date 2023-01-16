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
    recWidth = 3;        // width of rectangles
    recHeight = 4;       // height of initial rectangle
    heightMod = 40;      // add to rectangle height
    baseHeightMod = 40;  // starting heightmod
    capStart = 20;       // rectangles taller than this will have snow
    capHeight = 0;       // the height of the rectangle drawn for the cap
    capMin = 15;         // minimum cap start
    capMax = 80;         // maximum cap start
    currentStep = 0;     // count for math fn (basically isolated x)
    maxStep = 44;        // restart mnt after this many steps
    absMult = 1;         // modify absolute value fn

    constructor(baseX, baseY) {
        this.x = baseX - this.recWidth;
        this.y = baseY;
        this.currentStep = randomSingle(this.maxStep);
    }

    // calculate the next step of the mountain
    step() {
        this.x += this.recWidth;
        this.recHeight = -Math.abs((this.absMult * this.currentStep - (this.maxStep / 2))) + this.heightMod;
        this.recHeight += randomDifference(2);
        this.currentStep++;

        // defining snowy peaks at certain elevations
        if (this.recHeight >= this.capStart) {
            this.capStart = clamp(this.capStart + randomDifference(3), this.capMin, this.capMax);
            this.capHeight = this.recHeight - this.capStart + randomDifference(4);
        } else {
            this.capStart = 0;
            this.capHeight = 0;
        }

        // starting a new peak some time after this peak
        if (this.recHeight < 100 && this.currentStep > this.maxStep * 0.6 && randomSingle(10) > 2) {
            this.heightMod = this.recHeight + this.baseHeightMod - this.capMin;
            this.currentStep = 0;
            this.absMult = randomSingle(2) + 1;
        }
    }

    // draw rectangles for this step
    draw() {
        if (this.recHeight <= 0) { return; }

        mtn.step();

        fill(mtnColor);
        rect(this.x, this.y - this.recHeight, this.recWidth, this.recHeight);
        fill(peakColor);
        rect(this.x, this.y - this.recHeight, this.recWidth, this.capHeight);
    }

};

/**
 * Initialize everything needed to start drawing.
 */
function setup() {
    let parentEl = document.getElementById("hey-content");
    width = parentEl.offsetWidth;
    height = parentEl.offsetHeight;
    startX = 0;
    startY = height;
    x = 0;

    skyColor = color('#509adf');
    mtnColor = color('#7a8469');
    mtnColor = color('#5e6354');
    peakColor = color('#ced9ef');
    mtn = new Mountain(startX, startY);

    canvas = createCanvas(width, height);
    canvas.id("mtncanvas");
    canvas.parent("hey-content");
    frameRate(60);
    noStroke();
    //	background(skyColor);
}

/**
 * Handle drawing on the canvas.
 */
function draw() {
    // stop running after passing the edge of canvas
    if (mtn.x < width) {
        mtn.draw();
        mtn.draw();
    } else {
        frameRate(0);
        console.log("done");
    }
}

/**
 * Random [0, max].
 */
function randomSingle(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Return a random modifier between +- max to add roughness.
 */
function randomDifference(max) {
    var diff = Math.floor(Math.random() * max);
    diff *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return diff;
}

