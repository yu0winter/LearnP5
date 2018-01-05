var waveSystem;
var particleSystem;
var bgColor;
function setup() {
  createCanvas(960,540);
	bgColor = color(137,190,223);
  background(bgColor);
  waveSystem = new PerlinCurveSystem(startTime =0,duration =10);
  particleSystem = new ParticleSystem(maxCount=1000);
  particleSystem.setup();  
	print("console");
}
// frameCount 帧数
function draw() {
  if (frameCount < 3*60) {
    var alpha = map(frameCount,0,60*3,255,50,true);
    // print(alpha);
    fill(137,190,223,alpha);
    rect(0,0,width,height);
    noStroke();
    fill(255);  
    particleSystem.draw()
  } 
  else if (frameCount < 6*60) {
		noStroke();
    fill(137,190,223,50);
    rect(0,0,width,height);
    var alpha = map(frameCount,3*60,60*6,255,0);
    fill(255,alpha);  
    particleSystem.reduce(1);  
    particleSystem.draw();
  }
  
  var start = 4.5*60;
  var end = 10*60;
  if (frameCount> start && frameCount < end) {
      noFill();
      var distance = floor(map(frameCount,start,end,width/4,10));
    // waveSystem.alpah = 255 - alpha;
      waveSystem.update(distance);
      var alpha2 = map(frameCount,start,end,0,20);
    // print(alpha2);
      var aColor =color(255,alpha2);
    // fill(255,1-alpha);  
      waveSystem.draw(aColor)
  } else if (frameCount> end) {
    particleSystem = null;
		noStroke();
    fill(137,190,223,16);
    rect(0,0,width,height);
    noFill();
    waveSystem.update(10);
    waveSystem.draw(color(255,100));
  }

 	//text("fps:"+ floor(millis()%1000),5,20);  
}