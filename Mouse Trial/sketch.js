let trails = [];
const maxTrails = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // Save Button
  let saveButton = createButton('Save Canvas');
  saveButton.position(10, 10);
  saveButton.mousePressed(saveCanvasImage);

  // Clear Button
  let clearButton = createButton('Clear Canvas');
  clearButton.position(100, 10);
  clearButton.mousePressed(clearCanvas);
}

function draw() {
  background(0, 20);

  // Draw trails
  for (let i = trails.length - 1; i >= 0; i--) {
    let trail = trails[i];
    fill(trail.color);
    noStroke();
    ellipse(trail.x, trail.y, trail.size);

    // Update trail properties
    trail.x += trail.vx;
    trail.y += trail.vy;
    trail.size *= 0.99; // Shrink the trail more slowly
    trail.color.setAlpha(trail.alpha);
    trail.alpha -= 1; // Fade out more slowly

    // Remove trail if it becomes too small or transparent
    if (trail.size < 0.5 || trail.alpha <= 0) {
      trails.splice(i, 1);
    }
  }

  // Create new trails on mouse movement
  if (mouseIsPressed) {
    let numTrails = int(random(5, 15));
    for (let i = 0; i < numTrails; i++) {
      let trailColor = color(random(255), random(255), random(255), 200);
      let trailSize = random(20, 50);
      let trailVX = random(-2, 2);
      let trailVY = random(-2, 2);
      trails.push({ x: mouseX, y: mouseY, size: trailSize, color: trailColor, vx: trailVX, vy: trailVY, alpha: 200 });
    }
  }

  // Limit the number of trails
  if (trails.length > maxTrails) {
    trails.splice(0, trails.length - maxTrails);
  }
}

function saveCanvasImage() {
  saveCanvas('dynamicMouseTrails', 'png');
}

function clearCanvas() {
  trails = [];
  background(0);
}
