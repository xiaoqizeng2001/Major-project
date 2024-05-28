class ResourceLoader {
  constructor() {
    this.boatImage = null;
    this.group1Image = null;
    this.birdsImage = null;
  }

  preload() {
    this.boatImage = loadImage('assets/transparent_boat.png');
    this.group1Image = loadImage('assets/Group 1.png');
    this.birdsImage = loadImage('assets/birds.png');
  }
}

class CanvasManager {
  setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
  }

  windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
  }
}

class BackgroundDrawer {
  draw() {
    p5.instance.background(230, 240, 240);
    this.drawLayeredMountains();
  }

  drawLayeredMountains() {
    let layers = 5;
    let maxHeight = height / 6;
    let noiseScale = 0.01;
    let colors = [
      color(50, 100, 100, 150),
      color(70, 120, 120, 130),
      color(90, 140, 140, 110),
      color(110, 160, 160, 90),
      color(130, 180, 180, 70)
    ];
    for (let i = 0; i < layers; i++) {
      let baseHeight = height - (i * maxHeight * 0.5 + 120);
      fill(colors[i]);
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
}

class WaterSurface {
  draw() {
    fill(180, 200, 200, 180);
    rect(0, height - 100, width, 100);
  }
}

class Boat {
  constructor(boatImage) {
    this.boatImage = boatImage;
    this.boatScale = 0.7;
  }

  draw() {
    let boatX = 100;
    let boatY = height - this.boatImage.height * this.boatScale + 50;
    tint(150, 150, 150, 150);
    image(this.boatImage, boatX, boatY, this.boatImage.width * this.boatScale, this.boatImage.height * this.boatScale);
    noTint();
  }
}

class Overlay {
  constructor(group1Image, birdsImage) {
    this.group1Image = group1Image;
    this.birdsImage = birdsImage;
  }

  draw() {
    image(this.group1Image, 460, 300, 170, 150);
    image(this.birdsImage, 1000, 0, 300, 150);
  }
}

class FilmEffect {
  draw() {
    for (let i = 0; i < 50; i++) {
      fill(255, 255, 255, random(250, 400));
      noStroke();
      ellipse(random(width), random(height), 4, 3);
    }

    if (random(100) < 1) {
      fill(255, 255, 255, random(100, 300));
      rect(0, 0, width, height);
    }
  }
}

let resourceLoader = new ResourceLoader();
let canvasManager = new CanvasManager();
let backgroundDrawer = new BackgroundDrawer();
let waterSurface = new WaterSurface();
let boat;
let overlay;
let filmEffect = new FilmEffect();

function preload() {
  resourceLoader.preload();
}

function setup() {
  canvasManager.setup();
  boat = new Boat(resourceLoader.boatImage);
  overlay = new Overlay(resourceLoader.group1Image, resourceLoader.birdsImage);
}

function draw() {
  backgroundDrawer.draw();
  waterSurface.draw();
  boat.draw();
  overlay.draw();
  filmEffect.draw();
}

function windowResized() {
  canvasManager.windowResized();
}
