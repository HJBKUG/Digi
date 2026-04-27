
/* =========================
   NAME BORDER ANIMATION
========================= */

const teamcanvas = document.getElementById("teamcanvas");
const ctx = teamcanvas.getContext("2d");

teamcanvas.width = window.innerWidth;
teamcanvas.height = window.innerHeight;

let t = 0;

let offset = 0;
let animationId = null;

function animateBorder() {
    const move1 = document.querySelectorAll(".nameMove1");
    const move2 = document.querySelectorAll(".nameMove2");

    offset += 0.1;

    if (offset > 100) {
        offset = 0;
    }

    move1.forEach((el) => {
        el.setAttributeNS(null, "startOffset", offset + "%");
    });

    move2.forEach((el) => {
        el.setAttributeNS(null, "startOffset", (offset + 50) + "%");
    });

    animationId = requestAnimationFrame(animateBorder);
}

animateBorder();