
var rows;
var columns;
var itemHeight;
var itemWidth;
var pdf;

function setup() {
  createCanvas(400,400);
      pdf = createPDF();
    pdf.beginRecord();
  background(0);
  itemWidth = 10;
  itemHeight = 10;
  rows = height/itemHeight+1;
  columns = width/itemWidth+1;
}

function draw() {

 background(0);
 
 var yoff = 10;

 for (var row =0; row < rows; row++) {

  beginShape();
  stroke(255,100);
  noFill();
  strokeWeight(2);
  for(var column = 0;column < columns;column++) {

    var amplitude = map(row,0,rows-1,10,itemHeight*1.5);
    var nValue = 100*map(noise(row * 0.1,column *0.15,frameCount*0.01),0,1,-1,1);
    if (nValue > 0) {
      nValue = 0;
    }
    vertex(column*itemWidth,nValue+row*itemHeight+itemHeight);
  }
  endShape();
}

}



function mousePressed() {
 
        pdf.save(); 
      noLoop();
 
}