const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let particlesArray = [];

const numberOfParticles = 140;

for (let i = 0; i < numberOfParticles; i++) {

    particlesArray.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        radius: Math.random() * 2.5 + 1,

        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,

        opacity: Math.random() * 0.7 + 0.3
    });

}

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(0,255,255,${particle.opacity})`;

        ctx.shadowBlur = 18;
        ctx.shadowColor = "#00f0ff";

        ctx.fill();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();