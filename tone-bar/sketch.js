var dots = [];

function Dot(i) {
  let speeds = [0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029, 0.030];
  let notes = ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'a5', 'b5', 'c5'];
  let colors = ['red', 'blue', 'orange', 'green', 'purple', 'pink', 'yellow', 'brown', 'black', 'gray'];

  this.centerX = i*65+160
  this.centerY = height / 2;
  this.amplitude = 100;
  this.angle = 0;
  this.speed = speeds[i];
  
  this.move = function () {
    this.angle = this.angle + this.speed;
  };
  
  this.display = function (w) {
    var x = this.centerX;
    var y = this.centerY + sin(this.angle) * this.amplitude;
    var round_y = round(y);

    if (round_y >= 259 && round_y <= 261) {
      polySynth.play(notes[i], 0.6, 0, 1/6);
      console.log(w);
    };

    if (round_y >= 250 && round_y <= 270) {
      fill(colors[i]);
    } else { fill('white') };

    ellipse(x, y, 30, 30);
  };
}

function setup() {
  // approximate portrait phone: 510x890
  createCanvas(900, 520);
  polySynth = new p5.PolySynth();
  // polySynth.setADSR(0.2, 0.1, 1, 4);
  for (var i = 0  ;  i < 10  ;  i++) {
    dots[i] = new Dot(i);
  }
}

function draw() {
  background('#ffd166');
  strokeWeight(5);
  line(100, 260, 800, 260);
  strokeWeight(0);
  for (var i = 0  ;  i < dots.length  ;  i++) {
    dots[i].move();
    dots[i].display(i);
  }
}

// allow web audio after mouse click
function mousePressed() { getAudioContext().resume() }
