// 1.添加变量
var pdf;
var rows;
var columns;
var itemHeight;
var itemWidth;

function backgrounColorWithAlpha(alpha)  {
  return color(137,190,223,alpha);
}

function setup() {
  createCanvas(800,1400,SVG);
  background(backgrounColorWithAlpha(255));
  pdf = createPDF();
    pdf.beginRecord();
  itemWidth = 10;
  itemHeight = 10;
  rows = height/itemHeight+1;
  columns = width/itemWidth+1;
  
      // 2.在 setup 方法中添加代码。需要导出矢量 PDF 文件
    // If we use SVG Renderer, then the PDF generated will be vector
    // Note that to use SVG Renderer, you must include p5.svg library
    
}

// 3.点击鼠标，触发保存保存 PDF 事件
function mousePressed() {
  noLoop();
    pdf.save(); 
    // saveSVG();
}

function draw() {

background(backgrounColorWithAlpha(255));
 
 var yoff = 10;

 for (var row =0; row < rows; row++) {

  beginShape();
  stroke(255,150);
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
