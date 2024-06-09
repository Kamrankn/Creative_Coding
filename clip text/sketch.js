let maskGraphics;
let maskX, maskY;
let angle = 0;
let textColor;

function setup() {
  createCanvas(600, 400);
  maskGraphics = createGraphics(width, height);
  maskX = width / 2;
  maskY = height / 2;
  textSize(48);
}

function draw() {
  // Create gradient background
  let from = color(255, 204, 0); // Yellow
  let to = color(0, 102, 153); // Blue
  background(lerpColor(from, to, mouseY / height));
  
  // Update mask position based on mouse
  maskX = mouseX;
  maskY = mouseY;
  
  // Update text color
  textColor = color(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 255);
  
  // Draw the mask shape (in this case, a circle)
  maskGraphics.clear();
  maskGraphics.fill(255);
  maskGraphics.ellipse(maskX, maskY, 150, 150);
  
  // Use the maskGraphics as an alpha mask
  image(maskGraphics, 0, 0);
  
  // Draw the text in the center
  fill(textColor);
  textAlign(CENTER, CENTER);
  text("Be Happy!", width/2, height/2);
}
