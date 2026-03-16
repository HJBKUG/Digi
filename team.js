/* =========================
   PARTICLE CANVAS
========================= */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const particleCount = 80;

class Particle {

constructor(){

this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height;

this.size = Math.random() * 3 + 1;

this.speedX = (Math.random() - 0.5) * 1;
this.speedY = (Math.random() - 0.5) * 1;

}

update(){

this.x += this.speedX;
this.y += this.speedY;

if(this.x > canvas.width || this.x < 0){
this.speedX *= -1;
}

if(this.y > canvas.height || this.y < 0){
this.speedY *= -1;

}

}

draw(){

ctx.fillStyle = "rgba(0,255,255,0.7)";
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();

}

}

function init(){

particles = [];

for(let i=0;i<particleCount;i++){

particles.push(new Particle());

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p => {

p.update();
p.draw();

});

requestAnimationFrame(animate);

}

init();
animate();

window.addEventListener("resize",function(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

init();

});

/* =========================
   NAME BORDER ANIMATION
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
