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
            pctx.fillStyle = "rgba(37, 99, 235, 0.85)";
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

    const hero = document.querySelector(".hero");

    function resizeAuroraCanvas() {
        auroraCanvas.width = window.innerWidth;
        auroraCanvas.height = window.innerHeight;
    }

    resizeAuroraCanvas();
    window.addEventListener("resize", resizeAuroraCanvas);

    let t = 0;

    function drawAurora() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
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

/* =========================
   TECH CHAMPIONS GALLERY INTERACTION
   ========================= */

const images = document.querySelectorAll(".champions-section img");

if (images.length > 0) {
    const overlay = document.getElementById("gp-overlay");
    const imgBox = document.getElementById("gp-img");

    const btnClose = document.getElementById("gp-close");
    const btnPrev = document.getElementById("gp-prev");
    const btnNext = document.getElementById("gp-next");

    let index = 0;

    // OPEN
    images.forEach((img, i) => {
        img.addEventListener("click", () => {
            index = i;
            openGallery();
        });
    });

    function openGallery() {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        showImage();
    }

    function showImage() {
        imgBox.src = images[index].src;
    }

    // CLOSE
    function closeGallery() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    btnClose.addEventListener("click", closeGallery);

    // NEXT
    function nextImage() {
        index = (index + 1) % images.length;
        showImage();
    }

    // PREV
    function prevImage() {
        index = (index - 1 + images.length) % images.length;
        showImage();
    }

    btnNext.addEventListener("click", nextImage);
    btnPrev.addEventListener("click", prevImage);

    // KEYBOARD
    document.addEventListener("keydown", (e) => {
        if (!overlay.classList.contains("active")) return;

        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });

    // SWIPE (mobile)
    let startX = 0;

    overlay.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    overlay.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) nextImage();
        if (endX - startX > 50) prevImage();
    });
}


/* =========================
   TEAM CARD BORDER ANIMATION
   ========================= */

const move1 = document.querySelectorAll(".nameMove1");
const move2 = document.querySelectorAll(".nameMove2");

let offset = 0;

function animateBorder() {

    offset += 0.1;

    if (offset > 100) {
        offset = 0;
    }

    move1.forEach(el => {
        el.setAttribute("startOffset", offset + "%");
    });

    move2.forEach(el => {
        el.setAttribute("startOffset", (offset + 50) + "%");
    });

    requestAnimationFrame(animateBorder);
}

animateBorder();

const track = document.querySelector(".testimonial-track");

if (track) {
    track.style.transform = "translate3d(0,0,0)";
}

/* =========================
   TEAM CARD INTERSECTION OBSERVER
   ========================= */
const teamObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".team-card").forEach(card => {
    teamObserver.observe(card);
});
