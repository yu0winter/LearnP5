
function PerlinCurveSystem(startTime,duration) {
  
  this.startTime = startTime;
  this.duration = duration;
  this.endTime = startTime+duration;
  this.precent = 0;
  // 动画固定参数
  this.step = 20;
  this.finailAlpha = 100;
  this.count = (int)(width*1.5/this.step);
}

PerlinCurveSystem.prototype.update = function() {
  
  var currentTime = frameCount/60;
  if (currentTime > this.endTime) {
    this.precent = 1;
  } else {
    this.precent = map(currentTime,this.startTime,this.endTime,0,1);   
  }
}

PerlinCurveSystem.prototype.draw = function(aColor) {
  // var alpha = this.precent * this.finailAlpha;
  // var aColor = color(255,alpha);
  
  for(var y = 0;y < height;y+=5) {
    drawPerlinCurve(width+100,y,frameCount/2,STEP,this.count,aColor)
  }
}


function drawPerlinCurve (x, y,  phase,  step,  count,  myColour)  {
  var NOISE_SCALE = 0.004;
  
  noFill();
  stroke(myColour);
  beginShape();
  for (var i=0; i<count; i++) {
    curveVertex(x, y);
    var angle = 2*PI*noise(x* NOISE_SCALE, y* NOISE_SCALE, phase* NOISE_SCALE);
    x += cos(angle)*step;
    y += sin(angle)*step;
  }
  endShape();
}

