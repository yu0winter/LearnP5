// 学习视频链接：https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=6

// 小面片的大小
var scl = 10
var inc = 0.1;
var cols;
var rows;


var fr;
function setup() {
  createCanvas(400,400);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');
}

function draw() {
  background(255);
  var xoff=0;
  for (var x =0; x<rows; x++) {
    var yoff= 0;
    for (var y = 0; y < cols; y++) {
      var r = noise(xoff,yoff,frameCount*0.05);
      var angle = r * TWO_PI;//map(r,0,1,0,TWO_PI)
      // var angle = random(TWO_PI);
      var v = p5.Vector.fromAngle(angle);
      stroke(0);
      push();
      translate(x*scl,y*scl);
      rotate(v.heading());
      line(0,0,scl,0);
      yoff+=inc;
      pop();
    }
    xoff+=inc;
  }
  fr.html(floor(frameRate()));
  
  
}
var isStop = false;
function mousesPressed() {
  if (isStop) {
    noLoop();
  } else {
    loop();
  }
  
  
}



function drawNoise2DRect() {
  background(0);
  var xoff=0;
  for (var x =0; x<rows; x++) {
    var yoff= 0;
    for (var y = 0; y < cols; y++) {
      var r = noise(xoff,yoff)*255;
      stroke(0);
      strokeWeight(2);
      fill(r);
      rect(x*scl,y*scl,scl,scl);
      yoff+=inc;
    }
    xoff+=inc;
  }
  fr.html(floor(frameRate()));
}