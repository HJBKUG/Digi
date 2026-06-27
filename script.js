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

    const hero = document.querySelector(".hero");

    function resizeAuroraCanvas() {

        auroraCanvas.width = hero.offsetWidth;

        auroraCanvas.height = hero.offsetHeight;

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

/* =========================
   TECH CHAMPIONS GALLERY INTERACTION
   ========================= */

// Global state for lightbox
let currentGalleryImages = null;
let currentGalleryIndex = 0;

function createGalleryControls() {
    if (document.getElementById("gallery-controls")) return;

    const controls = document.createElement("div");
    controls.id = "gallery-controls";
    controls.innerHTML = `
        <button id="prevBtn" class="gallery-nav">&#10094;</button>
        <button id="closeBtn">&#10006;</button>
        <button id="nextBtn" class="gallery-nav">&#10095;</button>
    `;
    document.body.appendChild(controls);
}

function initGallery(rowSelector) {
    const images = document.querySelectorAll(rowSelector);
    if (!images.length) return;

    createGalleryControls();

    images.forEach((img, i) => {
        img.addEventListener("click", () => {
            currentGalleryImages = images;
            currentGalleryIndex = i;

            document.querySelectorAll(".lightbox-active, .lightbox-inactive").forEach(el => {
                el.classList.remove("lightbox-active", "lightbox-inactive");
            });

            images.forEach((img2, j) => {
                img2.classList.add(j === i ? "lightbox-active" : "lightbox-inactive");
            });

            // Position close button near the active image
            const activeImg = images[i];
            const rect = activeImg.getBoundingClientRect();
            const closeBtn = document.getElementById("closeBtn");
            if (closeBtn) {
                closeBtn.style.left = (rect.right - 50) + "px";
                closeBtn.style.top = (rect.top + 10) + "px";
                closeBtn.style.right = "auto";
            }

            document.getElementById("gallery-controls").style.display = "flex";
        });
    });
}

// Initialize galleries
initGallery(".guests-row img");
initGallery(".moments-row img");
initGallery(".champions-row img");

// Global control handlers
document.getElementById("closeBtn")?.addEventListener("click", () => {
    document.querySelectorAll(".lightbox-active, .lightbox-inactive").forEach(img => {
        img.classList.remove("lightbox-active", "lightbox-inactive");
    });
    document.getElementById("gallery-controls").style.display = "none";
    currentGalleryImages = null;
});

document.getElementById("nextBtn")?.addEventListener("click", () => {
    if (!currentGalleryImages) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    currentGalleryImages.forEach((img, i) => {
        img.classList.remove("lightbox-active", "lightbox-inactive");
        img.classList.add(i === currentGalleryIndex ? "lightbox-active" : "lightbox-inactive");
    });
});

document.getElementById("prevBtn")?.addEventListener("click", () => {
    if (!currentGalleryImages) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    currentGalleryImages.forEach((img, i) => {
        img.classList.remove("lightbox-active", "lightbox-inactive");
        img.classList.add(i === currentGalleryIndex ? "lightbox-active" : "lightbox-inactive");
    });
    // Update close button position
    const activeImg = currentGalleryImages[currentGalleryIndex];
    const rect = activeImg.getBoundingClientRect();
    const closeBtn = document.getElementById("closeBtn");
    if (closeBtn) {
        closeBtn.style.left = (rect.right - 50) + "px";
        closeBtn.style.top = (rect.top + 10) + "px";
    }
});


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