'use strict';
window.addEventListener('load', loader);

function loader() {
  // Years of experience
  const years = document.getElementById('yr-exp');
  const start = 2009; // i know it was OCt 2008 but I want to use the word "over" in the intro text, it is just 2 months.
  const current = new Date().getFullYear();
  years.textContent = current - start;

  // GSAP intros
  const TLLOAD = gsap.timeline({
    default: {
      ease: 'power2',
    },
  });

  TLLOAD.from('.ring', {
    left: '-200%',
    autoAlpha: 0,
    duration: 3,
  })
    .from('.hero-img', {
      y: '100',
      autoAlpha: 0,
      duration: 1,
    })
    .from('.intro-text', {
      webkitFilter: 'blur(15px)',
      y: '-10',
      autoAlpha: 0,
      duration: 1,
      // delay: 1,
    })
    .from('.nav', {
      autoAlpha: 0,
      duration: 0.5,
      // delay: 1,
    })
    .from('.skills', {
      autoAlpha: 0,
      duration: 0.5,
      delay: 1,
    })
    .add(() => {
      const skillsMarquee = document.querySelectorAll('.skills-marquee');
      skillsMarquee.forEach((marquee) => {
        marquee.classList.add('to-left');
      });
    });
}

// add class .to-left to both skills-marquee when .skills enters the viewport
// const skills = document.querySelector('.skills');
// const skillsMarquee = document.querySelectorAll('.skills-marquee');
// const skillsObserver = new IntersectionObserver(
//   (entries, skillsObserver) => {
//     entries.forEach((entry) => {
//       if (!entry.isIntersecting) {
//         return;
//       } else {
//         skillsMarquee.forEach((marquee) => {
//           marquee.classList.add('to-left');
//         });
//         skillsObserver.unobserve(entry.target);
//       }
//     });
//   },
//   {
//     threshold: 0.5,
//   }
// );
// skillsObserver.observe(skills);
