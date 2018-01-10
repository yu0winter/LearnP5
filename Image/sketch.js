var img;
var pointList = [];
var showPointList =[];
var enterDuration = 1*60;// 进入时间
var sleepDuration = 1*60; // 持续时间
var exitDuration = 0.75*60; // 退出时间


function preload() {
  img =  loadImage("city.png");
  print('preload');
}

function setup() {
  createCanvas(1920, 1080);
  background(0);
  print("setup");
  
  noStroke();
  background(0);
  img.loadPixels();
  print('finished loadPixels');
  var imageCenter = new PointModule(0,0);
  setupPointList(imageCenter);
}

// 点击屏幕，重新来过。
function mousePressed() {
  time = 0;
}
var time = 0;
var color;
function draw() {
  if (time == 0) {
    print("start drawing");
  }
  background(0);

  var showPerTime = 100;

  for (var i = 0; i < showPerTime; i++) {
    p

  }



  if (time <= enterDuration + sleepDuration + exitDuration) {
    for (var i = 0; i < pointList.length; i++) {
      pointList[i].update(time);
      pointList[i].draw();
    }
  } else{
    pointList = null;
  }
  time++;
}


function setupPointList(_imageCenter){
  var maxSize = 5;
  var index=0;
  print (img.width + "," + img.height);
  for (var i = 0; i < img.width;i += maxSize) {
    for (var j = 0;j < img.height;j += maxSize) {

      var pixColor = img.get(i,j);// Color of the point
      var redValue = red(pixColor);
      if (redValue < 10) {
        continue;
      }
      var size = random(2,5);
      var origin = new PointModule(random(windowWidth),random(windowHeight));
      var pixLocation = new PointModule(i,j);
      var module =  new IconModule(origin,_imageCenter,pixLocation,pixColor,size);
      pointList[index] = module;

      index++;
    }
  }
  
  print("pointList.length:"+pointList.length);
}

function IconModule (_origin,_imageCenter,_pixLocation,_pixColor,_size) {
  this.origin = _origin;
  this.imageCenter = _imageCenter;
  this.pixLocation = _pixLocation;
  this.target = new PointModule(this.imageCenter.x + this.pixLocation.x,
    this.imageCenter.y + this.pixLocation.y);
  this.pixColor = _pixColor;
  this.size = _size;
  this.currentLocation = new PointModule(this.origin.x,this.origin.y);
}


IconModule.prototype.update = function(_time) {
  if (_time <= enterDuration) {
    var duration = enterDuration;
    var offset = _time; 
    var velocityX = (this.target.x - this.origin.x)/duration;
    var velocityY = (this.target.y - this.origin.y)/duration;
    this.currentLocation.x = this.origin.x + velocityX * offset;
    this.currentLocation.y = this.origin.y + velocityY * offset;
  }
  else if (_time <= enterDuration + sleepDuration) {
    // var duration = sleepDuration;
    // var offset = _time - enterDuration;
    textSize(32);
    fill(220,12,100);
    text("Hello,I'm Yulong",windowWidth*0.5,100);
  }
  else if (_time <= enterDuration + sleepDuration + exitDuration) {
    var duration = exitDuration;
    var offset = _time - (enterDuration + sleepDuration);
    var velocityX = (this.target.x - this.origin.x)/duration;
    var velocityY = (this.target.y - this.origin.y)/duration;
    this.currentLocation.x = this.target.x - velocityX * offset;
    this.currentLocation.y = this.target.y - velocityY * offset;
  }
  else {
    print("动画停止");
  }
}

IconModule.prototype.draw = function(_time) {
  fill(this.pixColor,128);
  noStroke();
  rect(this.currentLocation.x, this.currentLocation.y, this.size, this.size);
  // ellipse(this.currentLocation.x, this.currentLocation.y, this.size, this.size);
}


function PointModule(_x,_y) {
  this.x = _x;
  this.y = _y;
}