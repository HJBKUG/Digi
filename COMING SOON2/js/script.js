/*==========================================
DIGILOGOUS 12.0
==========================================*/

/*==========================================
SMOOTH REVEAL
==========================================*/

const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:.12,
    rootMargin:"0px 0px -50px 0px"
});

document.querySelectorAll("section,.info-block").forEach(function(el){
    el.classList.add("hidden");
    observer.observe(el);
});


/*==========================================
PARTICLES WITH CONNECTIONS
==========================================*/

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

const particles = [];
const total = 120;
const connectionDistance = 150;

function initParticles(){
    particles.length = 0;
    for(let i=0;i<total;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            r:Math.random()*2.5+0.5,
            dx:(Math.random()-.5)*0.4,
            dy:(Math.random()-.5)*0.4,
            alpha:Math.random()*.5+.3,
            pulseSpeed:Math.random()*.02+.005,
            pulseOffset:Math.random()*Math.PI*2
        });
    }
}

initParticles();

let time = 0;

function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    time += 0.016;

    particles.forEach(function(p,i){
        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0) p.x = canvas.width;
        if(p.x > canvas.width) p.x = 0;
        if(p.y < 0) p.y = canvas.height;
        if(p.y > canvas.height) p.y = 0;

        const pulseAlpha = p.alpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = "rgba(255,255,255," + Math.max(0.1, pulseAlpha) + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r * 2,0,Math.PI*2);
        ctx.fillStyle = "rgba(194,60,214," + (pulseAlpha * 0.15) + ")";
        ctx.fill();
    });

    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < connectionDistance){
                const opacity = (1 - dist/connectionDistance) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = "rgba(194,60,214," + opacity + ")";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(drawParticles);
}

drawParticles();


/*==========================================
SHOOTING STARS
==========================================*/

const starsCanvas = document.getElementById("shooting-stars");
const starsCtx = starsCanvas.getContext("2d");

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

window.addEventListener("resize",function(){
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
});

const shootingStars = [];
const maxStars = 4;

function createShootingStar(){
    if(shootingStars.length >= maxStars) return;

    const startX = Math.random() * starsCanvas.width * 0.8;
    const startY = Math.random() * starsCanvas.height * 0.4;

    const colors = [
        {r:255,g:255,b:255},
        {r:194,g:60,b:214},
        {r:233,g:90,b:209},
        {r:224,g:138,b:82}
    ];

    const color = colors[Math.floor(Math.random()*colors.length)];

    shootingStars.push({
        x:startX,
        y:startY,
        length:Math.random()*100+60,
        speed:Math.random()*10+8,
        angle:Math.PI/4 + (Math.random()-.5)*.6,
        opacity:1,
        decay:Math.random()*.012+.006,
        color:color,
        thickness:Math.random()*1.5+1
    });
}

function drawShootingStars(){
    starsCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);

    for(let i=shootingStars.length-1;i>=0;i--){
        const star = shootingStars[i];

        const endX = star.x - Math.cos(star.angle)*star.length;
        const endY = star.y - Math.sin(star.angle)*star.length;

        const gradient = starsCtx.createLinearGradient(star.x,star.y,endX,endY);
        gradient.addColorStop(0,"rgba("+star.color.r+","+star.color.g+","+star.color.b+","+star.opacity+")");
        gradient.addColorStop(.2,"rgba("+star.color.r+","+star.color.g+","+star.color.b+","+(star.opacity*.7)+")");
        gradient.addColorStop(1,"rgba("+star.color.r+","+star.color.g+","+star.color.b+",0)");

        starsCtx.beginPath();
        starsCtx.moveTo(star.x,star.y);
        starsCtx.lineTo(endX,endY);
        starsCtx.strokeStyle=gradient;
        starsCtx.lineWidth=star.thickness;
        starsCtx.lineCap="round";
        starsCtx.stroke();

        starsCtx.beginPath();
        starsCtx.arc(star.x,star.y,star.thickness*2,0,Math.PI*2);
        starsCtx.fillStyle="rgba(255,255,255,"+(star.opacity*.8)+")";
        starsCtx.fill();

        star.x += Math.cos(star.angle)*star.speed;
        star.y += Math.sin(star.angle)*star.speed;
        star.opacity -= star.decay;

        if(star.opacity <= 0 || star.x > starsCanvas.width + 100 || star.y > starsCanvas.height + 100){
            shootingStars.splice(i,1);
        }
    }

    requestAnimationFrame(drawShootingStars);
}

drawShootingStars();

function scheduleShootingStar(){
    const delay = Math.random()*3000 + 1500;
    setTimeout(function(){
        createShootingStar();
        scheduleShootingStar();
    }, delay);
}

scheduleShootingStar();
setTimeout(createShootingStar, 800);


/*==========================================
MOUSE SPOTLIGHT
==========================================*/

const spotlight = document.querySelector(".mouse-spotlight");

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;
let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove",function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.documentElement.style.setProperty("--x",e.clientX+"px");
    document.documentElement.style.setProperty("--y",e.clientY+"px");
});

function animateSpotlight(){
    currentX += (mouseX - currentX)*.08;
    currentY += (mouseY - currentY)*.08;

    if(spotlight){
        spotlight.style.left = currentX+"px";
        spotlight.style.top = currentY+"px";
    }

    requestAnimationFrame(animateSpotlight);
}

animateSpotlight();


/*==========================================
CUSTOM CURSOR
==========================================*/

const cursorDot = document.createElement("div");
cursorDot.className = "cursor-dot";
document.body.appendChild(cursorDot);

const cursorRing = document.createElement("div");
cursorRing.className = "cursor-ring";
document.body.appendChild(cursorRing);

let cursorX = 0;
let cursorY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove",function(e){
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorDot.style.left = cursorX+"px";
    cursorDot.style.top = cursorY+"px";
});

function animateCursor(){
    ringX += (cursorX - ringX)*.12;
    ringY += (cursorY - ringY)*.12;
    cursorRing.style.left = ringX+"px";
    cursorRing.style.top = ringY+"px";
    requestAnimationFrame(animateCursor);
}

animateCursor();

const interactiveElements = document.querySelectorAll("a,button,.btn,.info-block");

interactiveElements.forEach(function(el){
    el.addEventListener("mouseenter",function(){
        cursorDot.style.width = "16px";
        cursorDot.style.height = "16px";
        cursorDot.style.background = "#c23cd6";
        cursorRing.style.width = "60px";
        cursorRing.style.height = "60px";
        cursorRing.style.borderColor = "rgba(194,60,214,.6)";
        cursorRing.style.background = "rgba(194,60,214,.1)";
    });

    el.addEventListener("mouseleave",function(){
        cursorDot.style.width = "8px";
        cursorDot.style.height = "8px";
        cursorDot.style.background = "#c23cd6";
        cursorRing.style.width = "40px";
        cursorRing.style.height = "40px";
        cursorRing.style.borderColor = "rgba(194,60,214,.5)";
        cursorRing.style.background = "transparent";
    });
});


/*==========================================
PARALLAX
==========================================*/

window.addEventListener("mousemove",function(e){
    const x = e.clientX/window.innerWidth;
    const y = e.clientY/window.innerHeight;
    document.body.style.backgroundPosition = x*20+"px "+y*20+"px";
});


/*==========================================
MICRO-ANIMATIONS ON SCROLL
==========================================*/

const microAnimateElements = document.querySelectorAll(".eyebrow,.subtitle-eyebrow,.logo-stage,.wordmark,.wordmark-version,.event-date,.coming-soon,.cta-row,.section-title span,.section-title h2");

const microObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.style.animation = "fadeInUp .8s ease forwards";
        }
    });
},{
    threshold:.2
});

microAnimateElements.forEach(function(el){
    el.style.opacity = "0";
    microObserver.observe(el);
});


/*==========================================
STAGGER ANIMATION FOR SECTIONS
==========================================*/

const sections = document.querySelectorAll("section");

sections.forEach(function(el,i){
    el.style.opacity = "0";
    el.style.animation = "fadeInUp .8s ease forwards";
    el.style.animationDelay = (i*.15)+"s";
});


/*==========================================
SMOOTH SCROLL FOR ANCHOR LINKS
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener("click",function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });
        }
    });
});


/*==========================================
TOUCH DEVICE SUPPORT
==================================*/

if('ontouchstart' in window){
    document.body.style.cursor = "auto";
    const cursorElements = document.querySelectorAll(".cursor-dot,.cursor-ring,.mouse-spotlight");
    cursorElements.forEach(function(el){
        el.style.display = "none";
    });

    const touchBlocks = document.querySelectorAll(".info-block");
    touchBlocks.forEach(function(block){
        block.addEventListener("touchstart",function(){
            block.classList.add("touch-active");
        });
        block.addEventListener("touchend",function(){
            setTimeout(function(){
                block.classList.remove("touch-active");
            }, 300);
        });
    });
}
