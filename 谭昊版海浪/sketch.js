
var water;

function setup() {
	createCanvas(400,200);
	background(backgrounColorWithAlpha(255));
	print(backgrounColorWithAlpha(255));
	frameRate(20);
	water = new DrawParticleWater(30,0.04,300);
}

function draw() {
	// background(14,136,235);

	fill(backgrounColorWithAlpha(150));
	rect(0,0,width,height);
	water.update();
}


function backgrounColorWithAlpha(alpha)  {

	return color(137,190,223,alpha);

}