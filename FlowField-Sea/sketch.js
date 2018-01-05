
var scl = 2; // 点的大小
var inc = 0.08; // 局部变化幅度
var count= 2000; // 点的数量


var fr;
var cols;
var rows;
var particles = [];


var flowFiled = [];
var zArray = [];
var sinWaves = [];


function backgrounColorWithAlpha(alpha) {

  return color(0,255 * alpha);

}

function setup() {
  createCanvas(400,400);
  background(backgrounColorWithAlpha(1.0));
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  frameRate(20);
  for (var i = 0; i < count; i++) {
  	particles[i] = new Particle();
  }
  print(particles.length);
}
var zoff = 0;
function draw() {
  noStroke();
	fill(backgrounColorWithAlpha(1.0));
  rect(0,0,width,height);
	var xoff=0;
	for (var x =0; x<rows; x++) {
		var yoff= 0;
		for (var y = 0; y < cols; y++) {
      var r = noise(xoff,yoff,zoff*0.03);
     		 var angle =PI + r * 2*PI;//map(r,0,1,0,TWO_PI)
      // var angle = random(TWO_PI);
      var v = p5.Vector.fromAngle(angle);
      v.z = r;
      var index = x + y * cols;
      flowFiled[index] = v;
      yoff+=inc;
 		}
  		xoff+=inc;
	}
	zoff += 1;
	
	for (var i = 0; i < count; i++) {
		// particles[i].applyForce(createVector(random(-0.1,0.1),random(-0.1,0.1)))
		particles[i].follow(flowFiled);
		particles[i].update();
		particles[i].checkEdges();
		particles[i].show();
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

