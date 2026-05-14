const hero = document.querySelector('.hero-section');
const mountainBack = document.querySelector('.layer-back');
const mountainMiddle = document.querySelector('.layer-middle');
const mountainFront = document.querySelector('.layer-front');
const orbit = document.querySelector('.light-orbit');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const height = window.innerHeight;
  const ratio = Math.min(scrollY / height, 1);

  if (mountainBack && mountainMiddle && mountainFront && orbit) {
    mountainBack.style.transform = `translate3d(0, ${ratio * 18}px, -80px) scale(1.05)`;
    mountainMiddle.style.transform = `translate3d(0, ${ratio * 12}px, -30px) scale(1.02)`;
    mountainFront.style.transform = `translate3d(0, ${ratio * 6}px, 0px) scale(1)`;
    orbit.style.transform = `translate3d(${ratio * -14}px, ${ratio * 10}px, 0) rotate(${ratio * 18}deg)`;
  }

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offset = rect.top / window.innerHeight;
    section.style.setProperty('--section-light', `${Math.max(0, 1 - Math.abs(offset))}`);
  });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const transform = `perspective(1000px) rotateY(${x * 0.03}deg) rotateX(${y * -0.03}deg)`;
    card.style.transform = `${transform} translateY(-10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Cảm ơn bạn đã gửi liên hệ! Thành sẽ phản hồi sớm nhất.');
    contactForm.reset();
  });
}
