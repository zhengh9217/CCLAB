let stars = [];
let planets = [];

function setup() {
  let cvs = createCanvas(600,600);
  cvs.parent("my-container");
  
  //Sun
  sun = planets.push(new Planet(width / 2, height / 2, 200, 252, 229, 112));

  //Mercury
  mercury = planets.push(
    new Planet(width / 2 + 100, height / 2 + 100, 25, 173, 168, 165)
  );

  //Venus
  venus = planets.push(
    new Planet(width / 2 + 125, height / 2 + 125, 30, 165, 124, 27)
  );

  //Earth
  earth = planets.push(
    new Planet(width / 2 + 150, height / 2 + 150, 35, 128, 96, 67)
  );

  //Mars
  mars = planets.push(
    new Planet(width / 2 + 175, height / 2 + 175, 30, 156, 46, 53)
  );

  //Jupiter
  jupiter = planets.push(
    new Planet(width / 2 + 250, height / 2 + 250, 100, 188, 175, 178)
  );

  //Saturn
  saturn = planets.push(
    new Planet(width / 2 + 300, height / 2 + 300, 100, 253, 229, 34)
  );

  //Uranus
  uranus = planets.push(
    new Planet(width / 2 + 350, height / 2 + 350, 50, 79, 208, 231)
  );

  //Neptune
  neptune = planets.push(
    new Planet(width / 2 + 375, height / 2 + 375, 50, 75, 112, 221)
  );
}

function draw() {
  background(0);

  //Stars//
  // Generate stars
  // Classroom Materials
  if (random() < 0.1) {
    let s = new Star(random(width), random(height), 4, 1, 50);
    stars.push(s);
  }

  // stars function
  // Classroom Materials
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.disappear();
    s.display();
  }

  // limit the number of stars
  // Classroom Materials
  if (stars.length > 10) {
    stars.splice(0, 1); //(index, how many);
  }

  //Planets//
  //planets function
  // Classroom Materials
  for (let i = 0; i < planets.length; i++) {
    let p = planets[i];
    p.rotation();
    p.display();
    if (keyIsPressed && key == "a") {
      p.aline();
    }
  }
}

class Star {
  constructor(x, y, points, innerradius, outerradius) {
    this.x = x;
    this.y = y;
    this.points = points;
    this.innerradius = innerradius;
    this.outerradius = outerradius;
    this.scl = random(0.1, 1.0);
  }

  //From Professor Moon
  disappear() {
    this.scl = this.scl * 0.98;
  }

  // From P5 References website
  // https://p5js.org/examples/form-star.html
  display() {
    push();
    translate(this.x, this.y);
    rotate(frameCount * 0.01);
    scale(this.scl);
    noStroke();
    fill(255);
    beginShape();
    let angle = TAU / this.points;
    let halfangle = angle / 2;
    for (let i = 0; i < TAU; i += angle) {
      let sx = cos(i) * this.innerradius;
      let sy = sin(i) * this.innerradius;
      vertex(sx, sy);
      sx = cos(i + halfangle) * this.outerradius;
      sy = sin(i + halfangle) * this.outerradius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
}

class Planet {
  constructor(x, y, size, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.xspd = random(-5, 5);
    this.yspd = random(-5, 5);

    this.r = r;
    this.g = g;
    this.b = b;
  }
  rotation() {
    let distance = dist(this.x, this.y, width / 2, height / 2);
    if (distance > 0) {
      this.xspd += (width / 2 - this.x) / distance;
      this.yspd += (height / 2 - this.y) / distance;
    } else {
      this.xspd = 0;
      this.yspd = 0;
    }
    this.x += this.xspd;
    this.y += this.yspd;
  }
  display() {
    push();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.size);
    pop();
  }
  aline() {
    this.xspd = 0;
    this.yspd = 0;
  }
}
