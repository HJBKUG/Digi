const typingText = "Saturday, August 3, 2024";
const subHeading = document.querySelector(".sub-heading");
let i = 0;

function typeText() {
  if (i <= typingText.length) {
    subHeading.innerHTML = typingText.substring(0, i) + '<span class="cursor">|</span>';
    i++;
    setTimeout(typeText, 100);
  }
}

window.addEventListener("load", typeText);
