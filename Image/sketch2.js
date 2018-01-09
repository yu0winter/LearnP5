int num = 100;
Particle[] particles = new Particle[num];
float noiseScale=500, noiseStrength=1;

float NOISE_SCALE = 0.004f;
int STEP = 20;


void setup() {
  size(800, 600);
  noStroke();
  for (int i=0; i<num; i++) {
    PVector loc = new PVector(random(width*1.2), random(height), 2);
    float angle = random(TWO_PI);
    PVector dir = new PVector(cos(angle), sin(angle));
    float speed = random(.5, 2);
    particles[i]= new Particle(loc, dir, speed);
  }
	  count = (int)(width*1.5/STEP);
	
}

var z = 5;
var time = 0;
void draw() {
  // background(0);
	
	num = time>1000?1000:time;
// 	z = 10 - Math.sqrt(time)/10;
// 	z = z <5?5:z;
	if (time < 300) {
		if (time < 256) {
			alpha = 1000 - Math.sqrt(time) * 24.75;
		} else if (time < 512){
			alpha = 0;
			z = 10 - Math.sqrt((time-256)/60);
			z = z <2?2:z;
		}
			// print("alpha:"+alpha+"\\n");
	
 	 fill(0,alpha);
	  noStroke();
  	rect(0, 0, width, height);
  	fill(255);  
 	 for (int i=0; i<particles.length; i++) {
  	  particles[i].run();
	  }
	} 
	else //if (time < 700) {
	{
		// var offset = time - 512;
		// fill(255,alpha);
	// }
	// else if (time == 700) {
		background(255);
	}
// 	else {
// 		// background(255);
		
// 		// setupWave();
// 		// drawWave();		
// 	}
	

	time++;
	// print("alpha:"+alpha+"\n");
}

class Particle {

  PVector loc, dir, vel;
  float speed;
  int d=1; // direction change
  color col;

  Particle(PVector _loc, PVector _dir, float _speed) {
    loc = _loc;
    dir = _dir;
    speed = _speed;
  }

  void run() {
    move();
    checkEdges();
    update();
  }

  void move() {
    float angle=noise(loc.x/noiseScale, loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength;
    dir.x = cos(angle);
    dir.y = sin(angle);
    vel = dir.get();
    vel.mult(speed*d);
    loc.add(vel);
  }

  void checkEdges() {
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (loc.x<0 || loc.x>width || loc.y<0 || loc.y>height) {    
      loc.x = random(width*1.2);
      loc.y = random(height);
    }
  }

  void update() {
    fill(200);
    ellipse(loc.x, loc.y, z, z);
  }
}

void keyPressed() {
  saveFrame("image-###.gif");
}