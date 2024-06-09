let img;
let threshold = 128;

function preload() {
  // Load your own image
  img = loadImage('Nature.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  // Load the image
  image(img, 0, 0);
  // Call the function to apply the effect
  drawShapes();
}

function drawShapes() {
  // Load pixel data from the image
  img.loadPixels();
  // Loop through each pixel of the image
  for (let y = 0; y < img.height; y += 10) {
    for (let x = 0; x < img.width; x += 10) {
      // Get the color of the pixel
      let c = img.get(x, y);
      // Calculate the brightness of the pixel
      let brightness = (red(c) + green(c) + blue(c)) / 3;
      // If the brightness is above the threshold, draw a rectangle
      if (brightness > threshold) {
        fill(c);
        // Change the shape here, for example, to a rectangle
        rect(x, y, 10, 10);
      }
    }
  }
}
