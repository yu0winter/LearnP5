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

    this.dotSize = 2;//元素大小
    this.perlinNoiseAnimX = 0.01;//噪声取值时间轴
    this.perlinNoiseAnimY = 0.01;
    this.xSpeed = 0.01;    //更新噪声取值时间轴 调节数值克控制速度
    this.ySpeed = 0.01;
}

DrawParticleWater.prototype.update = function()
{
    for (var h = -this.seaResolution/2; h<this.seaResolution*3/2;h++)
    {
        for(var w = -this.seaResolution/2;w<this.seaResolution*3/2;w++)
        {
            var xPos = noise(h * this.noiseScale + this.perlinNoiseAnimX, w * this.noiseScale + this.perlinNoiseAnimY);
            var yPos = noise(-h * this.noiseScale + this.perlinNoiseAnimX, -w * this.noiseScale + this.perlinNoiseAnimY);

            var dotX = w * this.widthNormalize-this.heightScale/2 + xPos * this.heightScale;
            var doty = h * this.heightNormalize-this.heightScale/2 + yPos * this.heightScale;
            this.drawDot(dotX,doty);
        }
    }

    this.perlinNoiseAnimX += this.xSpeed;
    this.perlinNoiseAnimY += this.ySpeed;
}

DrawParticleWater.prototype.drawDot = function(x,y)
{
    var alpha = floor((x+y)/3);
    noStroke();
    fill(255,alpha);
    ellipse(x,y,this.dotSize,this.dotSize);
    fill(0);
    textSize(5);
    // text(alpha,x,y);
}
