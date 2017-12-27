var img;
var pointList = [];

function preload() {
  img = loadImage("avatar.jpg");
  print('preload');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  print("setup");
  
    imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
  var imageCenter = new PointModule(windowWidth/2.0,windowHeight/2.0);
  for (var i = 0 ;i < 10;i++) {
    var x = floor(random(img.width));
    var y = floor(random(img.height));
    var pixColor = img.get(x, y);// Color of the point
    var size = random(2,5);
    var origin;
    // 余数
    var remainder = i % 4;
    if (remainder == 0) {
      // 左边
      origin = new PointModule(0,random(0,windowHeight));
    } else if (remainder == 1) {
      // 上边
      origin = new PointModule(random(0,windowWidth),0);
    } else if (remainder == 2) {
      // 右边
      origin = new PointModule(windowWidth,random(0,windowHeight));
    } else {
      origin = new PointModule(random(0,windowWidth),windowHeight);
    }
    var pixLocation = new PointModule(x,y);
    var module =  new IconModule(origin,imageCenter,pixLocation,pixColor,size);
    pointList[i] = module;
  }
}

var time = 0;
function draw() {
  if (time == 0) {
    print("start drawing");
  }
  
  // ellipse(mouseX, mouseY, 20, 20);
  background(255);
  // imageMode(CENTER)
  // image(img,500,500,200,200);
  // print(pointList.length)
  for (var i = 0; i < pointList.length; i++) {
    pointList[i].update(time);
    pointList[i].draw();
  }
  time++;
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

var enterDuration = 2*60;
var sleepDuration = 2*60;
var exitDuration = 1.5*60;
IconModule.prototype.update = function(_time) {
  if (_time <= enterDuration) {
    var duration = enterDuration;
    var offset = _time; 
    var velocityX = (this.target.x - this.origin.x)/this.duration * offset;
    var velocityY = (this.target.y - this.origin.y)/this.duration * offset;
    this.currentLocation.x = this.target.x + velocityX * offset;
    this.currentLocation.y = this.target.y + velocityY * offset;
  }
  else if (_time <= enterDuration + sleepDuration) {
    // var duration = sleepDuration;
    // var offset = _time - enterDuration;
  }
  else if (_time <= enterDuration + sleepDuration + exitDuration) {
    var duration = exitDuration;
    var offset = _time - (enterDuration + sleepDuration);
    var velocityX = (this.target.x - this.origin.x)/this.duration * offset;
    var velocityY = (this.target.y - this.origin.y)/this.duration * offset;
    this.currentLocation.x = this.target.x - velocityX * offset;
    this.currentLocation.y = this.target.y - velocityY * offset;
  }
  else {
    print("动画停止");
  }
}

IconModule.prototype.draw = function(_time) {
  fill(this.pixColor,128);
  ellipse(this.currentLocation.x, this.currentLocation.y, this.size, this.size);
}


function PointModule(_x,_y) {
  this.x = _x;
  this.y = _y;
}