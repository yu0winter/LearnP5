function CloudSystem () {
  var scl = 2;
  var inc = 0.01;
  var zOff = 0;
  var scal = 0.1;

  var rows = floor(height/scl);
  var columns = floor(width/scl);

  this.draw = function (precent){

    for (var j = 0; j < rows;j+=scl) {

      var maxAlpha = map(j*scl, 0, height, 0, 520*precent); 
      if (maxAlpha==0) {
        continue;
      }

      for(var i = 0; i < columns; i+=scl) {
        var nosieValue = noise((-frameCount * 0.05) + i *0.02,j*0.04,frameCount *0.02);
        var alpha = map(nosieValue,0.4,1,0,maxAlpha);
        noStroke();     
        fill(255,alpha);
        var w = map(nosieValue,0,0.8,scl*0.2,scl*1)
        rect(i*scl+random(0,1),j*scl,w , scl);
      }
    }
  }
}

