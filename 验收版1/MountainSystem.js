var countOfMountain = 10; 

function MountainSystem() {

  // 不透明度百分比。0为透明
  this.precent = 1;
  var closerColor = color(255)
  var furtherColor = color(255,120);
  var i0 = 30;
  var y0 = height - 200;  //fist reference y
  this.mountainsArray = [countOfMountain];
  var count = countOfMountain;
  for (var i = 0;i < count;i++) {
    var index = count-1-i;
    this.mountainsArray[index] = new Mountain();
    this.mountainsArray[index].setup(index+1,y0,closerColor,furtherColor);
    y0 -= i0 / pow(1.05, i);
  }

  this.update = function (precent_) {
    this.precent = precent_;

    for (var i = 0;i < this.mountainsArray.length;i++) {
     this.mountainsArray[i].update(precent_);
   }
 }


 this.draw = function() {
  var minYArray = [height];
  for (var i = this.mountainsArray.length - 1; i >= 0; i--) {
    for (var column = 0; column < width/5;column++) {
      if (i == this.mountainsArray.length - 1) {
       minYArray[column] = height;
     }
     else if (minYArray[column] > this.mountainsArray[i+1].yArray[column]) {
       minYArray[column] = this.mountainsArray[i+1].yArray[column];
     }
   }
   // this.mountainsArray[i].update();
   this.mountainsArray[i].draw(minYArray);
 }
}

}



function Mountain() {
  var itemWidth = 5;
  this.setup = function (index_,bottomY_,closerColor_,furtherColor_) {
    this.index = index_;  
    this.bottomY = bottomY_;
    this.closerColor = closerColor_;
    this.furtherColor = furtherColor_;
    this.a = random(-width/2, width/2);  //random discrepancy between the sin waves
    this.b = random(-width/2, width/2);  //random discrepancy between the sin waves  
    this.c = random(2, 4);  //random amplitude for the second sin wave
    this.d = random(40, 50);  //noise function amplitude
    this.e = random(-width/2, width/2);  //adds a discrepancy between the noise of each mountain  

    this.startX = random(-10,0);
    this.startHeight = height/10;

    this.columns = (width)/itemWidth;
    this.yArray = [this.columns]; 
            // 不透明度百分比。0为透明
    this.precent = 1;
  }

  this.update = function (precent_) {
    this.precent = precent_;
    var dx = 0;
    for (var column = 0; column < this.columns;column++) {
      var y =0;
      y+= this.bottomY;
        y += 10*this.index*sin(2*dx/this.index + this.a);  //first sin wave oscillates according to j (the closer the mountain, the bigger the amplitude and smaller the frequency)        
        y += this.c*this.index*sin(5*dx/this.index + this.b);   //second sin wave has a random medium amplitude (affects more the further mountains) and bigger frequenc  
        y += this.d*this.index*noise(1.2*dx/this.index +this.e,frameCount *0.01);  //first noise function adds randomness to the mountains, amplitude depends on a random number and increases with j, frequency decrases with j
        y += 1.7*this.index*noise(10*dx,frameCount *0.01);  //second noise function simulates the canopy, it has high frequency and small amplitude depending on j so it is smoother on the further mountains
        this.yArray[column] = y;
        dx += 0.02 * itemWidth;
      }
    }

    this.draw = function (lastMountain) {

      	var precent = this.index/countOfMountain * this.precent;//(this.bottomY-this.startHeight)/(height-this.startHeight);

      	var colorOfRect = lerpColor(this.furtherColor, this.closerColor, precent); 
      	var widthOfRect =  map(precent,0,1,0.5,3.5);

      	noStroke();
      	fill(colorOfRect);
      	for (var column = 0; column < this.columns;column++) {
      		for (var k = this.yArray[column];k < lastMountain[column];k+=0) {
      			var heightOfRect = random(2,8);
      			rect(this.index + column*itemWidth,k,widthOfRect,heightOfRect);
      			k+= heightOfRect+1;
      		}
      	}
      }
    }