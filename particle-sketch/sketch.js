// from codingtrain https://www.youtube.com/watch?v=UcdigVaIYAk
// made modifications to make it more like smoke



let particles = [];

function setup() {
    createCanvas(600, 400);
    // parameters for wind
    this.windx = 0;
    this.windy = 0;
    this.windlr= 0;
    this.windud=0;
    // setting the framerate
    frameRate(30);
    // to set the location that is generating the smoke
    this.bottom = 380;
    this.center = 300;  
    // setting the log size as offsets from the center and bottom
    this.log_width = 120;
    this.log_height = 20;

}

function draw(){
    background(0);
    // how many particles to create each iteration of draw
    for (let i = 0; i < random(5,10); i++){
      let p = new Particle();
      particles.push(p);       
    }
    // change the wind parameter for right to left
    // this.wind += random(-.1,.1)
    this.windlr += random(.015,.015);
    this.windx = sin(this.windlr) * 2;

    // change the updraft parameter for up to down
    // this.wind += random(-.1,.1)
    this.windud += random(.01,.01);
    this.windy = sin(this.windud) * 2;

    // iterating backwards over array so removing an element of array doesn't cause
    // an element to be skiped in evaluation.
    for (let i = particles.length-1; i >= 0; i--){
      particles[i].update(wind=this.wind);
      particles[i].show();
      if (particles[i].finished()){
        particles.splice(i, 1);
      }
    
    }
    // draw a rectangle at the bottom reprsenting wood that's burning?
    // to obscure the origin of the smoke
    fill(100,250);
    stroke(0);
    rect(center-(log_width/2),bottom,log_width,log_height,200);
    // stroke(255);
    // line(0,200,600,200);
    // line(0,300,600,300);
    // line(0,150,600,150);

}

class Particle {
    constructor() {
      // Setting first item parameters
      // wobling around the center in x
      this.x = random(center - 40,center + 40);
      // wobling around the bottom in y
      this.y = random(bottom,bottom-20);
      // radius
      this.r = random(20,50);
      // starting transparency
      this.alpha = 200 + random(-50,50);
      // change the fill based on where the particle is created
      // the closer to the center of the image the brighter
      // the farter to the left or right of the image it's darker
      this.fill = 255 - (abs(center-this.x)*random(1,4)) ;
      // Setting the rates of change section
      // the random change, or velocity will be set differently for each particle
      // but it will remain constant for that particle
      this.vx = random(-3,3);
      this.vy = random(-4,-1);
      this.vr = random(-2,-.5);
      this.valpha = random(-6,-2);
      this.vfill = random(-1.5,-1);
    }

    finished() {
      return this.alpha < 0;
    }
    update(wind) {
      // this.x += sin(this.vx + wind);
      this.x += this.vx + (windx);
      this.y += this.vy + (windy);
      this.alpha += this.valpha;
      this.fill += this.vfill;
      this.r += this.vr;
      if (this.r < 0){ this.r = 0}
    }
    show(){
      noStroke();
      // stroke(255, this.alpha);
      //fill(255,this.alpha);
      fill(this.fill,this.alpha)
      ellipse(this.x, this.y, this.r);
      // multiply as it goes up
      if (this.y < 400){
        ellipse(this.x+ random(-1,1), this.y + random(-1,1), this.r);
      }
      if (this.y < 250){
        ellipse(this.x+ random(-3,3), this.y + random(-3,3), this.r);
      }
      if (this.y < 200){
        ellipse(this.x+ random(-4,4), this.y + random(-4,4), this.r);
      }
      if (this.y < 150){
        ellipse(this.x+ random(-4,4), this.y + random(-4,4), this.r);
      }

      // ellipse(this.x, this.y, 16);
      // ellipse(this.x, this.y, random(5,20));

    }
}