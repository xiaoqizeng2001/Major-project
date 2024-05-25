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
  background(230, 240, 240); // 背景颜色调整为灰青色调
  drawLayeredMountains();
  drawWaterSurface();
  drawBoat();
  moveBoat(); 
}

function drawLayeredMountains() {
  let layers = 5;
  let maxHeight = height / 6;
  let noiseScale = 0.01; 

  for (let i = layers - 1; i >= 0; i--) {
    let baseHeight = height - (i * maxHeight * 0.5 + 120); // 调整基底高度，留出水面空间
    let interColor = lerpColor(color(70, 130, 130, 150), color(200, 220, 220, 50), i / layers); // 使用灰青色系
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
  fill(180, 200, 200, 180); // 使用灰青色调
  rect(0, height - 100, width, 100);
}

function drawBoat() {
  tint(150, 150, 150, 150); // 设置船只为灰色调并调整透明度
  image(boatImage, boatX, boatY, boatImage.width * boatScale, boatImage.height * boatScale);
  noTint(); // 重置tint设置
}

function moveBoat() {
  boatX += random(1, 5);
  boatY += random(-2, 5);

  // 边界检测，防止船只移出画布
  boatX = constrain(boatX, 0, width - boatImage.width * boatScale);
  boatY = constrain(boatY, height - 100 - boatImage.height * boatScale, height - boatImage.height * boatScale);
}
