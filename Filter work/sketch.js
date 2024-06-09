let img;
let grayscaleValue = 0;

function preload() {
  img = loadImage("mountains.jpg");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  // Map the mouse position to a grayscale value
  grayscaleValue = map(mouseX, 0, width, 0, 255);
  
  // Apply grayscale filter to the image
  img.filter(GRAY);
  
  // Tint the image with the grayscale value
  tint(255, grayscaleValue);
  
  // Display the image
  image(img, 0, 0, width, height);
}
