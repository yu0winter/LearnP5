
function setup () {
  background(255);
  createCanvas(800,400);
  frameRate(20);
}

function draw() {
  noStroke();
  fill(255,10);
  rect(0,0,width,height);

  // return;
  var c = color(0);

if (frameCount >2&& frameCount < 4) {
  for (var i = 0; i < 10; i++) {
    drawPerlinCurve(width+100,i*50,i,2,1000,c);
    }
    
  }
  // noLoop();

}

/*
  x,y: 线描绘的触发点
  phase：相
  step:振幅
  count:转折次数
  myColour：线的颜色

*/
function drawPerlinCurve (x, y,  phase,  step,  count,  myColour)  {
  var NOISE_SCALE = 0.01;
  
  noFill();
  stroke(myColour);
  

  push();
  translate(0,y);
  var x_scale = 0.04;
  var max = width/step ;
  for (var i= 0; i <= max;i++) {
    
    var noiseValue = noise(i*x_scale,phase);
    var noiseValue_next = noise((i+1)*x_scale,phase);

    var y_value = map(noiseValue,0,1,0,-200);
    var y_value_next =  map(noiseValue_next,0,1,0,-200);

    var minY = floor(min(y_value,y_value_next));

    for (var j = 0;j > minY+2;j--) {

      var alpha = map(j,0,-100,-255,255);
      // print(alpha);
      if (alpha > 0) {
        fill(0,alpha);
        noStroke();
        rect(i*step,j,step,1);
        // print(j);
      }
    }

    // beginShape();
    // noStroke();
    // var alpha = map(minY,0,-200,-255,255);
    // fill(0,alpha);
    // curveVertex(i*step, y_value);
    // curveVertex((i+1)*step, y_value_next);
    // curveVertex((i+1)*step, minY);
    // curveVertex(i*step, minY);
    // endShape(CLOSE);
  }

 pop();
 

  // stroke(255,0,0);
  // line(0,200,width,200);
}






function PerlinCurveSystem(startTime,duration) {

  this.startTime = startTime;
  this.duration = duration;
  this.endTime = startTime+duration;
  this.precent = 0;
  // 动画固定参数
  this.step = 20;
  this.finailAlpha = 100;
  this.count = (width*1.5/this.step);
  this.distance = 5;

  this.update = function(distance) {
    this.distance = distance;
    var currentTime = frameCount/60;
    if (currentTime > this.endTime) {
      this.precent = 1;
    } else {
      this.precent = map(currentTime,this.startTime,this.endTime,0,1);   
    }
  }

  this.draw = function(aColor) {
    for(var y = 0;y < height;y+=this.distance) {
      drawPerlinCurve(width+100,y,frameCount/2,this.step,this.count,aColor)
    }
  }

}

PerlinCurveSystem.prototype.draw = function(aColor) {
  // var alpha = this.precent * this.finailAlpha;
  // var aColor = color(255,alpha);
  
  for(var y = 0;y < height;y+=this.distance) {
    drawPerlinCurve(width+100,y,frameCount/2,this.step,this.count,aColor)
  }
}
