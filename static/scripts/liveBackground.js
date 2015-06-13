/* globals window, document */
var resizeLiveBackground;

(function() {
	var canvas = document.getElementById("live-background");
	var ctx = canvas.getContext("2d");

	var width;
	var height;
	var offsetTop

	function size() {
		var sizing = document.getElementsByClassName("header")[0].getBoundingClientRect();
		height = sizing.height;
		width = document.body.getBoundingClientRect().width;
		offsetTop = sizing.top;

		canvas.height = height;
		canvas.width = width;
		
		ctx.fillStyle = "hsla(223, 60%, 60%, 1)"; // this get's reset when the size is changed, so we have to put it in here
	}
	resizeLiveBackground = size; // so that we can access it from other scripts
	window.addEventListener("resize", size);
	size();

	var elements = [];

	function randomBetween(start, end) {
		return Math.random() * (start + end);
	}

	function Element(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size;
	}

	Element.prototype.draw = function() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
			ctx.fill();
	};

	Element.prototype.checkPos = function() {
		if(this.x + (this.size * 3) > width){
			this.x = 0 - this.size;
		}
		if(this.y - (this.size * 2) > height){
			this.y = 0 - this.size;
		}
	};

	Element.prototype.move = function() {
		this.x += 0.5;
		this.y += 0.5;

		this.checkPos();
		this.draw();
	};
	Element.prototype.moveBig = function() {
		this.x += 15;
		this.y += 15;

		this.checkPos();
		this.draw();
	};

	function doOneCyle() {
		for(var i = 0; i < elements.length; i++) {		
			if(nextMoveBig){
				elements[i].moveBig();
			}
			else{
				elements[i].move();
			}
		}

		if(nextMoveBig){
			nextMoveBig = false;
		}
	}

	function initializeElements() {
		for(var i = 0; i < 10; i++) {
			elements.push(
				new Element(
					randomBetween(0, width),
					randomBetween(0, height),
					randomBetween(30, 60)
				)
			);
		}
	}

	function loop() {
		window.requestAnimationFrame(loop);

		ctx.clearRect(0, 0, width, height);
		doOneCyle();
	}

	var nextMoveBig = false;

	canvas.addEventListener("mousemove", function() {
		nextMoveBig = true;
	});
	canvas.addEventListener("touch", function() {
		nextMoveBig = true;
	});

	initializeElements();
	loop();
}());