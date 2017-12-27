function setup() {
  createCanvas(400,400)
  background(0)
}

var offset = 0;
var start= 0;
var inc = 0.01;
function draw() {
  
  background(0)
  // fill(0,40);
  // rect(0,0,width,height);
  beginShape();
  stroke(255)
  noFill();
  
  var xoff = start;
  for(var x = 0; x< width;x+=1) {
    // var y = map(noise((x+offset) * 0.005),0,1,0,height);
    
    // 1。 噪声小
    // var n = map(noise(xoff),0,1,-50,50);
    // var s = map(sin(xoff),-1,1,0,height);
    // 2、噪声大
    var n = map(noise(xoff),0,1,0,height);
    var s = map(sin(xoff),-1,1,-50,50);
    y = n + s;
    vertex(x,y);
    
    xoff+= inc;
  }
  endShape();
  
  start+=inc
  
}




function drawMovingSinWave() {
  
  background(0)
  // fill(0,40);
  // rect(0,0,width,height);
  beginShape();
  stroke(255)
  noFill();
  for(var x = 0; x< width;x+=1) {
    // var y = map(noise((x+offset) * 0.005),0,1,0,height);
    var y;
    var sinY =height/2+ sin(map(x+offset,0,width,0,2*PI))*height/4;
    y = sinY;
    vertex(x,y);
  }
  endShape();
  offset+=1;
}



function drawShakeLine() {
  if(frameCount%4!=0) {
    return;
  
  }
  
  fill(0,40);
  rect(0,0,width,height);
  beginShape();
  stroke(255)
  noFill();
  for(var x = 0; x< width;x+=1) {
    var y = map(noise((x+offset) * 0.005),0,1,0,height);
    vertex(x,y);
  }
  endShape();
  offset+=1000;
}


function drawNoiseLine() {
  
  background(0)
  beginShape();
  stroke(255)
  noFill();
  for(var x = 0; x< width;x+=5) {
    vertex(x,random(height));
  }
  endShape();
  // noLoop();
  
}


/// 绘制满天星
function drawStar() {
  background(0)
  for(var x = 0; x< width;x++) {
    stroke(255)
    point(x,random(height))
  }
  noLoop();
}

