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

    this.dotSize = 5;//元素大小
    this.perlinNoiseAnimX = 0.01;//噪声取值时间轴
    this.perlinNoiseAnimY = 0.01;
    this.xSpeed = 0.01;    //更新噪声取值时间轴 调节数值克控制速度
    this.ySpeed = 0.01;
    this.average = 0;
    this.particles = [];

    this.setup = function () {

        for (var h = 0; h<this.seaResolution*(1+1/4);h++)
        {
            for(var w = 0;w<this.seaResolution*(1+1/4);w++)
            {
                var index = h * this.seaResolution*(1+1/4) + w;
                this.particles[index] = new Particle;    
            }
        }
    }
}

DrawParticleWater.prototype.update = function()
{
    // for (var h = -this.seaResolution/4; h<this.seaResolution*(1+1/4);h++)
    for (var h =0; h<this.seaResolution*(1+1/4);h++)
    {
        for(var w = 0;w<this.seaResolution*(1+1/4);w++)
        {
            var xPos = noise(h * this.noiseScale + this.perlinNoiseAnimX, w * this.noiseScale + this.perlinNoiseAnimY);
            var yPos = noise(-h * this.noiseScale + this.perlinNoiseAnimX, -w * this.noiseScale + this.perlinNoiseAnimY);

            var dotX = w * this.widthNormalize-this.heightScale/2 + xPos * this.heightScale;
            var doty = h * this.heightNormalize-this.heightScale/2 + yPos * this.heightScale;
            // this.drawDot(dotX,doty);

            var index = h * this.seaResolution*(1+1/4) + w;
            var particle = this.particles[index];
            particle.update(dotX,doty,floor(dotX+doty));
        }
    }

    this.perlinNoiseAnimX += this.xSpeed;
    this.perlinNoiseAnimY += this.ySpeed;
}


DrawParticleWater.prototype.drawDots = function()
{
    noStroke();

    for (var h =0; h<this.seaResolution*(1+1/4);h++)
    {
        for(var w = 0;w<this.seaResolution*(1+1/4);w++)
        {
            var index = h * this.seaResolution*(1+1/4) + w;
            var particle = this.particles[index];
            if (particle.isUp) {
                var alpha = map(particle.location.z,0,500,0,40);
                fill(255,100);
                ellipse(particle.location.z,particle.location.y,this.dotSize,this.dotSize);
            }
        }
    }
}


function Particle() {

    this.location = createVector(0,0,0);
    this.previous = this.location;

    this.update = function(x,y,z) {
        this.previous.x = this.location.x;
        this.previous.y = this.location.y;
        this.previous.z = this.location.z;

        this.location.x = x;
        this.location.y = y;
        this.location.z = z;
    }

    this.isUp = function () {
        return true;
        return this.location.z > this.previous.z;
    }

}


