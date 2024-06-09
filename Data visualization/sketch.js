let countries = ["China", "India", "United States", "Indonesia", "Pakistan"];
let populations = [1444216107, 1393409038, 332915073, 276361783, 225199937]; // Population data for the top 5 countries (as of 2022)
let barWidth;
let maxPopulation;
let hoveredIndex = -1;
let barColors = []; // Array to store colors for each bar
let barPositions = []; // Array to store the positions of bars
let textPositions = []; // Array to store the positions of text
let barHeights = []; // Array to store the current height of each bar
let growthSpeed = 5; // Increased speed of the growth animation

function setup() {
  createCanvas(800, 400);

  maxPopulation = max(populations);
  barWidth = width / populations.length;

  // Generate color palette
  for (let i = 0; i < populations.length; i++) {
    let hue = map(i, 0, populations.length, 0, 360);
    barColors.push(color(hue, 80, 80));
  }

  // Calculate positions of bars and text
  for (let i = 0; i < populations.length; i++) {
    let x = i * barWidth;
    let h = map(populations[i], 0, maxPopulation, 0, height - 50);
    let y = height;
    barPositions.push(createVector(x, y - h));
    textPositions.push(createVector(x + barWidth / 2, y - h - 10));
    barHeights.push(0); // Initialize bar heights to 0
  }
}

function draw() {
  background(240);

  // Draw heading
  fill(255, 0, 0); // Bright red color
  textAlign(CENTER);
  textSize(24);
  text("Top 5 Countries by Population (2022)", width / 2, 30);

  // Update bar heights (animation)
  for (let i = 0; i < populations.length; i++) {
    let h = map(populations[i], 0, maxPopulation, 0, height - 50);
    let targetHeight = map(populations[i], 0, maxPopulation, 0, height - 50);
    barHeights[i] = min(barHeights[i] + growthSpeed, targetHeight); // Incrementally increase bar height
  }

  // Draw bars and text
  for (let i = 0; i < populations.length; i++) {
    let y = height - barHeights[i];
    
    // Draw bar
    noStroke();
    fill(barColors[i]);
    rect(barPositions[i].x, y, barWidth - 10, barHeights[i]);
    
    // Draw country name
    fill(50);
    textAlign(CENTER);
    textSize(14);
    text(countries[i], textPositions[i].x, textPositions[i].y);
    
    // Draw population number
    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(populations[i].toLocaleString(), textPositions[i].x, textPositions[i].y + 20);

    // Draw label for number of people
    fill(0);
    textAlign(CENTER);
    textSize(10);
    text("Number of People", textPositions[i].x, height - 10);
    
    // Check for hover effect
    if (mouseX >= barPositions[i].x && mouseX <= barPositions[i].x + barWidth &&
      mouseY >= y && mouseY <= height) {
      hoveredIndex = i;
      fill(255, 0, 0, 150);
      noStroke();
      rect(barPositions[i].x, height, barWidth - 10, -barHeights[i]);
    }
  }
}
