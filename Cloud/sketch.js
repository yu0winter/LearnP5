
var scl = 1;
var colmns = 0;
var rows = 0;
var inc = 0.01;
var zOff = 0;
var scale;

var bgColor;
var fr;
function setup() {
  createCanvas(200,100);
 bgColor= color(6,31,74)
  rows = floor(height/scl);
  columns = floor(width/scl);
	fr = createP('');
	scale = 0.1;
	background(bgColor);
}

function draw() {
	
var direction;

	var sas=Math.log(1);

  	fr.html(floor(frameRate()));

  	fill(6,31,74,100)
  	rect(0,0,width,height);

  // 	if (frameCount % 60) {
		// scale -= 0.001; 
  // 	} else if (frameCount == 300) {
  // 		return;
  // 	}

	if (frameCount % 2 == 0) {
		direction = 1;
	} else {
		direction = -1;
	}

	for(var i = 0; i < columns; i++) {
		for (var j = 0; j < rows;j++) {
			var nosieValue = noise((frameCount * 0.25+i) * scale,(j)*scale,frameCount *0.03);
			noStroke();

			var alpha;
			if(nosieValue < 0.5) {
 				alpha = 0;
			} else {
				var temp = map(nosieValue,0.5,1,0,1);
				alpha = nosieValue *nosieValue * nosieValue * 255;
				// =  nosieValue-0.5 * 255;
			}
			
			fill(255,alpha);
			rect(i*scl,j*scl,scl,scl);
		}

	}

	zOff += 1;
	//noLoop(); 
}