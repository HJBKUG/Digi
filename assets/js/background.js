const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

const textCanvas = document.getElementById('textCanvas');
const textCtx = textCanvas.getContext('2d');

let W = window.innerWidth;
let H = window.innerHeight;
bgCanvas.width = textCanvas.width = W;
bgCanvas.height = textCanvas.height = H;

class Digit {
  constructor() {
    this.reset(true);
  }

  reset() {
    this.char = Math.random() < 0.5 ? '0' : '1';
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = 14 + Math.random() * 16;
    this.alpha = 1;
    this.speed = 1 + Math.random() * 2;
  }

  update() {
    this.x += this.speed;
    this.alpha -= 0.003;
    if (this.alpha <= 0 || this.x > W + 50) this.reset();
  }

  draw(ctx) {
    ctx.font = `${this.size}px monospace`;
    ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha.toFixed(2)})`;
    ctx.fillText(this.char, this.x, this.y);
  }
}

const digits = [];
const maxDigits = 100;
for (let i = 0; i < maxDigits; i++) {
  digits.push(new Digit(true));
}

function animate() {
  bgCtx.fillStyle = 'rgba(0, 11, 43, 0.15)';
  bgCtx.fillRect(0, 0, W, H);
  digits.forEach(d => {
    d.update();
    d.draw(bgCtx);
  });
  requestAnimationFrame(animate);
}

function drawText() {
  textCtx.clearRect(0, 0, W, H);
}

animate();
drawText();

window.addEventListener('resize', () => {
  W = window.innerWidth;
  H = window.innerHeight;
  bgCanvas.width = textCanvas.width = W;
  bgCanvas.height = textCanvas.height = H;
  drawText();
});
