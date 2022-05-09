let stars = [];
let clouds = [];
let time;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let circleDiameter;

function setup() {
  createCanvas(600, 600);
  let radius = 60;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  circleDiameter = radius * 1.7;
}

function draw() {
  //background
  bcolor = map(mouseY, 0, 600, 255, 0);
  background(15, bcolor / 3, bcolor);

  //sun
  push();
  noStroke();
  fill(bcolor, bcolor * 0.8, 0);
  let dia = map(mouseY, 0, height, 120, 10);
  circle(450, mouseY, dia);
  pop();

  noStroke();

  //city baseline
  push();
  fill(bcolor * 1.25);
  rect(0, 450, 600, 600);
  pop();

  //city building
  //clocktower
  push();
  fill(bcolor * 1.25);
  rect(150, 150, 160, 160);
  rect(160, 310, 140, 290);
  rect(160, 120, 140, 30);
  rect(155, 452, 150, 150);
  triangle(160, 120, 230, 50, 300, 120);
  pop();

  //clock
  push();
  fill(bcolor * 0.75);
  ellipse(230, 230, circleDiameter + 10, circleDiameter + 10);
  pop();

  push();
  fill(0);
  ellipse(230, 230, circleDiameter, circleDiameter);
  pop();

  //From P5JS reference
  let seconds = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let minutes =
    map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let hours =
    map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  stroke(255);
  strokeWeight(1);
  line(
    230,
    230,
    230 + cos(seconds) * secondsRadius,
    230 + sin(seconds) * secondsRadius
  );
  strokeWeight(2);
  line(
    230,
    230,
    230 + cos(minutes) * minutesRadius,
    230 + sin(minutes) * minutesRadius
  );
  strokeWeight(4);
  line(
    230,
    230,
    230 + cos(hours) * hoursRadius,
    230 + sin(hours) * hoursRadius
  );

  //Morning_cloudy_sky
  if (mouseY < 300 && random() < 0.02) {
    let c = new Cloud(
      random(0, 100),
      random(0, 150),
      random(80, 120),
      random(40, 60)
    );
    clouds.push(c);
  }

  //Night_starry_sky
  if (mouseY > 300) {
    if (random() < 0.1) {
      let s = new Star(random(width), random(125), 4, 1, 50);
      stars.push(s);
    }
    noStroke();
    clouds = []; //empty
  }

  for (let z = 0; z < clouds.length; z++) {
    if (z < 2) {
      let c = clouds[z];
      c.display();
      c.move();
    }
  }

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.disappear();
    s.display();
  }
}

//From Project A
class Star {
  constructor(x, y, points, innerradius, outerradius) {
    this.x = x;
    this.y = y;
    this.points = points;
    this.innerradius = innerradius;
    this.outerradius = outerradius;
    this.scl = random(0.1, 1.0);
  }

  //From Prroject A
  disappear() {
    this.scl = this.scl * 0.95;
  }

  // From Project A
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

class Cloud {
  constructor(x, y, radius1, radius2) {
    this.x = x;
    this.y = y;
    this.xSpd = random(0.5, 1.5);
    this.radius1 = radius1;
    this.radius2 = radius2;
  }

  display() {
    noStroke();
    ellipse(this.x, this.y, this.radius1, this.radius2);
    ellipse(this.x - 20, this.y + 10, this.radius1, this.radius2);
  }

  move() {
    this.x += this.xSpd;
  }
}
