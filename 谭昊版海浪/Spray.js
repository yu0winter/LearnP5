var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 400;
ctx.strokeStyle = "hsla(244,60%,60%,0.9)";
rct();

function rct() {
    var a, b, c, d, e, r, max, p, p2, xt, yt, tt, tim;
    var h1, h2, h3, h4, r1, r2, r3, r4;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    tim = new Date().getTime() / 330;
    r = tim / 19;
    p = [];
    for (a = 0; a < 4; a++) {
        x = Math.cos(r) * 110;
        y = Math.sin(r) * 110;
        p.push([canvas.width / 2 + x, canvas.height / 2 + y]);
        r += Math.PI * 2 / 4;
    }
    p = [
        [p[0], p[1]],
        [p[3], p[2]]
    ];

    c = 2;
    for (a = 0; a < 7; a++) {
        b = 1 << a;
        c += b;
        xt = [];
        yt = [];
        tt = [];
        for (d = 0; d < b + 1; d++) {
            xt[d] = [];
            yt[d] = [];
            tt[d] = [];
        }
        for (d = 0; d < b + 1; d++) {
            for (e = 0; e < b; e++) {
                h1 = p[d][e];
                h2 = p[d][e + 1];
                r1 = 0.5 + Math.sin(tim / 3) * 0.2;
                r2 = 1 - r1;
                x = h1[0] * r1 + h2[0] * r2;
                y = h1[1] * r1 + h2[1] * r2;
                tim += 3;
                xt[d][e] = [x, y];
                h1 = p[e][d];
                h2 = p[e + 1][d];
                r1 = 0.5 + Math.sin(tim / 3) * 0.2;
                r2 = 1 - r1;
                x = h1[0] * r1 + h2[0] * r2;
                y = h1[1] * r1 + h2[1] * r2;
                tim += 3;
                yt[e][d] = [x, y];
            }
        }

        for (d = 0; d < b; d++) {
            for (e = 0; e < b; e++) {
                h1 = p[d][e];
                h2 = p[d][e + 1];
                h3 = p[d + 1][e];
                h4 = p[d + 1][e + 1];
                r1 = 0.25 + Math.sin(-tim / 5) * 0.04;
                r2 = 0.5 - r1;
                tim += 3;
                r3 = 0.25 + Math.sin(-tim / 7) * 0.04;
                r4 = 0.5 - r3;
                x = h1[0] * r1 + h2[0] * r3 + h3[0] * r4 + h4[0] * r2;
                y = h1[1] * r1 + h2[1] * r3 + h3[1] * r4 + h4[1] * r2;
                tt[d][e] = [x, y];
            }
        }

        p2 = [];
        for (d = 0; d < c; d++) p2[d] = [];
        for (d = 0; d < b + 1; d++)
            for (e = 0; e < b + 1; e++) p2[d * 2][e * 2] = p[d][e];
        for (d = 0; d < b + 1; d++)
            for (e = 0; e < b; e++) p2[d * 2][e * 2 + 1] = xt[d][e];
        for (d = 0; d < b; d++)
            for (e = 0; e < b + 1; e++) p2[d * 2 + 1][e * 2] = yt[d][e];
        for (d = 0; d < b; d++)
            for (e = 0; e < b; e++) p2[d * 2 + 1][e * 2 + 1] = tt[d][e];
        p = p2;
    }

    ctx.beginPath();
    b = p.length;
    for (a = 0; a < b; a++) {
      for (c = 0; c < b; c++) ctx[(c ? "line" : "move") + "To"](p[a][c][0], p[a][c][1]);
 }

  //for (a = 0; a < b; a++) {
    //    for (c = 0; c < b; c++) ctx[(c ? "line" : "move") + "To"](p[c][a][0], p[c][a][1]);
//  }
    ctx.stroke();
    requestAnimationFrame(rct);
}