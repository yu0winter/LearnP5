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
		// 衰减
		this.vel.mult(0.1)
		this.vel.add(this.acc.mult(0.9));
		// 限制最大速度
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		// 乘以0，用以重置。
		this.acc.mult(0);
	}


	// applyForce function accumulate any forces into the acceleration
	this.applyForce = function (force) {
		this.acc.add(force);
	}

	this.show = function () {
		// stroke(0,5);
		noStroke();
		//print(this.vel.z);
		// fill(0,this.vel.z * 10);
		var alphaZ = map(this.vel.z,0,0.8,-255,255);
	
		if (alphaZ > 0) {
			fill(255,alphaZ);
			ellipse(this.pos.x,this.pos.y,scl,scl);
		}
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