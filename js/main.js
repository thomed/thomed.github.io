let heyx = 0, heyy = 0;
const speed = 10, duration = 175;

document.addEventListener("DOMContentLoaded", () => {
	let heyElement = document.getElementById("👋");
	heyElement.addEventListener("mouseover", hey);
	heyElement.addEventListener("mousedown", hey);

	let remntn = document.getElementById("mtn-btn");
	remntn.addEventListener("mousedown", setup);

	init();
});

/**
 * Called before outit().
 */
function init() {
	heyx = Math.floor(Math.random() * 95);
	heyy = Math.floor(Math.random() * 60);

	let heyElement = document.getElementById("👋");
	heyElement.style.left = `${heyx}%`;
	heyElement.style.top = `${heyy}%`;
	heyElement.style.display = "inline";
}

/**
 * The function name is self-descriptive.
 */
function hey(event) {
	const { target } = event;

	// Move left or right?
	if (event.x > target.offsetLeft + (target.offsetWidth / 2)) {
		heyx -= speed;
	} else {
		heyx += speed;
	}

	// Move up or down?
	if (event.y > target.offsetTop + (target.offsetHeight / 2)) {
		heyy -= speed;
	} else {
		heyy += speed;
	}
	
	// Limit to bounds of parent
	heyx = clamp(heyx, 0, 100 - (target.offsetWidth / target.parentElement.offsetWidth) * 100);
	heyy = clamp(heyy, 0, 100 - (target.offsetHeight / target.parentElement.offsetHeight) * 100);
	
	// Animate to position and save
	target.animate([ { left: `${heyx}%`, top: `${heyy}%`} ],
	{
		duration: duration,
		iterations: 1,
		easing: "ease-in-out"
	}).finished.then(() => {
		target.style.left = heyx + "%";
		target.style.top = heyy + "%";
	});
}

/**
 * Secures wooden materials while the glue dries.
 */
function clamp(value, min, max) {
	if (value < min) return min;
	if (value > max) return max;
	return value;
}

