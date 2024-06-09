let rotationAngle = 0;
let rotating = false;

function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas size to full window size
  noLoop(); // Ensure the draw function is only called once
  angleMode(DEGREES); // Set the angle mode to degrees for easier rotation handling
}

function draw() {
  background(255); // Set background to white
  let radius = min(width, height) / 2.5; // Adjust pattern radius based on the smaller dimension
  drawPattern(width / 2, height / 2, radius); // Adjusted pattern radius for the new canvas size
  if (rotating) {
    rotationAngle += 1; // Increment the rotation angle
  }
}

function mousePressed() {
  if (!rotating) {
    rotating = true; // Start rotating on mouse press
    loop(); // Ensure the draw function is called continuously
  } else {
    rotating = false; // Stop rotating on second click
    noLoop(); // Ensure the draw function is only called once
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize canvas to full window size
  redraw(); // Redraw the pattern
}

function drawPattern(x, y, radius) {
  let numLayers = 8; // Reduced number of concentric layers
  let shapesPerLayer = 16; // Reduced number of shapes per layer
  let angleIncrement = 360 / shapesPerLayer;

  // Draw the first layer with random shapes
  let firstLayerRadius = radius * (1 - 0 / numLayers);
  let firstLayerShapeSize = firstLayerRadius / 4;

  for (let i = 0; i < shapesPerLayer; i++) {
    let angle = i * angleIncrement + rotationAngle;
    let px = x + cos(angle) * firstLayerRadius;
    let py = y + sin(angle) * firstLayerRadius;

    push();
    translate(px, py);
    rotate(angle); // No rotation for the first layer
    drawRandomShape(0, 0, firstLayerShapeSize); // Draw a random shape
    pop();

    // Draw connecting lines with advanced gradient strokes
    drawAdvancedGradientLine(x, y, px, py, numLayers, i, shapesPerLayer);
  }

  // Draw subsequent layers with random shapes
  for (let layer = 1; layer < numLayers; layer++) {
    let currentRadius = radius * (1 - layer / numLayers);
    let shapeSize = currentRadius / 4; // Slightly reduced shape size

    for (let i = 0; i < shapesPerLayer; i++) {
      let angle = i * angleIncrement + rotationAngle;
      let px = x + cos(angle) * currentRadius;
      let py = y + sin(angle) * currentRadius;

      push();
      translate(px, py);
      rotate(angle + layer * 15); // Rotate shapes for a dynamic effect
      drawRandomShape(0, 0, shapeSize); // Draw a random shape
      pop();

      // Draw connecting lines with advanced gradient strokes
      drawAdvancedGradientLine(x, y, px, py, numLayers, i, shapesPerLayer);
    }
  }

  // Add some modern elements
  drawModernElements(x, y, radius);
}

function drawRandomShape(x, y, size) {
  let shapeType = floor(random(2)); // Randomly choose a shape type (hexagon or octagon)
  let col = color(random(50, 200), random(50, 200), random(50, 200), 200); // Random semi-transparent color

  fill(col);
  noStroke();
  
  switch (shapeType) {
    case 0:
      drawShape(x, y, size, 6); // Draw a hexagon
      break;
    case 1:
      drawShape(x, y, size, 8); // Draw an octagon
      break;
  }
}

function drawShape(x, y, radius, sides) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = 360 / sides * i;
    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawAdvancedGradientLine(x1, y1, x2, y2, numLayers, index, shapesPerLayer) {
  let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
  
  // Adjust gradient colors dynamically based on position and layer
  let color1 = color(60, 60, 200, map(index, 0, shapesPerLayer, 100, 200));
  let color2 = color(180, 180, 255, map(numLayers - 1, 0, numLayers, 50, 150));
  
  gradient.addColorStop(0, color1.toString());
  gradient.addColorStop(1, color2.toString());
  drawingContext.strokeStyle = gradient;

  strokeWeight(1);
  line(x1, y1, x2, y2);
}

function drawModernElements(x, y, radius) {
  // Draw a circle at the center
  fill(255, 0, 0); // Red color for modern element
  ellipse(x, y, radius / 5, radius / 5);

  // Draw some lines extending from the center
  stroke(0, 255, 0); // Green color for modern element
  strokeWeight(2);
  for (let i = 0; i < 360; i += 30) {
    let px = x + cos(i) * radius / 2;
    let py = y + sin(i) * radius / 2;
    line(x, y, px, py);
  }
}
