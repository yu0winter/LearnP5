
var drawPrelinLineModule;
var spots = [];
var isStop = false;
var count = 10;
function setup() {
  createCanvas(400,400);
  background(0);
  // drawPrelinLineModule = new drawPrelinLine();
  // drawPrelinLineModule.update();
  // drawPrelinLineModule.draw();
  
  for (var i = 0;i < count;i++) {
    spots[i] = new spotModule();
  }
}


function draw() {
  // print(frameRate());
  fill(0);
  rect(0,0,width,height);
  
    for (var i = 0;i < count;i++) {
    spots[i].update();
    spots[i].draw();
  }
}

function mousePressed() {
  isStop = !isStop;
  if(isStop) {
    noLoop();
  } else {
    loop();
  }
}



