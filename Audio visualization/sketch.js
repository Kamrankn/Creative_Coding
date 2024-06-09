let mySong;
let myFFT;
let myAmplitude;
let myColors;
let lines = [];

function preload() {
  // Preload the sound file
  mySong = loadSound('fun-punk-opener.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  // Create new FFT and Amplitude objects
  myFFT = new p5.FFT();
  myAmplitude = new p5.Amplitude();

  // Start the song loop
  mySong.loop();

  // Define colors for the radial bars
  myColors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];

  // Initialize lines
  for (let i = 0; i < 50; i++) {
    lines.push(new TravelingLine());
  }
}

function draw() {
  background(0);

  // Get the frequency spectrum data
  let spectrum = myFFT.analyze();
  let waveformData = myFFT.waveform();

  // Get the current amplitude level
  let level = myAmplitude.getLevel();
  let circleSize = map(level, 0, 1, 100, 400);

  // Draw the pulsating circle
  noStroke();
  fill(255, 150);
  ellipse(width / 2, height / 2, circleSize);

  // Draw radial bars
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);
    let ampValue = spectrum[i];
    let r = map(ampValue, 0, 255, 100, 300);
    let x = width / 2 + r * cos(angle);
    let y = height / 2 + r * sin(angle);

    stroke(myColors[i % myColors.length]);
    line(width / 2, height / 2, x, y);
  }

  // Update and display lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].update();
    lines[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class TravelingLine {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
    this.length = random(50, 150);
    this.strokeColor = color(random(100, 255), random(100, 255), random(100, 255), 100);
  }

  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // Wrap around the canvas
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
      this.angle = random(TWO_PI);
    }
  }

  display() {
    let x2 = this.x + cos(this.angle) * this.length;
    let y2 = this.y + sin(this.angle) * this.length;
    strokeWeight(2);
    stroke(this.strokeColor);
    line(this.x, this.y, x2, y2);
  }
}
