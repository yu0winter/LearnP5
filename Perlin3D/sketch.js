var scl3D;
var timeStep = 0.2;
function setup() {
  createCanvas(200,200);
  background(0);
  // 解决Retina屏的问题
  pixelDensity(1);
  scl3D = 0.01;
}

function draw() {
  background(0);
  drawPerlinNoise3D();
}


function drawPerlinNoise3D () {
  
  background(0);
  // 读取当前Convas的像素点，并传到pixels变量中
  loadPixels();
  var time = frameCount;
  for (var x =0;x < width;x++) {
    for (var y = 0;y < height;y++) {
      var index = (x + y * width) * 4;
      // var r = random(255);
      var r = noise(x*scl3D,y*scl3D,time*timeStep) * 155 + noise(-x*scl3D,-y*scl3D,time*timeStep) * 155;

      // print(r);
      pixels[index + 0] = 255;
      pixels[index + 1] = 255;
      pixels[index + 2] = 255;
      pixels[index + 3] = r;
    }
  }
  updatePixels();
  // noLoop(); 
}

