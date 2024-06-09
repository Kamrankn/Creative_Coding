function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 235); // Sky blue background

  // Sun
  fill(255, 223, 0);
  ellipse(350, 50, 80, 80);
  for (let i = 0; i < 360; i += 15) {
    let x1 = 350 + cos(radians(i)) * 40;
    let y1 = 50 + sin(radians(i)) * 40;
    let x2 = 350 + cos(radians(i)) * 60;
    let y2 = 50 + sin(radians(i)) * 60;
    stroke(255, 223, 0);
    strokeWeight(2);
    line(x1, y1, x2, y2);
  }

  // Grass
  noStroke();
  fill(34, 139, 34);
  rect(0, 300, 400, 100);

  // Modern buildings
  fill(100); // Darker color for buildings
  rect(50, 150, 60, 150);  // Building 1
  rect(130, 100, 80, 200); // Building 2
  rect(230, 180, 60, 120); // Building 3
  rect(310, 130, 70, 170); // Building 4
  
  // Building windows
  fill(135, 206, 235);
  for (let y = 160; y < 290; y += 20) {
    rect(60, y, 10, 10);
    rect(90, y, 10, 10);
  }
  for (let y = 110; y < 290; y += 20) {
    rect(140, y, 15, 15);
    rect(180, y, 15, 15);
  }
  for (let y = 190; y < 280; y += 20) {
    rect(240, y, 10, 10);
    rect(270, y, 10, 10);
  }
  for (let y = 140; y < 290; y += 20) {
    rect(320, y, 15, 15);
    rect(350, y, 15, 15);
  }

  // Road
  fill(50);
  rect(0, 275, 400, 25);

  // Road lines
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, 287.5, i + 20, 287.5);
  }

  // Car shadow
  noStroke();
  fill(50, 50, 50, 100);
  ellipse(100, 295, 70, 20);
  ellipse(300, 295, 70, 20);
  rect(55, 275, 290, 20, 20);

  // Modern sports car body
  fill(0, 122, 204); // Sleek metallic blue
  beginShape();
  vertex(50, 260);
  vertex(80, 220);
  vertex(120, 200);
  vertex(280, 200);
  vertex(320, 220);
  vertex(350, 260);
  endShape(CLOSE);

  // Car roof
  fill(0, 102, 204); // Darker blue for contrast
  beginShape();
  vertex(120, 200);
  vertex(160, 170);
  vertex(240, 170);
  vertex(280, 200);
  endShape(CLOSE);

  // Windows
  fill(200);
  beginShape();
  vertex(160, 200);
  vertex(160, 170);
  vertex(240, 170);
  vertex(240, 200);
  endShape(CLOSE);

  // Front bumper
  fill(0, 102, 204); // Darker blue for contrast
  beginShape();
  vertex(50, 260);
  vertex(60, 250);
  vertex(90, 250);
  vertex(100, 260);
  endShape(CLOSE);

  // Rear bumper
  fill(0, 102, 204); // Darker blue for contrast
  beginShape();
  vertex(300, 260);
  vertex(310, 250);
  vertex(340, 250);
  vertex(350, 260);
  endShape(CLOSE);

  // Door outlines
  stroke(0, 80, 160); // Darker blue for outlines
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(90, 260);
  vertex(110, 230);
  vertex(150, 230);
  vertex(160, 200);
  endShape();

  beginShape();
  vertex(240, 200);
  vertex(250, 230);
  vertex(290, 230);
  vertex(310, 260);
  endShape();

  noStroke();

  // Wheels
  fill(50);
  ellipse(100, 275, 60, 60);
  ellipse(300, 275, 60, 60);

  // Rims
  fill(200);
  ellipse(100, 275, 30, 30);
  ellipse(300, 275, 30, 30);

  // Tail Lights
  fill(255, 0, 0);
  rect(50, 240, 10, 10);
  rect(340, 240, 10, 10);

  // Headlights
  fill(255, 255, 0);
  ellipse(70, 240, 15, 15);
  ellipse(330, 240, 15, 15);

  // Side mirrors
  fill(0, 122, 204); // Sleek metallic blue
  triangle(100, 190, 100, 200, 110, 195);
  triangle(290, 190, 290, 200, 280, 195);

  // Front grill
  fill(0);
  rect(170, 250, 60, 10);

  // Decals
  fill(255, 255, 255, 150);
  beginShape();
  vertex(160, 200);
  vertex(240, 200);
  vertex(240, 205);
  vertex(160, 205);
  endShape(CLOSE);

  beginShape();
  vertex(120, 260);
  vertex(280, 260);
  vertex(280, 265);
  vertex(120, 265);
  endShape(CLOSE);

  // Aerodynamic details
  fill(0, 122, 204); // Sleek metallic blue
  beginShape();
  vertex(90, 200);
  vertex(100, 195);
  vertex(100, 190);
  vertex(90, 190);
  endShape(CLOSE);

  beginShape();
  vertex(310, 200);
  vertex(300, 195);
  vertex(300, 190);
  vertex(310, 190);
  endShape(CLOSE);

  // Clouds
  noStroke();
  fill(255);
  ellipse(100, 50, 80, 60);
  ellipse(130, 50, 80, 60);
  ellipse(400, 80, 80, 60);
  ellipse(300, 80, 100, 60);
  ellipse(80, 120, 120, 60);
}
