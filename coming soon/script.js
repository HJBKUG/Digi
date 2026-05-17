/* =========================
   PARTICLES CANVAS
   ========================= */
const particleCanvas = document.getElementById("particleCanvas");
if (particleCanvas) {
    const pctx = particleCanvas.getContext("2d");

    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = document.body.scrollHeight;
        // Regenerate particles to cover new dimensions
        particles = [];
        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.4
            });
        }
    }

    // Generate particles
    let particles = [];
    resizeCanvas();

    // Draw particles
    function drawParticles() {
        pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(p => {
            p.y -= p.speed;

            if (p.y < 0) {
                p.y = particleCanvas.height;
            }

            pctx.beginPath();
            pctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pctx.fillStyle = "rgb(0, 255, 255)";
            pctx.fill();
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}

/* =========================
   AURORA WAVE CANVAS
   ========================= */
const auroraCanvas = document.getElementById("auroraCanvas");
if (auroraCanvas) {
    const ctx = auroraCanvas.getContext("2d");

    function resizeAuroraCanvas() {
        auroraCanvas.width = window.innerWidth;
        auroraCanvas.height = window.innerHeight;
    }

    resizeAuroraCanvas();
    window.addEventListener("resize", resizeAuroraCanvas);

    let t = 0;

    function drawAurora() {
        ctx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);

        const bandHeight = 1200;
        const bandY = auroraCanvas.height / 2 - 600;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, bandY, auroraCanvas.width, bandHeight);
        ctx.clip();

        for (let i = 0; i < 8; i++) {
            let gradient = ctx.createLinearGradient(0, bandY, auroraCanvas.width, bandY + bandHeight);
            gradient.addColorStop(0, "rgba(0,255,255,0)");
            gradient.addColorStop(0.5, "rgba(4, 104, 104, 0.13)");
            gradient.addColorStop(1, "rgba(0,255,255,0)");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 60;
            ctx.beginPath();

            for (let x = 0; x < auroraCanvas.width; x++) {
                let y =
                    bandY + bandHeight / 2 +
                    Math.sin(x * 0.002 + t + i) * 50 +
                    Math.cos(x * 0.0015 + t + i) * 150;
                ctx.lineTo(x, y);
            }

            ctx.stroke();
        }

        ctx.restore();
        t += 0.01;
        requestAnimationFrame(drawAurora);
    }

    drawAurora();
}