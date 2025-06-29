const typingText = "Saturday, August 2, 2025";
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
const cards = document.querySelectorAll('.event-card');
cards.forEach(card => {
  card.addEventListener('mouseover', () => {
    const img = card.querySelector('img');
    img.style.filter = 'brightness(1.1)';
  });
  card.addEventListener('mouseout', () => {
    const img = card.querySelector('img');
    img.style.filter = 'brightness(1)';
  });
});
