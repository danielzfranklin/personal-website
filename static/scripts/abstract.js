function Bubble(h, k, r){
    // h,k: x,y coords of center
    // r: radius
    if(!(this instanceof arguments.callee)){
        throw new TypeError("Constructor must be used with new");
    }
    this.h = h;
    this.k = k;
    this.r = r;
}
Bubble.prototype.MIN_BUBBLE_SIZE = 10;
Bubble.prototype.MAX_BUBBLE_SIZE = 30;
Bubble.prototype.BUBBLE_COLOR = "blue";
Bubble.prototype.range_random = function (min, max){
    // return a random number between min and max inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}
Bubble.prototype.randomize = function(canvas_w, canvas_h){
    this.h = this.range_random(0, canvas_w);
    this.k = this.range_random(0, canvas_h);
    this.r = this.range_random(this.MIN_BUBBLE_SIZE, this.MAX_BUBBLE_SIZE);
    return this;
}
Bubble.prototype.start_at_top = function(canvas_w){
    this.r = this.range_random(this.MIN_BUBBLE_SIZE, this.MAX_BUBBLE_SIZE);
    this.h = this.range_random(0, canvas_w);
    this.k = 0 - this.r;
    return this;
}
Bubble.prototype.move = function(delta_h, delta_k){
    this.h += delta_h;
    this.k += delta_k;
}
Bubble.prototype.contains = function(x, y){
    // is x, y inside the bubble
    // eq bubble: (x - h)^2 + (y - k)^2 = r^2
    return Math.pow(x - this.h, 2) + Math.pow(y - this.k, 2) == Math.pow(this.r, 2)
}
Bubble.prototype.inside = function(w, h){
    // is the bubble inside the rectangle (0,0) (w,0) (w,h) (0,h) fully or partly?
    return (this.h - this.r) < w && (this.k - this.r) < h;
}
Bubble.prototype.draw_to_context = function(ctx){
    ctx.beginPath();
    ctx.arc(this.h, this.k, this.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.BUBBLE_COLOR;
    ctx.fill();
}


function AbstractAnimation(container){
    this.container = container;
    this.bubbles = [];
    this.canvas = document.createElement("canvas");

    // setup the canvas
    this.canvas.className = "abstract-canvas";
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    var canvas_size = this.canvas.getBoundingClientRect();
    this.w = canvas_size.width;
    this.h = canvas_size.height;

    // name the container so that our css can style it
    this.container.classList.add("abstract-container");

    // variable to store the latest mouse movement vector
    this.mousedelta = {x: 1, y: 1};

    this.main();
}
AbstractAnimation.prototype.STARTING_NUMBER = 30;
AbstractAnimation.prototype.clear = function(){
    var canvas_size = this.canvas.getBoundingClientRect();
    this.canvas.width = this.w = canvas_size.width;
    this.canvas.height = this.h = canvas_size.height;
}
AbstractAnimation.prototype.initialize_bubbles = function(bubble_count){
    this.bubbles = [];
    var bubbles_created = 0;
    while(bubbles_created < bubble_count){
        this.bubbles.push(new Bubble().randomize(this.w, this.h));
        bubbles_created ++;
    }
}
AbstractAnimation.prototype.update = function(){
    // decreases the amount to be more reasonable and prevents it from moving forever
    var MAX_DELTA = 30;
    var DECREASE = 0.2;
    function normalize_delta(delta){
        var sign = Math.sign(delta);
        if(delta != 0) delta -= DECREASE * sign;
        if(Math.abs(delta) > MAX_DELTA) delta = sign * MAX_DELTA;
        if(Math.abs(delta) < 1) delta = 1;
        return delta;
    }
    this.mousedelta.x = normalize_delta(this.mousedelta.x);
    this.mousedelta.y = normalize_delta(this.mousedelta.y);

    this.bubbles.forEach((bubble, i)=>{
        bubble.move(0.1 * this.mousedelta.x, 0.1 * this.mousedelta.y);
        if(bubble.inside(this.w, this.h)){
            bubble.draw_to_context(this.ctx);
        }
        else{
            delete this.bubbles[i];
            this.bubbles.push(new Bubble().start_at_top(this.w));
        }
    });
}
AbstractAnimation.prototype.render_loop = function(){
    this.clear();
    this.update();
    requestAnimationFrame(this.render_loop.bind(this));
}
AbstractAnimation.prototype.main = function(){
    this.container.addEventListener("mousemove", event =>{
        this.mousedelta = {x: event.movementX, y: event.movementY}
    });
    this.initialize_bubbles(this.STARTING_NUMBER);
    this.render_loop();
}
