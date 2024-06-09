let img;
let shapeSize = 30; // Size of the shapes
let transparency = 100; // Transparency of the shapes

function preload() {
  // Load your own image
  img = loadImage("Nature.jpg");
}

function setup() {
  createCanvas(400, 400);
  background(255); // White background
  img.resize(width, height); // Resize the image to fit the canvas
  noStroke();
  // Adjust the frame rate as needed
  frameRate(100);
}

function draw() {
  // Draw random shapes with colors sampled from the image
  let x = int(random(width));
  let y = int(random(height));
  let c = img.get(x, y);
  fill(red(c), green(c), blue(c), transparency);
  
  // Choose a random shape (square, circle, or triangle)
  let choice = int(random(3));
  if (choice === 0) {
    // Square
    rect(x, y, shapeSize, shapeSize);
  } else if (choice === 1) {
    // Circle
    ellipse(x, y, shapeSize, shapeSize);
  } else {
    // Triangle
    triangle(x, y, x + shapeSize, y, x + shapeSize / 2, y + shapeSize);
  }
}
