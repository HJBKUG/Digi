const logo = document.querySelector('.logo-3d');
const hero = document.querySelector('.hero-section');

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const maxTilt = 50;
  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;

  const rotateY = maxTilt * percentX;
  const rotateX = -maxTilt * percentY;

  logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

hero.addEventListener('mouseleave', () => {
  logo.style.transform = `rotateX(0deg) rotateY(0deg)`;
});
