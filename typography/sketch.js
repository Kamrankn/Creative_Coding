let customFont;
let gradient;
let particles = [];

function preload() {
  // Load the TTF font file
  customFont = loadFont('gg.ttf'); // replace with your font file name
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(50);

  // Create a gradient background
  gradient = createGraphics(width, height);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 182, 193), color(30, 144, 255), inter);
    gradient.stroke(c);
    gradient.line(0, y, width, y);
  }

  // Initialize particles
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // Draw the gradient background
  image(gradient, 0, 0, width, height);

  // Create some attractive typography
  let txt = "BATH SPA UNIVERSITY";
  
  // Animate text properties
  let animatedSize = 40 + sin(frameCount * 0.05) * 10; // Pulsating effect
  textSize(animatedSize);
  let animatedColor = color(
    map(sin(frameCount * 0.02), -1, 1, 0, 255),
    map(sin(frameCount * 0.03), -1, 1, 100, 200),
    map(sin(frameCount * 0.04), -1, 1, 150, 255)
  );

  // Add dynamic shadow and glow
  fill(0, 50); // Shadow color
  noStroke();
  text(txt, width / 2 + 5, height / 2 + 5); // Shadow offset
  fill(animatedColor);
  stroke(255, 69, 0); // OrangeRed color
  strokeWeight(4);

  // Add some rotation for a dynamic look
  push();
  translate(width / 2, height / 2);
  rotate(radians(sin(frameCount * 0.01) * 15)); // slight rotation effect
  text(txt, 0, 0);
  pop();

  // Draw particles
  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = random(2, 5);
    this.offset = random(1000);
  }

  update() {
    let angle = noise(this.pos.x * 0.01, this.pos.y * 0.01, this.offset) * TWO_PI;
    this.acc = p5.Vector.fromAngle(angle);
    this.acc.mult(0.1);
    
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    noStroke();
    fill(255, 150);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
