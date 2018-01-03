var waveSystem;
var particleSystem;
var bgColor;
var water;
var fr;
var rate =60;

function setup() {
  createCanvas(1920,1480);
  bgColor = backgrounColorWithAlpha(255);
  background(bgColor);
  waveSystem = new PerlinCurveSystem(startTime =0,duration =10);
  water = new DrawParticleWater(60,0.1,300);
  fr = createP('');

  frameRate(rate);
}
// frameCount 帧数
var list = [];
function draw() {
  

  var count = frameCount % (30*rate);

  // 30 秒拆分成三个部分
  var time1 = 1 * 10 * rate;
  var time2 = 2 * 10* rate;
  var time3 = 3 * 10 * rate;
  if (count < time1) {
    var alpha = 255;//map(count,0,60*3,255,50,true);
    noStroke();
    fill(backgrounColorWithAlpha(255));
    rect(0,0,width,height);
    
    var alp = floor(map(count,0,time1/2,0,150));
    noStroke();
    fill(255,alp);  
    //print(s)
    // var s =  floor(map(count,0,time1,50,60));
    // water.setSeaResolution(s);
    water.update();
  } 
  else if (count < time2) {
    var minAlpha = 3.54;
    var time2_1 = time1 + (time2 - time1)/4;
    var time2_2 = time1 + 3*(time2 - time1)/4;
    if (count < time2_1) {
      var alpha =map(count,time1,time2_1,30,minAlpha);
      fill(backgrounColorWithAlpha(alpha));
      rect(0,0,width,height); 

      var alp_w = floor(map(count,time1,time2_1,255,50));
      fill(255,alp_w);  
      water.update();
    }
    else if (count < time2_2) {
      var alpha = minAlpha;
      fill(backgrounColorWithAlpha(alpha));
      rect(0,0,width,height); 

      var alp_w = floor(map(count,time2_1,time2_2,255,40));
      fill(255,alp_w);  
      water.update();
    }
    else {
      var alpha = map(count,time2_2,time2,minAlpha,255);
      fill(backgrounColorWithAlpha(alpha));
      rect(0,0,width,height); 

      var alp_w = floor(map(count,time2_2,time2,40,0));
      fill(255,alp_w);  
      water.update();
    }
  }
  else if (count < time3) {

    var time3_1 = time2 + (time3-time2)/3;

    if (count < time3_1) {
      noFill();
      var distance = floor(map(frameCount,time2,time3_1,width/4,10));
      waveSystem.update(distance);
      var alpha2 = map(frameCount,time2,time3_1,0,20);
      var aColor =color(255,alpha2);
      waveSystem.draw(aColor)
    } else {
      particleSystem = null;
      noStroke();
      fill(backgrounColorWithAlpha(16));
      rect(0,0,width,height);
      noFill();
      waveSystem.update(10);
      waveSystem.draw(color(255,100));
    }

  }
 
  fr.html(floor(frameRate()));
}

/**
 * Created by Administrator on 2017/12/30.
 */
function DrawParticleWater(seaResolution,noiseScale,heightScale)
{
    this.seaResolution = seaResolution;//波纹分辨率
    this.noiseScale = noiseScale;//噪声范围
    this.heightScale = heightScale;//浮动大小

    this.widthNormalize = width / seaResolution;//width canvas.width
    this.heightNormalize = height / seaResolution;////height canvas.height

    this.positionArrXpos = new Array(seaResolution*seaResolution);//上一帧的位置数组
    this.positionArrYpos = new Array(seaResolution*seaResolution);//上一帧的位置数组
    this.positionXiangSi = new Array(seaResolution*seaResolution);

    for (var h = 0; h<this.seaResolution;h++)
    {
        for(var w = 0;w<this.seaResolution;w++)
        {
            this.positionArrXpos[h*seaResolution+w] = 0;
            this.positionArrYpos[h*seaResolution+w] = 0;
            this.positionXiangSi[h*seaResolution+w] = 0;

        }
    }

    this.dotSize = 5;//元素大小
    this.perlinNoiseAnimX = 0.01;//噪声取值时间轴
    this.perlinNoiseAnimY = 0.01;
    this.xSpeed = 0.01;    //更新噪声取值时间轴 调节数值克控制速度
    this.ySpeed = 0.01;
}
//效果一
DrawParticleWater.prototype.update = function()
{
    for (var h = 0; h<this.seaResolution;h++)
    {
        for(var w = 0;w<this.seaResolution;w++)
        {
            var xPos = noise( -w * this.noiseScale + this.perlinNoiseAnimY,-h * this.noiseScale + this.perlinNoiseAnimX);
            var dotX  = w * this.widthNormalize+h%2*this.widthNormalize*0.5+xPos * this.heightScale- width/3;
            var doty = h * this.heightNormalize + xPos * this.heightScale-height/3;

            if(dotX -  this.positionArrXpos[h*this.seaResolution+w] > 0) {
              this.drawDot(dotX, doty);    
            }

            this.positionArrXpos[h*this.seaResolution+w] = dotX;
            this.positionArrYpos[h*this.seaResolution+w] = doty;
        }
    }

    this.perlinNoiseAnimX += this.xSpeed;
    this.perlinNoiseAnimY += this.ySpeed;
}

DrawParticleWater.prototype.drawDot = function(x,y)
{
    ellipse(x,y,this.dotSize,this.dotSize);
}

DrawParticleWater.prototype.distacne = function(x1,y1,x2,y2)
{
    var x = Math.abs(x2 - x1);
    var y = Math.abs(y2 - y1);
    var distance = Math.sqrt(x*x+y*y);
    return distance;
}


function backgrounColorWithAlpha(alpha)  {

  return color(137,190,223,alpha);

}
