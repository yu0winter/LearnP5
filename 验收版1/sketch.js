var fr;
var rate;
var animation1;
var animation2;
var animation3;
function backgrounColorWithAlpha(alpha)  {
  return color(137,190,223,alpha);
}

var cloudSystem;
var mountainSystem;
var water;
function setup() {
  createCanvas(1920,1080);
  background(backgrounColorWithAlpha(255));
  fr = createP('');
  rate = 10; // 每秒刷新的帧数
  frameRate(rate);
  cloudSystem = new CloudSystem();
  mountainSystem = new MountainSystem();
  water = new DrawParticleWater(60,0.08,300);
  // 30 秒拆分成三个部分
  var perSeconds =  10 *rate;
  animation1 = [0,perSeconds *0.2,perSeconds *0.8,perSeconds];
  animation2 = [perSeconds,perSeconds*1.2,perSeconds*1.8,perSeconds*2];
  animation3 = [perSeconds*2,perSeconds*2.2,perSeconds*2.8,perSeconds*3];
  noSmooth();
}


var list = [];
function draw() {

  //fr.html(floor(frameRate()));
  //
  var count = frameCount % (30*rate);
  var alfa = map(mouseX,0,width,0,100);
  fr.html(alfa);
  noStroke();
  fill(backgrounColorWithAlpha(alfa));
  rect(0,0,width,height);
  fill(255);   
  water.update();
  return;

  // 海洋 进场
  // 海洋 展示
  // 海洋 退场
  // 云 进场
  // 云 展示
  // 云 退场
  // 山 进场
  // 山 展示
  // 山 退场

  if (count < animation1[3]) {
    var animation = animation1;
    var alfa;
    if (count < animation[1]) {
      alfa = map(count,animation[0],animation[1],0,255);
    } else if (count < animation[2]) {
      alfa = 255;
    } else {
      alfa = map(count,animation[2],animation[3],255,0);
    }
    noStroke();
    fill(backgrounColorWithAlpha(map(alfa,0,255,255,60)));
    rect(0,0,width,height);
    fill(255,alfa);   
    water.update();
  }
  else if (count < animation2[3]) {
    var animation = animation2;
    var alfa;
    if (count < animation[1]) {
      alfa = map(count,animation[0],animation[1],0,3);
    } else if (count < animation[2]) {
      alfa = 3;
    } else {
      alfa = map(count,animation[2],animation[3],3,0);
    }
    noStroke();
    fill(backgrounColorWithAlpha(255));
    rect(0,0,width,height);
    cloudSystem.draw(alfa);   
  }
  else if (count < animation3[3]){
    var animation = animation3;
    var alfa,alphaOfBg;
    if (count < animation[1]) {
      alfa = map(count,animation[0],animation[1],0,1);
    } else if (count < animation[2]) {
      alfa = 1;
    } else {
      alfa = map(count,animation[2],animation[3],1,0);
    }

    noStroke();
    // 这里可以设置透明度
    fill(backgrounColorWithAlpha(map(alfa,0,1,255,100)));
    rect(0,0,width,height);
    mountainSystem.update(alfa);
    mountainSystem.draw();
  }
  
  
}