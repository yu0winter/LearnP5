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

    for (var h = 0; h<this.seaResolution;h++)
    {
        for(var w = 0;w<this.seaResolution;w++)
        {
            this.positionArrXpos[h*seaResolution+w] = 0;
            this.positionArrYpos[h*seaResolution+w] = 0;
        }
    }

    this.dotSize = 3;//元素大小
    this.perlinNoiseAnimX = 0.02;//噪声取值时间轴
    this.perlinNoiseAnimY = 0.02;
    this.xSpeed = 0.01;    //更新噪声取值时间轴 调节数值克控制速度
    this.ySpeed = 0.01;
}

DrawParticleWater.prototype.update = function()
{
    for (var h = 0; h<this.seaResolution;h++)
    {
        for(var w = 0;w<this.seaResolution;w++)
        {
            var xPos = noise( -w * this.noiseScale + this.perlinNoiseAnimY,-h * this.noiseScale + this.perlinNoiseAnimX);
            var dotX  = w * this.widthNormalize+h%2*this.widthNormalize*0.5+xPos * this.heightScale- 160;
            var doty = h * this.heightNormalize + xPos * this.heightScale*0.5-80;

            if(dotX > this.positionArrXpos[h*this.seaResolution+w])
            this.drawDot(dotX, doty);

            this.positionArrXpos[h*this.seaResolution+w] = dotX;
            this.positionArrYpos[h*this.seaResolution+w] = doty;
        }
    }


    this.perlinNoiseAnimX += this.xSpeed;
    this.perlinNoiseAnimY += this.ySpeed;
}


DrawParticleWater.prototype.drawDot = function(x,y)
{

    if (x < - this.dotSize) {
        x = width+this.dotSize;
    }
    if (x > width + this.dotSize) {
        x = -this.dotSize;
    }
    if (y < -this.dotSize) {
        y = height+this.dotSize;
    }
    if (y > height+this.dotSize) {
        y = -this.dotSize;
    }
    ellipse(x,y,this.dotSize,this.dotSize);
}

DrawParticleWater.prototype.distacne = function(x1,y1,x2,y2)
{
    var x = Math.abs(x2 - x1);
    var y = Math.abs(y2 - y1);
    var distance = Math.sqrt(x*x+y*y);
    return distance;
}


// 会有一抖一抖的效果。原因this.widthNormalize 改变了。导致元素都向左上角抖动一下。
DrawParticleWater.prototype.setSeaResolution = function(seaResolution) {


    if (seaResolution > this.seaResolution) {
        var bigOne = seaResolution;
        var smallOne = this.seaResolution;

        for (var h = 0; h<seaResolution;h++)
        {


            for(var w = 0;w<this.seaResolution;w++)
            {

                if (h >= smallOne || w >= smallOne) {
                    this.positionArrXpos[h*seaResolution+w] = h*seaResolution+w;//random(width);
                    this.positionArrYpos[h*seaResolution+w] = h*seaResolution+w;//random(height);
                }
            }
        }
        this.seaResolution = seaResolution;

    }

    this.seaResolution = seaResolution;//波纹分辨率

    this.widthNormalize = width / seaResolution;//width canvas.width
    this.heightNormalize = height / seaResolution;////height canvas.height
}
