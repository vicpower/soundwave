//var fft;
var socket;
//var smoothing;
//var binCount;

// fft = new p5.FFT()

// var spectrum = fft.analyze()
// var lowLvls = fft.getEnergy('bass', 'lowMid')


function preload() {
  // preload your audio file so everything is ready on page load
  soundFormats('mp3', 'ogg');
  mySound = loadSound('summermadness.mp3');

}

let t = 0; // time variable
var mic;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
 
  //instantiate the fft object
  //fft = new p5.FFT(smoothing, binCount);
  
  //noStroke();
  //fill(40, 200, 40);

  //var louder = map(vol, 0, 1, height, 0);
  mySound.setVolume(5);
  mySound.play();

  socket = io.connect('http://169.233.184.0.:8080');
}

function draw() {
  background(10,10); 

  noStroke();
  fill(random(0,255), random(0,200), 40);

  // analyze amplitude values along the whole frequency domain
  //var spectrum = fft.analyze();

  //grab low levels
  //var lowLvls = fft.getEnergy('bass', 'lowMid');

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 20 * cos(2 * PI * t + angle);
      let myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, random(0.1,33)); // draw particle
      //ellipse(myX, myY, 10); // draw particle
    }
  }

  t = t + 0.01; // update time

  var vol = mic.getLevel();
  console.log(vol);

}