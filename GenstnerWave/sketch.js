var fr;
function setup() {
  createCanvas(400,400)
  background(0);
  frameRate(60);
  fr = createP('');
  
  itemWidth= 1;
  // rows = height / itemWidth;
  cols = width/itemWidth;
  waveArray = [width]
 dir  = createVector( 0.3, -0.3, 0.3);

  for(var col=0; col < cols; col++)
  {
    waveArray[col] = createVector(itemWidth * col,200,0);

  }
}

var cols;
var rows;
var itemWidth;
var waveArray;
function draw() {
  // noLoop();
  fr.html(floor(frameRate()));
  background(0);

  var timeVal = frameCount * 0.001;
  for(var col=0; col < cols; col++)
  {
    var gerstnerVal = gerstner(waveArray[col], timeVal);
    
    strokeWeight(1);
    stroke(255,0,0);
    point(col,gerstnerVal.x);
    stroke(0,255,0);
    point(col,gerstnerVal.y);
    stroke(0,0,255);
    point(col,100+gerstnerVal.z);

    stroke(255,100,100);
    point(gerstnerVal.x,50+gerstnerVal.y);

    stroke(100,200,100);
    strokeWeight(2);
    point(gerstnerVal.x,300-gerstnerVal.z);

  }
}


var A   = 10;
var Q   = 1;
var w   = 0.1;
var dir;

function setupGerstnerConfig () {
  dir  = createVector( 0.3, -0.3, 0.3);

}

function gerstner (vertex,  t)
{  
  var C   = 10.0;
  var L   = 30.0;

  var pos = createVector(0,0,0);
  // 起点
  var director = 0.0;

  pos.x = vertex.x;
  pos.z = vertex.z;

  director = dir.dot(vertex);

  var cosp = cos( 2 * PI * (w * director - C * t));
  var sinp = sin( 2 * PI * (w * director - C * t));

  return new p5.Vector(
    vertex.x + Q * A * dir.x * cosp,
    vertex.y + Q * A * dir.y * cosp,
    vertex.z + A * sinp
    );
}



  // var centerY = 100;
  // for (var x = 0;x<width;x++) {

  //   var y = centerY + 50 *sin(0.1 * x);
  //   stroke(255);
  //   point(x,y);
  //   print(x+","+y);
  // }

  // var centerY = 300;
  // for (var x = 0;x<width;x++) {
  //   var sinv = cos(0.1 * x);
  //   var sinv_2 = 1-Math.pow(  (sinv +1) /2,4 ) ;
  //   var y = centerY + 50 *sinv_2;
  //   stroke(255);
  //   point(x,y);
  //   print(sinv_2);
  // }