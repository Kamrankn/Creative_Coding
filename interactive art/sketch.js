let customFont;
let colors = ['#FFFFFF', '#000000', '#FFFF00', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#00FFFF', '#008000', '#FF00FF', '#808080', '#800000'];

let currentColorIndex = 0;

let waveSpeed = 0.02; // Reduced wave speed for slower movement
let waveHeight = 50;

let bgColor;
let totalTiles;
let tilesToDraw;
let drawComplete = false;
let textColor;

function preload() {
  customFont = loadFont('Aclonica-Regular.ttf');
}

function setup() {
  createCanvas(800, 400);
  bgColor = color('#ADD8E6'); // Light blue background initially
  totalTiles = (width / (width / 20)) * (height / (width / 20)); // Calculate the total number of tiles
  tilesToDraw = 0;
  textColor = color('#9900CC'); // Initial text color
  drawBackground();
  drawText();
}

function drawBackground() {
  background(bgColor); 
  
  // Draw complex pattern
  let tileSize = width / 20; // Size of each tile relative to canvas width
  let tileCount = 0;

  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      if (tileCount < tilesToDraw) {
        // Alternating colors for tiles
        let tileColor = (x + y) % 2 === 0 ? color(255) : color(200);
        fill(tileColor);
        noStroke();
        
        // Draw different shapes in each tile
        if (random(1) > 0.5) {
          // Draw a circle
          ellipse(x + tileSize / 2, y + tileSize / 2, tileSize * 0.8);
        } else {
          // Draw a square
          rect(x, y, tileSize, tileSize);
        }
      }
      
      tileCount++;
    }
  }

  if (tilesToDraw < totalTiles) {
    tilesToDraw++;
  } else {
    drawComplete = true;
  }
}

function drawText() {
  let textString = "BATH SPA UNIVERSITY";
  let maxTextWidth = width * 0.8; // Maximum text width as 80% of canvas width
  let fontSize = 40;
  
  // Adjust font size to fit text within canvas width
  while (textWidth(textString) > maxTextWidth) {
    fontSize -= 1;
    textSize(fontSize);
  }
  
  let xPos = width / 2; // Center text horizontally
  let yPos = height / 2 - fontSize / 2; // Center text vertically
  
  textSize(fontSize); // Set the text size
  textAlign(CENTER, CENTER); // Center align the text
  
  fill(textColor); // Use the selected color for text

  textFont(customFont); // Set the font
  
  // Clear background behind the text
  let textWidthPadding = textWidth(textString) / 2 + 10; // Add padding to text width
  let textHeightPadding = fontSize / 2 + 10; // Add padding to text height
  rectMode(CENTER);
  noStroke();
  fill(bgColor); // Use background color
  rect(xPos, yPos, textWidthPadding * 2, textHeightPadding * 2);
  
  // Draw text in the middle of canvas
  fill(textColor); // Use the selected color for text
  text(textString, xPos, yPos); // Draw text
}

function draw() {
  if (!drawComplete) {
    drawBackground();
  }
  
  drawText();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  totalTiles = (width / (width / 20)) * (height / (width / 20)); // Recalculate the total number of tiles
  tilesToDraw = 0;
  drawComplete = false;
  drawBackground();
}

function mousePressed() {
  if (drawComplete) {
    tilesToDraw = 0; // Reset tiles to draw to start forming new pattern
    drawComplete = false; // Allow background to redraw

    // Change background color to a new random color
    bgColor = color(random(255), random(255), random(255));
    
    // Change text color to a new random color from the array
    let newColorIndex;
    do {
      newColorIndex = floor(random(colors.length));
    } while (newColorIndex === currentColorIndex); // Ensure new color is different from the current one

    currentColorIndex = newColorIndex;
    textColor = color(colors[currentColorIndex]);
  }
}

