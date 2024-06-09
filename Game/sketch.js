let wizard;
let dragons = [];
let fireballs = [];
let powerUps = [];
let gameOver = false;
let gameWon = false;
let startScreen = true;
let magicMeter = 100;
let health = 3;
let timer = 60;
let explosionParticles = [];
let score = 0;
let level = 1;

function setup() {
  createCanvas(800, 600);
  wizard = new Wizard();
}

function draw() {
  background(0);

  if (startScreen) {
    drawStartScreen();
  } else if (gameOver) {
    drawGameOverScreen();
  } else if (gameWon) {
    drawGameWonScreen();
  } else {
    playGame();
  }
}

function drawStartScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Wizard vs. Dragons", width / 2, height / 2 - 40);
  textSize(24);
  text("Press ENTER to Start", width / 2, height / 2 + 20);
}

function drawGameOverScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 40);
}

function drawGameWonScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2 - 40);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 40);
}

function playGame() {
  // Update and display the wizard
  wizard.update();
  wizard.display();

  // Handle fireballs if the array is not empty
  if (fireballs.length > 0) {
    for (let i = fireballs.length - 1; i >= 0; i--) {
      if (fireballs[i] && fireballs[i].isOffScreen()) {
        // Remove fireball if off-screen
        fireballs.splice(i, 1);
      } else if (fireballs[i]) {
        // Update and display fireball if it exists
        fireballs[i].update();
        fireballs[i].display();

        // Check for collisions with dragons
        for (let j = dragons.length - 1; j >= 0; j--) {
          if (dragons[j] && fireballs[i].hits(dragons[j])) {
            console.log("Collision detected! Creating explosion...");
            createExplosion(dragons[j].x, dragons[j].y);
            score += 10;
            dragons.splice(j, 1);
            fireballs.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  // Spawn and handle dragons
  if (frameCount % 60 == 0) {
    dragons.push(new Dragon());
  }
  for (let i = dragons.length - 1; i >= 0; i--) {
    dragons[i].update();
    dragons[i].display();
    if (dragons[i].hits(wizard)) {
      health--;
      createExplosion(dragons[i].x, dragons[i].y);
      dragons.splice(i, 1);
      if (health <= 0) {
        gameOver = true;
      }
    }
    if (dragons[i].isOffScreen()) {
      dragons.splice(i, 1);
    }
  }

  // Handle power-ups
  if (random(1) < 0.01) {
    powerUps.push(new PowerUp());
  }
  for (let i = powerUps.length - 1; i >= 0; i--) {
    powerUps[i].update();
    powerUps[i].display();
    if (powerUps[i].hits(wizard)) {
      applyPowerUp(powerUps[i].type);
      powerUps.splice(i, 1);
    }
    if (dragons[i] && dragons[i].isOffScreen()) {
  dragons.splice(i, 1);
}
  }

  // Display the magic meter
  drawMagicMeter();

  // Display the health
  fill(255);
  textSize(18);
  text("Health: " + health, width - 100, 40); // Adjusted position

  // Display the score
  text("Score: " + score, width - 100, 60); 

  // Display the timer
  fill(255);
  textSize(18);
  text("Time: " + nf(timer, 2), width - 100, 20);

  // Update timer
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer === 0) {
    gameWon = true;
  }

  // Handle explosion particles
  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    explosionParticles[i].update();
    explosionParticles[i].display();
    if (explosionParticles[i].isFinished()) {
      explosionParticles.splice(i, 1);
    }
  }

  // Level progression
  if (score >= level * 100) {
    level++;
    timer += 30;
    health++;
  }
}

function draw() {
  background(0);

  if (startScreen) {
    drawStartScreen();
  } else if (gameOver) {
    drawGameOverScreen();
  } else if (gameWon) {
    drawGameWonScreen();
  } else {
    playGame();
  }
}

function drawStartScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Wizard vs. Dragons", width / 2, height / 2 - 40);
  textSize(24);
  text("Press ENTER to Start", width / 2, height / 2);
}

function drawGameOverScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 40);
}

function drawGameWonScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2 - 40);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 40);
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (startScreen) {
      startScreen = false;
    } else if (gameOver || gameWon) {
      resetGame();
    }
  } else if (key === ' ' && magicMeter > 0 && !gameOver && !gameWon) {
    fireballs.push(new Fireball(wizard.x, wizard.y));
    magicMeter -= 5;
  }
}

function resetGame() {
  gameOver = false;
  gameWon = false;
  startScreen = false;
  dragons = [];
  fireballs = [];
  powerUps = [];
  explosionParticles = [];
  magicMeter = 100;
  health = 3;
  timer = 60;
  score = 0;
  level = 1;
}

class Wizard {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 50;
    this.height = 50;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }

  display() {
    fill(255, 0, 0);
    beginShape();
    vertex(this.x, this.y - this.height / 2);
    vertex(this.x - this.width / 2, this.y + this.height / 2);
    vertex(this.x + this.width / 2, this.y + this.height / 2);
    endShape(CLOSE);
  }
}

class Dragon {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.width = 40;
    this.height = 40;
    this.speed = 3;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(0, 255, 0);
    beginShape();
    vertex(this.x, this.y - this.height / 2);
    vertex(this.x - this.width / 2, this.y + this.height / 2);
    vertex(this.x + this.width / 2, this.y + this.height / 2);
    endShape(CLOSE);
  }

  hits(wizard) {
    return !(this.x > wizard.x + wizard.width || 
             this.x + this.width < wizard.x || 
             this.y > wizard.y + wizard.height || 
             this.y + this.height < wizard.y);
  }

  isOffScreen() {
    return (this.y > height);
  }
}

class Fireball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speed = 5;
  }

  update() {
    this.y -= this.speed;
  }

  display() {
    fill(255, 255, 0);
    beginShape();
    vertex(this.x, this.y - this.height / 2);
    vertex(this.x - this.width / 2, this.y + this.height / 2);
    vertex(this.x + this.width / 2, this.y + this.height / 2);
    endShape(CLOSE);
  }

  isOffScreen() {
    return (this.y < 0);
  }

  hits(dragon) {
    return !(this.x > dragon.x + dragon.width || 
             this.x + this.width < dragon.x || 
             this.y > dragon.y + dragon.height || 
             this.y + this.height < dragon.y);
  }
}

class PowerUp {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.width = 20;
    this.height = 20;
    this.speed = 3;
    this.type = random(["magic", "health"]);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    if (this.type === "magic") {
      fill(0, 0, 255);
    } else if (this.type === "health") {
      fill(255, 0, 0);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  hits(wizard) {
    return !(this.x > wizard.x + wizard.width || 
             this.x + this.width < wizard.x || 
             this.y > wizard.y + wizard.height || 
             this.y + this.height < wizard.y);
  }

  isOffScreen() {
    return (this.y > height);
  }
}

function applyPowerUp(type) {
  if (type === "magic") {
    magicMeter = min(magicMeter + 20, 100);
  } else if (type === "health") {
    health = min(health + 1, 3);
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 50; i++) {
    explosionParticles.push(new ExplosionParticle(x, y));
  }
}

class ExplosionParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
    this.size = random(5, 15);
    this.color = color(random(200, 255), random(50, 150), 0, this.alpha);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
    this.color.setAlpha(this.alpha);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isFinished() {
    return (this.alpha <= 0);
  }
}

function drawMagicMeter() {
  let meterWidth = 200;
  let meterHeight = 20;
  let x = 20; // Adjusted position
  let y = 40;
  
  noFill();
  stroke(255);
  rect(x, y, meterWidth, meterHeight);
  
  noStroke();
  fill(0, 0, 255);
  let currentWidth = map(magicMeter, 0, 100, 0, meterWidth);
  rect(x, y, currentWidth, meterHeight);
}
 



