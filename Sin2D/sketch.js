

var waveSystem;
function setup() {
  createCanvas(400,400)
  background(137,190,223);
  frameRate(15);

  waveSystem = new WaveSystem();
  waveSystem.setup();
}

function WaveSystem() {

  this.waves = [];

  this.setup = function () {
    for (var i = 0; i < 5;i++) {
      // if (i==0) {
      //   var origin = createVector(-width,random(0,height));
      //   this.waves[i] = new Wave(origin,10,100,2);
      // } 
      // else {
        var origin = createVector(random(- width + 10,width*2),random(-height,2*height));
        this.waves[i] = new Wave(origin,random(-10,10),random(width/10,width/2),random(2,10));
      // }
    }
    print(this.waves.length);
  }

  this.resultZ = function (location) {
    var z = 0;
    for (var i = 0;i < this.waves.length;i++) {
      z += this.waves[i].reachLocation(location);
    }

    var scl = 0.04
    var noiseValue = noise(location.x + frameCount * scl,location.y + frameCount * scl); 

    z += map(noiseValue,0,1,-20,20);
    return z;
  }



}


function Wave(origin,amplitude,wavelength,speed) {

  this.origin = createVector(origin.x,origin.y);
  // 振幅
  this.amplitude = amplitude;
  // 波长
  this.wavelength = wavelength;
  // 波速
  this.speed = speed;

  this.reachLocation = function (location) {
    var distance = this.origin.dist(location);
    var z = amplitude * sin(TWO_PI * (distance / this.wavelength) - TWO_PI*(frameCount*this.speed/this.wavelength ));
    return z;
  }

}


var pointSize = 4;

function draw() {
  background(137,190,223,150);
  // 波长
  var wavelength = 20;
  // 振幅
  var amplitude = height/4;
  if (frameCount % 30==0) {

    waveSystem.setup();
  }

  var origin = createVector(-width,height/2);
  var randomWave = new Wave(origin,10,30,2);

  for (var x = 0;x < width;x+=pointSize) {

    for (var y = 0; y< height;y+=pointSize) {
        var v = createVector(x,y);
        var z = waveSystem.resultZ(v);
        z += randomWave.reachLocation(v);
        // print(z);
        var alp = map(z,-50,50,-255,255);

        if (alp > 10) {
        fill(255,alp);
        noStroke();

        ellipse(x,y,pointSize,pointSize);

        }
        
      }
    }
}