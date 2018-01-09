
    /*


    rate = 30; // 每秒刷新的帧数
    maxLength = 15;// 线最长长度;
    multipleForDensity = 4;// 倍数，该数值越大，线的长度、数量等都会随之变大。

    // 可以该行代码,利用鼠标位置动态控制细节。
    //maxLength= map(mouseX,0,width,5,50);// 控制线的最大长度
    multipleForDensity = map(mouseX,0,width,1,10);

    **/
//

var maxLength;
var rate;
var multipleForDensity;
var xSpeed;
var ySpeed;
function setup() {
    createCanvas(1920,1080);
    background(backgrounColorWithAlpha(255));
	rate = 30; // 每秒刷新的帧数
    maxLength = 15;// 线最长长度;
    multipleForDensity = 4;// 倍数，该数值越大，线的长度、数量等都会随之变大。
    xSpeed = 0.01;// 控制水平方向移动速度
    ySpeed = 0.01;// 控制竖直方向移动速度
    frameRate(rate);
	// WaterSyatem(波纹分辨率,噪声范围,噪声范围)
	water = new WaterSyatem(100,0.04,600);
}

function draw() {	
    // 可以该行代码,利用鼠标位置动态控制细节。
    //maxLength= map(mouseX,0,width,5,50);// 控制线的最大长度
    multipleForDensity = map(mouseX,0,width,1,10);

    var alfa = 255;
    noStroke();
    fill(backgrounColorWithAlpha(alfa));
    rect(0,0,width,height);
    fill(255);   
    water.update();
}

function backgrounColorWithAlpha(alpha)  {
  return color(137,190,223,alpha);
}


var isStop ;
function mousePressed() {
  isStop = !isStop;
  if (isStop) {
    noLoop();
} else {
    loop();
}
}

/**
 * Created by Administrator on 2017/12/30.
 */
 function WaterSyatem(seaResolution,noiseScale,heightScale)
 {
    this.seaResolution = seaResolution;//波纹分辨率
    this.noiseScale = noiseScale;//噪声范围
    this.heightScale = heightScale;//浮动大小

    this.widthNormalize = width / seaResolution;//width canvas.width
    this.heightNormalize = height / seaResolution;////height canvas.height

    this.positionArrXpos = new Array(seaResolution*seaResolution);//上一帧的位置数组
    this.positionArrYpos = new Array(seaResolution*seaResolution);//上一帧的位置数组

    for (var h = 0; h<this.seaResolution;h++)
    {
        for(var w = 0;w<this.seaResolution;w++)
        {
            this.positionArrXpos[h*seaResolution+w] = 0;
            this.positionArrYpos[h*seaResolution+w] = 0;
        }
    }

    this.dotSize = 4;//元素大小
    this.perlinNoiseAnimX = 0.02;//噪声取值时间轴
    this.perlinNoiseAnimY = 0.02;

    this.update = function () {
        for (var h = 0; h<this.seaResolution;h++)
        {
            for(var w = 0;w<this.seaResolution;w++)
            {
                var xPos = noise( -w * this.noiseScale + this.perlinNoiseAnimY,-h * this.noiseScale + this.perlinNoiseAnimX,frameCount*0.01);
                var dotX  = w * this.widthNormalize+h%2*this.widthNormalize*0.5+xPos * this.heightScale*0.5 - 160;
                var doty = h * this.heightNormalize + xPos * this.heightScale*0.5-80;

                if(dotX > this.positionArrXpos[h*this.seaResolution+w]) {
                    var lastPoint = createVector(this.positionArrXpos[h*this.seaResolution+w],this.positionArrYpos[h*this.seaResolution+w]);
                    
                    this.drawDot(dotX, doty,lastPoint);
                }
                this.positionArrXpos[h*this.seaResolution+w] = dotX;
                this.positionArrYpos[h*this.seaResolution+w] = doty;         
            }
        }
        this.perlinNoiseAnimX += xSpeed;
        this.perlinNoiseAnimY += ySpeed;
    }

    this.drawDot = function(x,y,lastPoint)
    {
        if (x < - this.dotSize) {
            x = width+this.dotSize;
            return;
        }
        if (x > width + this.dotSize) {
            x = -this.dotSize;
            return;
        }
        if (y < -this.dotSize) {
            y = height+this.dotSize;
            return;
        }
        if (y > height+this.dotSize) {
            y = -this.dotSize;
            return;
        }
        var v = createVector(x - lastPoint.x,y - lastPoint.y);
        var precent;
        var max = this.heightScale ;
        var mag = v.mag()*40;
        if (mag > max) {
            precent = 1;
        } else {
            precent = map(mag,0,max,0,1) * multipleForDensity;   
        }
        if (precent < 0.1) {
            return;
        }
        stroke(255,precent*255);
        strokeWeight(2*precent);
        line(x,y,x-maxLength*precent  ,y-maxLength*precent);
    }
}