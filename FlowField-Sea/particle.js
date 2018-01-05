function Particle () {
	// position 位置
	this.pos = createVector(random(width),random(height));//p5.Vector.random2D();//createVector(0,0);
	// previous position
	this.prevPos = this.pos.copy();
	// velocity 速度
	this.vel = createVector(0,0);
	// acceleration 加速度
	// accumulate 聚集，积累
	this.acc = createVector(0,0);
	this.maxSpeed = 2;
	this.colorValue = color(random(255),random(255),random(255),random(255));
	this.update = function () {
		
		this.vel.add(this.acc);
		// 限制最大速度
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}


	// applyForce function accumulate any forces into the acceleration
	this.applyForce = function (force) {
		this.acc.add(force);
	}

	this.show = function () {
		stroke(0,5);
		strokeWeight(1)
		// fill(this.colorValue);
		// ellipse(this.pos.x,this.pos.y,scl,scl);
		line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);

		// point(this.pos.x,this.pos.y);
		this.updatePrePos();
	}

	this.follow = function (vectors) {
		var x = floor(this.pos.x/scl);
		var y = floor(this.pos.y/scl);
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}

	this.updatePrePos = function () {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	this.checkEdges = function () {
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrePos();
		}
		if (this.pos.x > width) { 
			this.pos.x = 0;
			this.updatePrePos();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.updatePrePos();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrePos();
		}
	}
}		