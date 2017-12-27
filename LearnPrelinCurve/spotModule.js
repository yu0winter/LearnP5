function spotModule () {
  this.x = 0;
  this.y = 0;
  this.size = 10;
  this.xOffset = random(0,100);
  this.yOffset = random(100,200);
    
  this.update = function() {
    this.x = map(noise(this.xOffset * 0.05),0,1,0,width);
    this.y = map(noise(this.yOffset * 0.05),0,1,0,height);
    this.xOffset+=0.1
    this.yOffset+=0.1
  }
  
  this.draw = function() {
    fill(255);
    ellipse(this.x,this.y,this.size,this.size);
  }
  
}