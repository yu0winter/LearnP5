var waveSystem;
var particleSystem;
var bgColor;
function setup() {
  
  createCanvas(600,400);
  // noLoop();
  bgColor = color(137,190,223);
  background(bgColor);
  
  waveSystem = new PerlinCurveSystem(startTime =0,duration =10);
  particleSystem = new ParticleSystem(maxCount=100);
  particleSystem.setup();
}


// frameCount 帧数
var seconds = 0;
function draw() {
  
  if (frameCount < 5*60) {
    var alpha = map(frameCount,0,60*5,255,16,true);
    // print(alpha);
    fill(137,190,223,alpha);
    rect(0,0,width,height);
    noStroke();
    fill(255);  
    particleSystem.draw()
  } else if (frameCount < 6*60) {
    fill(137,190,223,16);
    rect(0,0,width,height);
    var alpha = map(frameCount,5*60,60*6,100,0);
    fill(255,alpha);  
    // 需要改变颗粒的透明度以及数量
    particleSystem.draw()
    
    // noFill();
    // // waveSystem.alpah = 255 - alpha;
    // waveSystem.update();
    
    // var aColor =color(255,map(alpha,255,0,0,50));
    // // fill(255,1-alpha);  
    // waveSystem.draw(aColor);
  } else {
    fill(137,190,223,16);
    rect(0,0,width,height);
    noFill();
    waveSystem.update();
  
    waveSystem.draw(color(255,100));
  }
  
  
  // var bg = color(137,190,223);
  // fill(bg,16);
  // rect(0,0,width,height);
  // waveSystem.update();
  // waveSystem.draw();
}


var STEP = 20;
function drawPerlinCurve (x, y,  phase,  step,  count,  myColour)  {
  // pushStyle();
  var NOISE_SCALE = 0.005;
  stroke(myColour);
  beginShape();
  for (var i=0; i<count; i++) {
    curveVertex(x, y);
    var angle = 2*PI*noise(x* NOISE_SCALE, y* NOISE_SCALE, phase* NOISE_SCALE);
    x += cos(angle)*step;
    y += sin(angle)*step;
  }
  endShape();
  // popStyle();
}


// function drawWave () {
  
  
// }
// 绘制
function drawPerlinNoise() {
  background(255);
  // print(0.23123*height);
  // fill(255);
  noFill();
  beginShape();
  
  for (var x=0; x < width; x++) {
    var noiseVal = noise(x);
    curveVertex(x,noiseVal*height);
    // print("("+x + ","+ noise*height +")")
  }
  endShape();
}






