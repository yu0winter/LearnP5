
var array2d;
var fr;
var waveSystem;
var alphaForBackground = 0.3;
var distance = 0.1;
function setup() {
  createCanvas(200,200)
  background(0);
  frameRate(60);
  fr = createP('');
  array2d = [width];
  for (var x = 0;x < width;x++) {
    array2d[x] = [height];
  }

  waveSystem = new WaveSystem();
  waveSystem.setup();
  
}



var pointSize = 1;

function draw() {
  fr.html(floor(frameRate()));
  noStroke();
  fill(0,255*alphaForBackground);
  rect(0,0,width,height);
  // 波长
  var wavelength = 20;
  // 振幅
  var amplitude = height/4;
  // if (frameCount % 30==0) {
  //   var index = floor(random(4));
  //   var origin = createVector(random(- width + 10,width*2),random(-height,2*height));
  //   waveSystem.waves[index] = new Wave(origin,random(-10,10),random(width/5,width/2),random(2,10));
  // }
var scl = 0.005;
  var origin = createVector(-width,height/2);
  var randomWave = new Wave(origin,10,30,2);

  for (var x = 0;x < width;x++) {

    for (var y = 0; y< height;y++) {
      var v = createVector(x,y);
      var z = waveSystem.resultZ(v);

      // var noiseValue = noise(x * scl,y * scl ,frameCount *scl); 

      // z += map(noiseValue,0,1,-20,20);
      array2d[x][y] = z;
    }
  }


  for (var x = 1;x < width-1;x+=pointSize) {

    for (var y = 1; y< height-1;y+=pointSize) {
      if (array2d[x][y] > 0 
      && CheckIsMax(x,y)
      ) {

        var alp = map(array2d[x][y]*1.5,0,waveSystem.amplitudes,0,255);
        // fill(255,alp);
        // noStroke();
        stroke(255,alp);
        point(x,y);
        // ellipse(x,y,pointSize,pointSize);
        // print('yES');/
      }
      else {
        // fill(0);
        // noStroke();
        // ellipse(x,y,pointSize,pointSize);

      }
    }
  }
}



function WaveSystem() {
  this.amplitudes = 0;
  this.waves = [];
  this.resultZ = function (location) {
    var z = 0;
    for (var i = 0;i < this.waves.length;i++) {
      z += this.waves[i].reachLocation(location);

    }
    return z;
  }

  this.setup = function () {
    for (var i = 0; i < 20;i++) {
    //   // if (i==0) {
    //   //   var origin = createVector(-width,random(0,height));
    //   //   this.waves[i] = new Wave(origin,10,100,2);
    //   // } 
    //   // else {
        if (i == 0) {

          var origin = createVector(-width*2,height/2);
          this.waves[i] = new Wave(origin,2,100,0.5);
        }
        else {

    //       // var origin = createVector(0,0);
    //       // this.waves[i] = new Wave(origin,10,100,10);

          var origin = createVector(random(- width*10,0),random(-height*10,height*10));
          var amplitude = random(0,1)
          this.waves[i] = new Wave(origin,amplitude,i*10+10,random(0.01,2));
          this.amplitudes+= amplitude;
        }
        
    //   // }
    }
    // print(this.waves.length);


    // var origin = createVector(0,0);
    // var amplitude =0;
    // origin = createVector(-width,height/2);
    // amplitude = 10;
    // this.waves[0] = new Wave(origin,amplitude,20,5);
    // this.amplitudes+= amplitude;


    // origin = createVector(width/2,-height * 5);
    // amplitude = 5;
    // this.waves[1] = new Wave(origin,amplitude,10,2);
    // this.amplitudes+= amplitude;

    // origin = createVector(width/2,+height * 5);
    // amplitude = 5;
    // this.waves[2] = new Wave(origin,amplitude,50,1);
    // this.amplitudes+= amplitude;


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
    // var distance = this.origin.dist(location);

    // var distance2 = location.x - 
    var x1 = this.origin.x;
    var y1 = this.origin.y;
    var x2 = location.x;
    var y2 = location.y;

    var x = Math.abs(x2 - x1);
    var y = Math.abs(y2 - y1);
    var distance = Math.sqrt(x*x+y*y); 

    var z = amplitude * sin(TWO_PI * (distance / this.wavelength) - TWO_PI*(frameCount*this.speed/this.wavelength ));
    return z;
  }

}



function CheckIsMax(x,y) {

  for (var i = -1; i <= 1; i++) {
    for (j = -1; j <= 1; j++) {
      if (i == 0 && j == 0)  {
        continue;
      } else {
        var center = array2d[x][y];
        if (center < array2d[x-i][y-j]-distance){
          return false;
        }
      }
    }
  }

  return true;
}
