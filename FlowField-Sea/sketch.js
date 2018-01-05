
var fr;
// 小面片的大小
var scl = 5
var inc = 0.1;
var cols;
var rows;
var particles = [];

var count;
var flowFiled = [];

function setup() {
  createCanvas(200,200);
  background(255);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  count = 5000;
  for (var i = 0; i < count; i++) {
  	particles[i] = new Particle();
  }
  print(particles.length);
}
var zoff = 0;
function draw() {
  noStroke();
	fill(255,10);
  rect(0,0,width,height);
	var xoff=0;
	for (var x =0; x<rows; x++) {
		var yoff= 0;
		for (var y = 0; y < cols; y++) {
			var r = noise(xoff,yoff,zoff*0.03);
     		var angle = r * TWO_PI * 4;//map(r,0,1,0,TWO_PI)
      // var angle = random(TWO_PI);
      		var v = p5.Vector.fromAngle(angle);
      		var index = x + y * cols;
      		v.setMag(0.5);// x^2 + y^2 =0.1;
      		flowFiled[index] = v;
      		// stroke(0,100);
      		// push();
      		// translate(x*scl,y*scl);
      		// rotate(v.heading());
      		// line(0,0,scl,0);
      		// pop();
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

