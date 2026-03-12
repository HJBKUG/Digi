/* =========================
   PARTICLES CANVAS
========================= */
const particleCanvas = document.getElementById("particleCanvas");
const pctx = particleCanvas.getContext("2d");

function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = document.body.scrollHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Generate particles
let particles = [];
for (let i = 0; i < 2080; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * document.body.scrollHeight,
        size: Math.random() * 2,
        speed: Math.random() * 0.4
    });
}

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
        pctx.fillStyle = "rgba(0,255,255,0.8)";
        pctx.fill();
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

/* =========================
   AURORA WAVE CANVAS
========================= */
const auroraCanvas = document.getElementById("auroraCanvas");
const ctx = auroraCanvas.getContext("2d");

auroraCanvas.width = window.innerWidth;
auroraCanvas.height = window.innerHeight;

let t = 0;

function drawAurora() {
    ctx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);

    const bandHeight = 1200;
    const bandY = auroraCanvas.height / 2 - 600;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, bandY, auroraCanvas.width, bandHeight);
    ctx.clip();

    for (let i = 0; i < 12; i++) {
        let gradient = ctx.createLinearGradient(0, bandY, auroraCanvas.width, bandY + bandHeight);
        gradient.addColorStop(0, "rgba(0,255,255,0)");
        gradient.addColorStop(0.5, "rgba(4,104,104,0.35)");
        gradient.addColorStop(1, "rgba(0,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 120;
        ctx.beginPath();

        for (let x = 0; x < auroraCanvas.width; x++) {
            let y =
                bandY + bandHeight / 2 +
                Math.sin(x * 0.002 + t + i) * 90 +
                Math.cos(x * 0.0015 + t + i) * 200;
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    ctx.restore();
    t += 0.01;
    requestAnimationFrame(drawAurora);
}

drawAurora();

/* =========================
   TECH CHAMPIONS GALLERY INTERACTION
========================= */
// Select all champion images
// Function to initialize a lightbox gallery for any row
function initGallery(rowSelector) {
    const images = document.querySelectorAll(rowSelector);
    let currentIndex = 0;

    // Create buttons if not already
    let prevBtn = document.getElementById("prevBtn") || document.createElement("button");
    prevBtn.id = "prevBtn"; prevBtn.className = "gallery-nav"; prevBtn.innerHTML = "&#10094;";
    document.body.appendChild(prevBtn);

    let nextBtn = document.getElementById("nextBtn") || document.createElement("button");
    nextBtn.id = "nextBtn"; nextBtn.className = "gallery-nav"; nextBtn.innerHTML = "&#10095;";
    document.body.appendChild(nextBtn);

    let closeBtn = document.getElementById("closeBtn") || document.createElement("button");
    closeBtn.id = "closeBtn"; closeBtn.innerHTML = "&#10006;";
    document.body.appendChild(closeBtn);

    function openLightbox(index) {
        currentIndex = index;
        images.forEach((img, i) => {
            img.classList.remove("lightbox-active", "lightbox-inactive");
            if (i === index) {
                img.classList.add("lightbox-active");
            } else {
                img.classList.add("lightbox-inactive");
            }
        });
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        closeBtn.style.display = "block";
    }

    function closeLightbox() {
        images.forEach(img => {
            img.classList.remove("lightbox-active", "lightbox-inactive");
        });
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        closeBtn.style.display = "none";
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    images.forEach((img, i) => {
        img.addEventListener("click", () => openLightbox(i));
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);
}

// Initialize galleries
initGallery(".guests-row img");
initGallery(".moments-row img");
initGallery(".champions-row img"); // keep your champions too


/* =========================
   TEAM CARD BORDER ANIMATION
========================= */

const move1 = document.querySelectorAll(".nameMove1");
const move2 = document.querySelectorAll(".nameMove2");

let offset = 0;

function animateBorder(){

offset += 0.1;

if(offset > 100){
offset = 0;
}

move1.forEach(el=>{
el.setAttribute("startOffset", offset + "%");
});

move2.forEach(el=>{
el.setAttribute("startOffset", (offset + 50) + "%");
});

requestAnimationFrame(animateBorder);

}

animateBorder();

/* =========================
    Testimonial section
========================= */

let cards = document.querySelectorAll(".testimonial-card");
let index = 0;

function updateCards(){

cards.forEach(card=>{
card.classList.remove("active","prev","next");
});

cards[index].classList.add("active");

let prev = index - 1;
let next = index + 1;

if(prev < 0){
prev = cards.length - 1;
}

if(next >= cards.length){
next = 0;
}

cards[prev].classList.add("prev");
cards[next].classList.add("next");

}

document.querySelector(".next-btn").onclick = function(){

index++;

if(index >= cards.length){
index = 0;
}

updateCards();

};

document.querySelector(".prev-btn").onclick = function(){

index--;

if(index < 0){
index = cards.length - 1;
}

updateCards();

};

updateCards();  
