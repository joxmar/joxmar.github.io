'use strict';
window.addEventListener('load', loader);

function loader() {
  // mouse follow
  const circle = document.getElementById('circle');
  const innerCircle = document.getElementById('innerCircle');

  document.addEventListener('mousemove', (e) => {
    // Get the circle current dimensions
    const height = circle.offsetHeight;
    const width = circle.offsetWidth;
    const innerHeight = innerCircle.offsetHeight;
    const innerWidth = innerCircle.offsetWidth;

    // Inner circle follows the position of the mouse
    innerCircle.style.left = `${e.clientX - innerWidth / 2}px`;
    innerCircle.style.top = `${e.clientY - innerHeight / 2}px`;

    setTimeout(() => {
      // circle follows the position of the mouse like the smaller one. Play around with the time to find the proper trail
      circle.style.left = `${e.clientX - width / 2}px`;
      circle.style.top = `${e.clientY - height / 2}px`;
    }, 100);

    // Add class to inner circle when mouse is over a link or button
    const link = e.target.closest('a');
    const button = e.target.closest('button');
    const lightSwitch = e.target.closest('label');

    if (link || button || lightSwitch) {
      circle.classList.add('is-hidden');
    } else {
      circle.classList.remove('is-hidden');
    }
  });

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

  TLLOAD.from('.hero-img', {
    y: '100',
    autoAlpha: 0,
    duration: 1,
  }).from('.intro-text', {
    webkitFilter: 'blur(15px)',
    y: '-10',
    autoAlpha: 0,
    duration: 1,
    // delay: 1,
  });
}
// parallax
const parallax = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  let val = window.scrollY;
  parallax.forEach((bg) => {
    bg.style.top = -val * 0.25 + 'px';
  });
});

// add class .to-left to both skills-marquee when .skills enters the viewport
const skills = document.querySelector('.skills');
const skillsMarquee = document.querySelectorAll('.skills-marquee');
const skillsObserver = new IntersectionObserver(
  (entries, skillsObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        skillsMarquee.forEach((marquee) => {
          marquee.classList.add('to-left');
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);
skillsObserver.observe(skills);

// mouse grab effect
let chain = document.querySelector('.pull-string');

chain.addEventListener('mousedown', function () {
  this.classList.add('grabbed');
});

chain.addEventListener('mouseup', function () {
  this.classList.remove('grabbed');
});
