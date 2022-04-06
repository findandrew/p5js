var lines = [];

function makeLine(i) {
  strokeWeight(5);
  this.r = 0;
  this.g = 0;
  this.b = 0;

  this.recolor = function(r, g, b) {
    this.r = r+random(-2, 2);
    this.g = g+random(-2, 2);
    this.b = b+random(-2, 2);

    stroke(r, g, b);
  };

  this.display = function() {
    line(10*(i+1), 0, 10*(i+1), 900);
  };
}

function setup() {
  // approximate portrait phone: 510x890
  createCanvas(520, 900);
  for (var i = 0  ;  i < 51  ;  i++) {
    lines[i] = new makeLine(i);
  }
}

function draw() {
  background('black');

  for (var i = 0  ;  i < lines.length  ;  i++) {
    lines[i].recolor(lines[i].r, lines[i].g, lines[i].b);
    lines[i].display(i);
  }
}
