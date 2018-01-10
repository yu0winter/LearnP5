var pdf;

function setup() {
  
    // 1.要导出普通 PDF 文件
    // createCanvas(600, 200);
    // pdf = createPDF();
    // pdf.beginRecord();
    
    // 2.需要导出矢量 PDF 文件
    // If we use SVG Renderer, then the PDF generated will be vector
    // Note that to use SVG Renderer, you must include p5.svg library
    createCanvas(600, 200, SVG);
    pdf = createPDF();
    pdf.beginRecord();
}

function draw() {
    background(255);
    fill('#ED225D');
    textSize(100);
    textAlign(CENTER);
    text(frameCount, width * 0.5, height * 0.5);
}

// 点击鼠标，触发保存保存 PDF 事件
function mousePressed() {
    pdf.save(); 
}