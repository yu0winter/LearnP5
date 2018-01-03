function ParticleSystem(maxCount) {
  
  this.maxCount = maxCount;
  this.particles = [this.maxCount];
}

ParticleSystem.prototype.setup = function () {

 	for (var i=0; i<this.maxCount; i++) {
	  	var loc = createVector(random(width*1.2), random(height));
	  	var angle = random(TWO_PI);
	  	var dir = createVector(cos(angle), sin(angle));
	  	var speed = random(.5, 2);
	  	this.particles[i]= new ParticleModule(loc, dir, speed);
	}
}
ParticleSystem.prototype.draw = function () {
  for (var i=0; i<this.particles.length; i++) {
  	  this.particles[i].run();
	}
}

ParticleSystem.prototype.reduce = function (reduceCount) {
  if (this.particles.length < reduceCount) {
    reduceCount = this.particles.length;
  } 
  this.particles.splice(this.particles.length - reduceCount,reduceCount);
}

var noiseScale=500, noiseStrength=1;
function ParticleModule(_loc,_dir,_speed) {
  
  this.loc = _loc;
  this.dir = _dir;
  this.speed = _speed;
  
  this. d=1; // direction change
  this.col;
	this.z = 3;
}


ParticleModule.prototype.run = function () {
  this.move();
  this.checkEdges();
  this.update();
}

ParticleModule.prototype.move = function () {
  var angle = TWO_PI * noiseStrength * noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)
  this.dir.x = cos(angle);
  this.dir.y = sin(angle);
  this.vel = this.dir.copy();
  this.vel.mult(this.speed*this.d);
  this.loc.add(this.vel);
}

ParticleModule.prototype.update = function () {
  ellipse(this.loc.x, this.loc.y, this.z, this.z);
}

ParticleModule.prototype.checkEdges = function () {
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
}