import initAnimations from './animations.js';
import initMouseTrail from './mouse-trail.js';
import initPortfolio from './portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
  // initialize the portfolio
  initPortfolio();

  // Initialize animations
  initAnimations();

  // Initialize the mouse trail
  initMouseTrail();

  // Initialize the loader function
  loader();
});

function loader() {
  // Years of experience
  const years = document.getElementById('yr-exp');
  const start = 2009; // i know it was OCt 2008 but I want to use the word "over" in the intro text, it is just 2 months.
  const current = new Date().getFullYear();
  years.textContent = current - start;
}

// parallax
const parallax = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  let val = window.scrollY;
  parallax.forEach((bg) => {
    bg.style.top = -val * 0.25 + 'px';
  });
});

// mouse grab effect
// let chain = document.querySelector('.pull-string');

// chain.addEventListener('mousedown', function () {
//   this.classList.add('grabbed');
// });

// chain.addEventListener('mouseup', function () {
//   this.classList.remove('grabbed');
// });
