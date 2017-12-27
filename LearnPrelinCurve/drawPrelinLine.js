  
  function drawPrelinLine () {
    this.x = 0;
    this.bottomY = 200;
    this.amplitude = 100;
    this.y = this.bottomY; 
    this.noiseScale = 0.005;
    this.update = function () {
      if (this.x > windowWidth) {
        this.x = 0;
      }
      var noiseValue = noise(this.x*this.noiseScale);
      this.y = this.bottomY - noiseValue * this.amplitude;
      
     // print(noiseValue);
    }
    
    this.draw = function () {
      if (this.x == 0) {
        background(0);
        strokeWeight(2);
        stroke(255);
        line(0, this.bottomY, width, this.bottomY);
      }
  
      fill(255);
      noStroke();
      ellipse(this.x,this.y,1,1);
      this.x += 1;
    }
  }