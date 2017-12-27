function setup() {
  createCanvas(200,200);
  background(0);
  // 解决Retina屏的问题
  pixelDensity(1);
}

var start=0;
var inc = 1;
function draw() {
  // drawPerlinNoise2D();
  // drawPerlinNoise1D();
  drawByNoise();
}

var inc = 0.05;
function drawPerlinNoise2D () {
  background(0);
  // 读取当前Convas的像素点，并传到pixels变量中
  loadPixels();
  
  var xoff = 0;
  var yoff = 0;
  for (var x =0;x < width;x++) {
    var yoff= 0;
    for (var y = 0;y < height;y++) {
      var index = (x + y * width) * 4;
      // var r = random(255);
      var r = noise(xoff,yoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
      yoff +=inc; 
    }
    xoff+=inc;
  }
  updatePixels();
  // noLoop(); 
  
}


function drawPerlinNoise1D () {
  background(0);
  // 读取当前Convas的像素点，并传到pixels变量中
  loadPixels();
  
  var xoff = 0;
  // var yoff = 0;
  for (var x =0;x < width;x++) {
    for (var y = 0;y < height;y++) {
      var index = (x + y * width) * 4;
      // var r = random(255);
      var r = noise(xoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
      xoff+=inc;
    }
    
  }
  updatePixels();
  // noLoop(); 
  
}



function drawByNoise() {
  background(0);
  loadPixels();
  for (var x = 0;x < width;x++) {
    for (var y = 0;y < height;y++) {
      // 逐行扫描，所以当前点的序号是 行数*行宽 + 当前行的x，当然了还要乘以4，代表rgba，每个点有四个值
      var index = (x + y * width) * 4;
      var r = random(255);
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
    }
  }
  updatePixels()
  noLoop()
}