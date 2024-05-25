let boatImage; 
let boatX, boatY; 
let boatScale = 0.5; 

function preload() {
  boatImage = loadImage('assets/transparent_boat.png');  // 确保路径正确
}

function setup() {
  createCanvas(800, 500);
  boatX = 80;
  boatY = height - boatImage.height * 0.1;
  frameRate(3); 
}

function draw() {
  background(255);
  drawLayeredMountains();
  drawWaterSurface();
  drawBoat();
  moveBoat(); 
}

function drawLayeredMountains() {
  let layers = 7;
  let maxHeight = height / 6;
  let noiseScale = 0.01; 

  for (let i = layers - 1; i >= 0; i--) {
    let baseHeight = height - (i * maxHeight * 0.5 + 120); // 调整基底高度，留出水面空间
    let interColor = lerpColor(color(0, 0, 0, 50), color(255, 255, 255, 0), i / layers);
    fill(interColor);
    noStroke();
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 20) {
      let y = baseHeight - noise(x * noiseScale, i * 100) * maxHeight;
      vertex(x, y);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}

function drawWaterSurface() {
  fill(200);
  rect(0, height - 100, width, 100);
}

//draw the boat
function drawBoat() {
  image(boatImage, boatX, boatY, boatImage.width * boatScale, boatImage.height * boatScale);
}

//random move the boat position
function moveBoat() {
  boatX += random(1, 5);
  boatY += random(-2, 5);

//Boundary detection to prevent ships from moving off canvas
  boatX = constrain(boatX, 0, width - boatImage.width * boatScale);
  boatY = constrain(boatY, height - 100 - boatImage.height * boatScale, height - boatImage.height * boatScale);
}
