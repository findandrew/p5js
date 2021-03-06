class Ball {
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(3);
    this.r = r;
    this.m = r * 0.1;
  }
  update() {
    this.position.add(this.velocity);
  }

  checkBoundaryCollision() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  checkCollision(other) {
    // Get distances between the balls components
    let distanceVect = p5.Vector.sub(other.position, this.position);

    // Calculate magnitude of the vector separating the balls
    let distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    let minDistance = this.r + other.r;

    // if collision has occurred
    if (distanceVectMag < minDistance) {

      let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

      // get angle of distanceVect
      let theta = distanceVect.heading();
      // precalculate trig values
      let sine = sin(theta);
      let cosine = cos(theta);

      /* bTemp will hold rotated ball this.positions. You 
       just need to worry about bTemp[1] this.position*/
      let bTemp = [new p5.Vector(), new p5.Vector()];

      /* this ball's this.position is relative to the other
       so you can use the vector between them (bVect) as the 
       reference point in the rotation expressions.
       bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
       automatically to 0.0, which is what you want
       since b[1] will rotate around b[0] */
      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      // rotate Temporary velocities
      let vTemp = [new p5.Vector(), new p5.Vector()];

      vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
      vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
      vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

      /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate 
       the final this.velocity along the x-axis. */
      let vFinal = [new p5.Vector(), new p5.Vector()];

      // final rotated this.velocity for b[0]
      vFinal[0].x =
        ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
        (this.m + other.m);
      vFinal[0].y = vTemp[0].y;

      // final rotated this.velocity for b[0]
      vFinal[1].x =
        ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
        (this.m + other.m);
      vFinal[1].y = vTemp[1].y;

      // hack to avoid clumping
      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      /* Rotate ball this.positions and velocities back
       Reverse signs in trig expressions to rotate 
       in the opposite direction */
      // rotate balls
      let bFinal = [new p5.Vector(), new p5.Vector()];

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // update balls to screen this.position
      other.position.x = this.position.x + bFinal[1].x;
      other.position.y = this.position.y + bFinal[1].y;

      this.position.add(bFinal[0]);

      // update velocities
      this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;

      // play sound here
      let note = random(['A4', 'C4', 'E4', 'A5', 'C5', 'E5', 'A6', 'C6', 'E6'])
      polySynth.play(note, 0.6, 0, 1/2)
    }
  }

  display(color) {
    // let color = random(['#ef476f', '#06d6a0', '#118ab2', '#073b4c'])
    noStroke();
    fill(color);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
}

let balls = [new Ball(100, 400, 30),
             new Ball(500, 600, 40),
             new Ball(300, 500, 70),
             new Ball(200, 100, 40),
             new Ball(500, 300, 50),
             new Ball(400, 200, 60)];

console.log(balls);

function setup() {
  // approximate portrait phone: 510x890
  createCanvas(520, 900);
  polySynth = new p5.PolySynth();
  // polySynth.setADSR(0.2, 0.1, 1, 4);
}

function draw() {
  background('#ffd166');
  for (let i = 0; i < balls.length; i++) {
    let colors = ['#ef476f', '#06d6a0', '#118ab2', '#073b4c', '#ef476f', '#06d6a0']
    let b = balls[i];
    b.update();
    b.display(colors[i]);
    b.checkBoundaryCollision();
    balls[0].checkCollision(balls[1]);
    balls[0].checkCollision(balls[2]);
    balls[0].checkCollision(balls[3]);
    balls[0].checkCollision(balls[4]);
    balls[0].checkCollision(balls[5]);

    balls[1].checkCollision(balls[2]);
    balls[1].checkCollision(balls[3]);
    balls[1].checkCollision(balls[4]);
    balls[1].checkCollision(balls[5]);

    balls[2].checkCollision(balls[3]);
    balls[2].checkCollision(balls[4]);
    balls[2].checkCollision(balls[5]);

    balls[3].checkCollision(balls[4]);
    balls[3].checkCollision(balls[5]);

    balls[4].checkCollision(balls[5]);
  }
}

// allow web audio after mouse click
function mousePressed() { getAudioContext().resume() }
