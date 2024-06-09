let img;
let circle1;
let circle2;

function preload() {
  img = loadImage('landscape.jpg');
}

function setup() {
  createCanvas(600, 400);
  background(200); // Changing background color to gray (RGB value of 200)
  
  // Define positions and sizes for the circles
  let circle1X = width / 3;
  let circle1Y = height / 2;
  let circle1Size = 150;
  
  let circle2X = 2 * width / 3;
  let circle2Y = height / 2;
  let circle2Size = 150;
  
  // Create circle objects
  circle1 = new Circle(circle1X, circle1Y, circle1Size);
  circle2 = new Circle(circle2X, circle2Y, circle2Size);
}

function draw() {
  background(200); // Redrawing gray background to clear previous drawings

  // Display circles
  circle1.display();
  circle2.display();
}

class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    // Draw circle
    fill(255);
    ellipse(this.x, this.y, this.size);

    // Set clipping area
    push();
    ellipseMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(10);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);

    // Apply clipping
    ellipse(this.x, this.y, this.size);

    // Draw image
    imageMode(CENTER);
    image(img, this.x, this.y, this.size, this.size);

    // Reset clipping
    pop();
  }
}
