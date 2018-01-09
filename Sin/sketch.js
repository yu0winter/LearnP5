var fr;
function setup() {
  createCanvas(400,400)
  background(0);
  frameRate(60);
  fr = createP('');
  
}


function draw() {
  noLoop();
  fr.html(floor(frameRate()));
  var centerY = 100;
  for (var x = 0;x<width;x++) {

    var y = centerY + 50 *sin(0.1 * x);
    stroke(255);
    point(x,y);
    print(x+","+y);
  }

  var centerY = 300;
  for (var x = 0;x<width;x++) {
    var sinv = cos(0.1 * x);
    var sinv_2 = 1-Math.pow(  (sinv +1) /2,20) ;
    var y = centerY + 50 *sinv_2;
    stroke(255);
    point(x,y);
    print(sinv_2);
  }


}


