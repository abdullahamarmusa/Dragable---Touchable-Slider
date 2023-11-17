const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slider = document.querySelector(".slider-wrapper");
const innerSlider = document.querySelector(".slider-inner");

let dragged = false;
let startX;
let x;


slider.addEventListener("mouseenter", () => {
	slider.style.cursor = "grab";
});


slider.addEventListener("mousemove", (e) => {
	if (!dragged) return;
	e.preventDefault();

	x = e.offsetX;

	innerSlider.style.left = `${x - startX}px`;

	checkProbs();
});
slider.addEventListener("mouseup", () => {
	slider.style.cursor = "grab";
	dragged = false;
});
slider.addEventListener("mousedown", (e) => {
	dragged = true;
	startX = e.offsetX - innerSlider.offsetLeft;
	slider.style.cursor = "grabbing";
});








slider.addEventListener(
	"touchstart",
	(e) => {
		dragged = true;
		startX = e.targetTouches[0].clientX - innerSlider.offsetLeft;

		checkProbs();
	},
	{ passive: true }
);

slider.addEventListener(
	"touchmove",
	(e) => {
		if (!dragged) return;
		x = e.targetTouches[0].clientX;

		innerSlider.style.left = `${x - startX}px`;

		checkProbs();
	},
	{ passive: true }
);

prev.addEventListener("click", () => {
	let innerSliderLeft = innerSlider.style.left;
	innerSlider.style.left =
		parseInt(innerSliderLeft.replace("px", "")) + 265 + "px";

	checkProbs();
});

next.addEventListener("click", () => {
	let innerSliderLeft = innerSlider.style.left;
	innerSlider.style.left = innerSliderLeft.replace("px", "") - 265 + "px";

	checkProbs();
});

const checkProbs = () => {
	let outer = slider.getBoundingClientRect();
	let inner = innerSlider.getBoundingClientRect();

	if (parseInt(innerSlider.style.left) > 0) innerSlider.style.left = "-10px";

	if (inner.right < outer.right)
		innerSlider.style.left = `-${inner.width - outer.width - 10}px`;
};
