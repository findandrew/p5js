var dots = [];

function Dot(i) {
  let speeds = [0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029,
                0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029,
                0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029,
                0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029,
                0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029,
                0.020, 0.021, 0.022, 0.023, 0.024, 0.025, 0.026, 0.027, 0.028, 0.029,];
  let notes = ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'a5', 'b5', 'c5',
               'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'a5', 'b5', 'c5',
               'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'a5', 'b5', 'c5',
               'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'a5', 'b5', 'c5'];
  let colors = ['red', 'blue', 'orange', 'green', 'purple', 'pink', 'yellow', 'brown', 'black', 'gray',
                'red', 'blue', 'orange', 'green', 'purple', 'pink', 'yellow', 'brown', 'black', 'gray',
                'red', 'blue', 'orange', 'green', 'purple', 'pink', 'yellow', 'brown', 'black', 'gray',
                'red', 'blue', 'orange', 'green', 'purple', 'pink', 'yellow', 'brown', 'black', 'gray'];

  this.centerX = i*10+150
  this.centerY = height / 2;
  this.amplitude = 30;
  this.angle = 0;
  this.speed = speeds[i];

  this.move = function () {
    this.angle = this.angle + this.speed;
  };

  this.display = function (w) {
    var x = this.centerX;
    var y = this.centerY + sin(this.angle) * this.amplitude;
    var round_y = round(y);

    if (round_y >= 245 && round_y <= 275) {
      fill('yellow');
    } else { fill('white') };

    ellipse(x, y, 10, 10);
  };
}

function setup() {
  // approximate portrait phone: 510x890
  createCanvas(900, 520);
  // polySynth = new p5.PolySynth();
  // polySynth.setADSR(0.2, 0.1, 1, 4);

  // soundFormats('mp3', 'ogg');
  // mySound = loadSound('../src/sound/string-pluck.mp3');

  for (var i = 0  ;  i < 60  ;  i++) {
    dots[i] = new Dot(i);
  }
}

function draw() {
  background('black'); //('#ffd166');
  strokeWeight(5);
  // line(100, 260, 800, 260);
  strokeWeight(0);
  for (var i = 0  ;  i < dots.length  ;  i++) {
    dots[i].move();
    dots[i].display(i);
  }
}

// allow web audio after mouse click
function mousePressed() { getAudioContext().resume() }
