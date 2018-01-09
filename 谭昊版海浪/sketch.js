
var water;

function setup() {
	createCanvas(1000,800);
	background(backgrounColorWithAlpha(255));
	print(backgrounColorWithAlpha(255));
	frameRate(20);
	water = new DrawParticleWater(30,0.04,450);
	// water.setup();
}

function draw() {
	// background(14,136,235);

	fill(backgrounColorWithAlpha(10));
	rect(0,0,width,height);
	fill(255);
	noStroke();
	water.Update1();
	// water.drawDots();
}


function backgrounColorWithAlpha(alpha)  {

	return color(137,190,223,alpha);

}
