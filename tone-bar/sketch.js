function setup() {
  // approximate portrait phone: 510x890
  createCanvas(520, 900);
  polySynth = new p5.PolySynth();
  // polySynth.setADSR(0.2, 0.1, 1, 4);
}

function draw() {
  background('#ffd166');
  strokeWeight(5);
  line(260, 100, 260, 800);
  strokeWeight(0);
  circle(40,40,80);
}

// allow web audio after mouse click
function mousePressed() { getAudioContext().resume() }
