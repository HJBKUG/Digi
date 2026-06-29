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

        ctx.fillStyle = `rgba(255,107,181,${particle.opacity})`;

        ctx.shadowBlur = 18;
        ctx.shadowColor = "#8b5cf6";

        ctx.fill();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".event-card").forEach(card => {

    observer.observe(card);

});
document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

    link.addEventListener("click", () => {

        const navbar = document.querySelector(".navbar-collapse");

        if (navbar.classList.contains("show")) {

            bootstrap.Collapse.getOrCreateInstance(navbar).hide();

        }

    });

});
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal-toggle").forEach(box => {
            box.checked = false;
        });

        updateScrollLock(); // ⭐ important fix
    }
});
const modals = document.querySelectorAll(".modal-toggle");

modals.forEach(box => {
    box.addEventListener("change", () => {
        updateScrollLock();
    });
});
document.querySelectorAll(".event-btn").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left = e.offsetX + "px";

        ripple.style.top = e.offsetY + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});
