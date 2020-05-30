// canvas related
var canvas;
var width, height;

// drawing related
var strokewidth = 8;
var nodes = [];
var roots = [];
var spacing;
var margin;
var numNodes;
var hnodes, vnodes;

class Node {

	lleft = null;
	lright = null;
	uleft = null;
	uright = null;
	next = null;
	path = [];

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	chooseNext() {
		var r = randomSingle(4);
		if (r == 0 && this.lright != null) {
			this.next = this.lright;
		} else if (r == 1 && this.lleft != null) {
			this.next = this.lleft;
		} else if (r == 2 && this.uright != null) {
			this.next = this.uright;
		} else if (r == 3 && this.uleft != null) {
			this.next = this.uleft;
		}

		return this.next;
	}

	draw() {
//		point(this.x, this.y);

		var last = this.path[this.path.length - 1];
		if (last != null) {
			var n = last.chooseNext();
			this.path.push(n);
		} else {
			this.path.pop();
		}

		
		for (i = this.path.length - 2; i < this.path.length - 1; i++) {
			if (this.path[i + 1] == null) {
				continue;
			}

			// symmetry
			line(this.path[i].x, this.path[i].y, this.path[i + 1].x, this.path[i + 1].y);
			line(this.path[i].y, this.path[i].x, this.path[i + 1].y, this.path[i + 1].x);
			//line(this.path[i].x, height - this.path[i].y, this.path[i + 1].x, height - this.path[i + 1].y);
			//line(width - this.path[i].x, this.path[i].y, width - this.path[i + 1].x, this.path[i + 1].y);
			line(width - this.path[i].x, height - this.path[i].y, width - this.path[i + 1].x, height - this.path[i + 1].y);
			line(width - this.path[i].y, height - this.path[i].x, width - this.path[i + 1].y, height - this.path[i + 1].x);
		}
	}
}

function setup() {
	width = 800;
	height = 800;
	margin = 50;
	spacing = 10;

	hnodes = Math.floor((width - (2 * margin)) / spacing);
	vnodes = Math.floor((height - (2 * margin)) / spacing);
	numNodes = hnodes * vnodes;
	console.log(numNodes);

	var x = margin;
	var y = margin;

	// initialize 2d array of nodes
	for (i = 0; y < height - margin; i++) {
		nodes.push([]);
		for (j = 0; x < width - margin; j++) {
			nodes[i].push(new Node(x, y));
			x += spacing;
		}

		x = margin;
		y += spacing;
	}
	
	// set node relations
	for (i = 0; i < nodes.length; i++) {
		for (j = 0; j < nodes[0].length; j++) {

			// set lower right (above bottom row, left of right edge)
			if (i != nodes.length - 1 && j != nodes[0].length - 1) {
				nodes[i][j].lright = nodes[i + 1][j + 1];
			}

			// set lower left (above bottom row, right of left edge)
			if (i != nodes.length - 1 && j > 0) {
				nodes[i][j].lleft = nodes[i + 1][j - 1];
			}

			// set upper right
			if (i > 0 && j < nodes[0].length - 1) {
				nodes[i][j].uright = nodes[i - 1][j + 1];
			}

			// set upper left
			if (i > 0 && j > 0) {
				nodes[i][j].uleft = nodes[i - 1][j - 1];
			}
		}
	}


	// random root locations
//	for (rootCount = 0; rootCount < 4; rootCount++) {
//		roots.push(nodes[randomSingle(nodes.length)][randomSingle(nodes[rootCount].length)]);
//		roots[rootCount].path.push(roots[rootCount]);
//	}

	// center node
	roots.push(nodes[Math.floor(nodes.length / 2)][Math.floor(nodes[0].length / 2)]);
	roots[roots.length - 1].path.push(roots[roots.length - 1]);

	// p5 config
	canvas = createCanvas(width, height);
	frameRate(60);
	background("#2b2b2b");
	stroke("#b0a0ff");
	stroke("#5599ee");
	strokeWeight(strokewidth);
}

function mouseClicked() {
	var fr = frameRate();
	frameRate(fr > 0 ? 0 : 60);
}

function draw() {
	roots.forEach(function(r) {
		for (drawCount = 0; drawCount < 2; drawCount++) {
			r.draw();
		}
	});
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

