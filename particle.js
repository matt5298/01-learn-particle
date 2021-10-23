let p;

function setup() {
    createCanvas(600, 400);
    p = new Particle();
}

function draw() {
    background(0);
    p.show();
}

class Particle {
    constructor() {
        this.x = 300;
        this.y = 380;
    }
}