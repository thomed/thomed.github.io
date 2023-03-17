// canvas related
var canvas;
var width, height;

// drawing
var startX, startY;
var skyColor;
var mtnColor;
var peakColor;
var mtn;
var cache = [];

const recWidth = 3;


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
        // this.x = baseX - this.recWidth;
        this.y = baseY;
        this.currentStep = randomSingle(this.maxStep);
    }

    // calculate the next step of the mountain
    step() {
        // this.x += this.recWidth;
        this.recHeight = -Math.abs((this.absMult * this.currentStep - (this.maxStep / 2))) + this.heightMod;
        this.recHeight += randomDifference(2);
        this.currentStep++;

        // defining snowy peaks at certain elevations
        if (this.recHeight >= this.capStart) {
            this.capStart = clamp(this.capStart + randomDifference(3), Math.min(this.recHeight, this.capMin), this.capMax);
            this.capHeight = this.recHeight - this.capStart + randomDifference(4);
        } else {
            this.capStart = 0;
            this.capHeight = 0;
        }

        // starting a new peak some time after this peak
        if (this.recHeight < 100 && this.currentStep > this.maxStep * 0.73 && randomSingle(10) > 2) {
            this.heightMod = this.recHeight + this.baseHeightMod - this.capMin;
            this.currentStep = 0;
            this.absMult = randomSingle(2) + 1;
        }
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
    cache = [];

    skyColor = color('#509adf');
    mtnColor = color('#7a8469');
    mtnColor = color('#5e6354');
    peakColor = color('#ced9ef');
    mtn = new Mountain(startX, startY);
    cache.push(mtn);

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
    clear();

    for (var i = 0; i < cache.length; i++) {
        // console.log(i);
        // cache[i].draw(recWidth * i);
        let x = recWidth * i;
        fill(mtnColor);
        rect(x - recWidth, startY - cache[i].recHeight, recWidth, cache[i].recHeight);
        fill(peakColor);
        rect(x - recWidth, startY - cache[i].recHeight, recWidth, cache[i].capHeight);
    }

    mtn.step();

    cache.push({
        recHeight: mtn.recHeight,
        capHeight: mtn.capHeight
    });

    if (cache.length * recWidth > width + recWidth) {
        cache.shift();
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

