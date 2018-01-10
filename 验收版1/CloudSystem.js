function CloudSystem () {
  var itemHeight = 10; //显示单元的最大宽度
  var itemWidth = 2;  //显示单元的最大高度
  var xScale = 0.01;// 水平方向变化幅度，该值越大，代表变化幅度越大
  var yScale = 0.1;// 竖直方向变化幅度，该值越大，代表变化幅度越大

  var rows = floor(height/itemHeight);
  var columns = floor(width/itemWidth);

  this.draw = function (precent){

    for (var j = 0; j < rows;j+=1) {

      var maxAlpha = map(j*itemHeight, 0, height, 0, 520*precent); 
      if (maxAlpha<1) {
        continue;
      }

      for(var i = 0; i < columns; i+=1) {
        var nosieValue = noise(100+(-frameCount * 0.05) + i *0.02,j*0.1,frameCount *0.02);
        var alpha = map(nosieValue,0.4,1,0,maxAlpha);
        if (alpha < 1) {
          continue;
        }
        noStroke();     
        fill(255,alpha);
        var w = map(nosieValue,0,0.8,0,1)
        rect(i*itemWidth+random(0,1),j*itemHeight,w*itemWidth , w*itemHeight);
      }
    }
  }
}

