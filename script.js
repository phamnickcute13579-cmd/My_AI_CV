const sections = document.querySelectorAll('.section.reveal');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionAnchors = Array.from(document.querySelectorAll('section[id]'));
const visualStage = document.querySelector('.visual-stage');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((section) => revealObserver.observe(section));

function updateNavHighlight() {
  const scrollY = window.scrollY;
  sectionAnchors.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`.nav-links a[href='#${section.id}']`);
    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

function handleScrollEffects() {
  const scrollY = window.scrollY;
  const height = window.innerHeight;
  const ratio = Math.min(scrollY / height, 1);

  if (visualStage) {
    const tiltX = ratio * -10;
    const tiltY = ratio * 6;
    visualStage.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }

  updateNavHighlight();
}

window.addEventListener('scroll', () => {
  window.requestAnimationFrame(handleScrollEffects);
});

projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateY = x * 0.03;
    const rotateX = y * -0.03;

    card.style.transform = `perspective(1000px) translateY(-10px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
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

window.addEventListener('DOMContentLoaded', () => {
  updateNavHighlight();
  if (visualStage) {
    visualStage.addEventListener('mousemove', (event) => {
      const rect = visualStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      visualStage.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 12}deg)`;
    });

    visualStage.addEventListener('mouseleave', () => {
      visualStage.style.transform = '';
    });
  }
});
