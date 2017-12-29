//  弹性的球

function setup() {
  createCanvas(400,400);
  background(0);
}

function draw() {
  background(0);
  // fill(0,10);
  // rect(0,0,width,height);
 
  //
  fill(255);
  //ellipse(width/2,height/2,100,100);
  noStroke();
  push();
  translate(width/2,height/2);
  beginShape();
  var xoff = 0;
  for (var a= 0; a< TWO_PI;a += 0.05) {
    // 电风扇
    //var offset = map(sin(a * 3 + frameCount*0.2),0,1,-25,25);
    
    var offset = map(sin(a * 10 + frameCount*0.2),-1,1,-25,25);
    // var offset = random(-5,5);
    // var offset = map(noise(xoff * 0.5 ,frameCount * 0.02),0,1,-25,25);
    var r = 50 + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x,y);
    // ellipse(x,y,2,2);
    
    xoff+=0.1;
  }
  endShape();
  pop();
  // noLoop();
}