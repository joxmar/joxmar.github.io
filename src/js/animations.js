import gsap from 'gsap';

export default function initAnimations() {
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
    filter: 'blur(15px)',
    y: '-10',
    autoAlpha: 0,
    duration: 1,
    clearProps: 'filter' // This will ensure the filter is completely removed after animation
    // delay: 1,
  });
}