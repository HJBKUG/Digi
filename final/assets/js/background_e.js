const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let nodes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createNodes(count) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3
    });
  }
}
createNodes(100);

function drawNodes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    a.x += a.dx;
    a.y += a.dy;

    // Bounce off edges
    if (a.x <= 0 || a.x >= canvas.width) a.dx *= -1;
    if (a.y <= 0 || a.y >= canvas.height) a.dy *= -1;

    // Draw node
    ctx.beginPath();
    ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff";
    ctx.fill();

    // Draw lines between close nodes
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(0,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawNodes);
}
drawNodes();
