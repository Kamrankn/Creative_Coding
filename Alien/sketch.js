function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  drawBackground();
  drawAlien(width / 2, height / 2, min(width, height) / 4);
  noLoop(); // Ensure the draw function is only called once
}

function draw() {
  // Static drawing, no need to redraw continuously
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  drawBackground();
  drawAlien(width / 2, height / 2, min(width, height) / 4);
}

function drawBackground() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(10, 10, 30), color(0, 0, 70), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Stars
  for (let i = 0; i < 150; i++) {
    fill(255, 255, 255, random(150, 255));
    noStroke();
    let x = random(width);
    let y = random(height);
    ellipse(x, y, random(1, 3), random(1, 3));
  }

  // Planets
  drawPlanet(0.75 * width, 0.2 * height, min(width, height) / 12, color(200, 50, 50), color(255, 100, 100));
  drawPlanet(0.25 * width, 0.5 * height, min(width, height) / 8, color(50, 200, 200), color(100, 255, 255));

  // Shooting stars
  for (let i = 0; i < 10; i++) {
    drawShootingStar(random(width), random(height / 2), random(40, 60));
  }
}

function drawAlien(x, y, size) {
  // Alien body
  push();
  translate(x, y);
  scale(size / 100);

  // Body
  fill(0, 255, 0);
  beginShape();
  vertex(-50, 0);
  bezierVertex(-100, -150, 100, -150, 50, 0);
  bezierVertex(70, 50, -70, 50, -50, 0);
  endShape(CLOSE);

  // Head
  fill(0, 200, 0);
  ellipse(0, -75, 80, 100);

  // Eyes
  fill(255);
  ellipse(-20, -80, 20, 30);
  ellipse(20, -80, 20, 30);
  fill(0);
  ellipse(-20, -80, 10, 15);
  ellipse(20, -80, 10, 15);

  // Antennae
  stroke(0, 255, 0);
  strokeWeight(4);
  line(-20, -130, -40, -160);
  line(20, -130, 40, -160);
  fill(0, 255, 0);
  ellipse(-40, -160, 10, 10);
  ellipse(40, -160, 10, 10);

  pop();

  // Alien arms
  push();
  translate(x, y);
  stroke(0, 255, 0);
  strokeWeight(6);
  rotate(PI / 3); // Adjusted rotation angle
  line(50, -50, 150, 0); // Adjusted starting point
  ellipse(150, 0, 20, 20);
  pop();

  push();
  translate(x, y);
  stroke(0, 255, 0);
  strokeWeight(6);
  rotate(-PI / 3); // Adjusted rotation angle
  line(-50, -50, -150, 0); // Adjusted starting point
  ellipse(-150, 0, 20, 20);
  pop();

  // Alien legs
  push();
  translate(x, y + 50);
  stroke(0, 255, 0);
  strokeWeight(6);
  rotate(PI / 8);
  line(30, 0, 70, 100);
  ellipse(70, 100, 20, 20);
  pop();

  push();
  translate(x, y + 50);
  stroke(0, 255, 0);
  strokeWeight(6);
  rotate(-PI / 8);
  line(-30, 0, -70, 100);
  ellipse(-70, 100, 20, 20);
  pop();
}

function drawPlanet(x, y, size, innerColor, outerColor) {
  push();
  translate(x, y);
  noStroke();
  for (let r = size; r > 0; --r) {
    let inter = map(r, 0, size, 0, 1);
    fill(lerpColor(innerColor, outerColor, inter));
    ellipse(0, 0, r * 2, r * 2);
  }
  pop();
}

function drawShootingStar(x, y, len) {
  push();
  translate(x, y);
  rotate(random(-PI / 4, PI / 4));
  let tailColor = color(255, 255, 255, 100);
  for (let i = 0; i < len; i++) {
    stroke(lerpColor(tailColor, color(255, 255, 255, 0), i / len));
    line(i, 0, i + 1, 0);
  }
  pop();
}
