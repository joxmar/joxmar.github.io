import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function initAnimations() {
  const blobPath = document.getElementById('blob-path');

  // GSAP intros
  const TLLOAD = gsap.timeline({
    default: {
      ease: 'linear',
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
    clearProps: 'filter', // This will ensure the filter is completely removed after animation
    // delay: 1,
  });

  // // sub-intro animation
  const subIntro = document.querySelector('.sub-intro h2');
  const subIntroP = document.querySelector('.sub-intro p');

  if (subIntro && subIntroP) {
    const text = subIntro.textContent;
    subIntro.innerHTML = text
      .split('')
      .map((char) => `<span>${char}</span>`)
      .join('');

    // Create a timeline to sequence the animations
    const subIntroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: subIntro.parentNode,
        start: 'top 20%',
        end: 'top 80%',
        scrub: false,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    // First animate the h2 spans
    subIntroTimeline
      .fromTo(
        subIntro.querySelectorAll('span'),
        {
          y: '100',
          autoAlpha: 0,
        },
        {
          y: '0',
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.05,
        }
      )
      // Then animate the paragraph after h2 completes
      .fromTo(
        subIntroP,
        {
          y: '100',
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
        }
      ); // Small delay after h2 completes
  }

  // Reusable title animation for .title-section elements
  // document.querySelectorAll('.title-section').forEach((title) => {
  //   gsap.from(title, {
  //     filter: 'blur(15px)',
  //     y: '-10',
  //     autoAlpha: 0,
  //     duration: 1,
  //     clearProps: 'filter',
  //     scrollTrigger: {
  //       trigger: title.parentElement,
  //       start: 'top 80%',
  //       end: 'top 50%',
  //       scrub: 1,
  //       invalidateOnRefresh: true,
  //     },
  //   });
  // });

  /**********************************************
    Animate About section
  ************************************************/

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 100%',
    end: 'bottom 50%',
    // markers: true,
    onEnter: () => {
      document.body.style.backgroundColor = '#000000';
      blobPath.setAttribute('fill', '#080808');
    },
    onLeave: () => {
      document.body.style.backgroundColor = '#fffff2';
      blobPath.setAttribute('fill', '#fcee4b');
      document.querySelector('.footer-scroller').style.opacity = '1';
      document.querySelector('.about').style.opacity = '0';
    },
    onEnterBack: () => {
      document.body.style.backgroundColor = '#000000';
      blobPath.setAttribute('fill', '#080808');
      document.querySelector('.footer-scroller').style.opacity = '0';
      document.querySelector('.about').style.opacity = '1';
    },
    onLeaveBack: () => {     
      document.body.style.backgroundColor = '#fffff2';
      blobPath.setAttribute('fill', '#fcee4b');
    },
  });

  /**********************************************
    'let's buils something word scrtolling for' scroller
  ************************************************/
  const races = document.querySelector('.hor-scroller-inner');
  if (races) {
    function getScrollAmount() {
      let racesWidth = races.offsetWidth;
      return -(racesWidth - window.innerWidth + 96);
    }

    const tween = gsap.to(races, {
      x: getScrollAmount,
      duration: 2,
      ease: 'linear',
    });

    ScrollTrigger.create({
      trigger: '.hor-scroller',
      start: 'top 40%',
      // end: "bottom -20vh",
      end: '+=500',
      pin: true,
      animation: tween,
      scrub: 2,
      invalidateOnRefresh: true,
      // markers: {startColor: "blue", endColor: "blue"},
    });
  }
}

/**********************************************
  portfolio horizontal scroller
************************************************/

// NOTE FOR REFACTORING: Look into info on how containerAnimation works, you might need it
// for the optmized version of the portfolio scroller, look at this sample https://codepen.io/GreenSock/pen/WNjaxKp

// Portfolio animation function that can be called after portfolio is created
export function initPortfolioAnimations() {
  const blobPath = document.getElementById('blob-path');
  let horzContainter = document.querySelector('.work-container');

  let sections = gsap.utils.toArray('.project');
  // if tablet or mobile 
  if (window.innerWidth < 768) {
    var sectionxCount = sections.length + 2;
  } else {
    var sectionxCount = sections.length + .8;
  }

  const scrollTween = gsap.to(sections, {
    // xPercent: -100 * (sections.length - 1),
    xPercent: -100 * (sectionxCount), // total ammount of sections plus 1 for the last section to go out of view
    ease: 'none',
    scrollTrigger: {
      trigger: '.work-container',
      pin: true,
      scrub: 1,
      start: 'top 0',
      // end is the width of the conatiner so feels more natural and works on resize/ devices
      end: ()=> "+=3000",
      // markers: true,
          
      onLeaveBack: () => {        
        blobPath.setAttribute('fill', '#fcee4b');
      },
    }
  });

  // Trigger for each section
  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      containerAnimation: scrollTween,
      start: "left 50%", // When the left of the section hits the right of the viewport
      onEnter: () => {
        // animate project
        section.classList.add('project-animation');

        // get the brand color from the data 'brand-color' attribute
        let brandColor = section.dataset.brandColor;
        blobPath.setAttribute('fill', brandColor);
        // get video
        let clientVideo = section.querySelector('.feature-portfolio');
        if (clientVideo) {
          clientVideo.play();
        }
      },
      onLeave: () => {
        let clientVideo = section.querySelector('.feature-portfolio');
        if (clientVideo) {
          clientVideo.pause();
        }
        // console.log('video paused: ', clientVideo.paused);
      },
      onEnterBack: () => {
        let brandColor = section.dataset.brandColor;
        blobPath.setAttribute('fill', brandColor);
        let clientVideo = section.querySelector('.feature-portfolio');
        if (clientVideo) {
          clientVideo.play();
        }
      },
      onLeaveBack: () => {
        let clientVideo = section.querySelector('.feature-portfolio');
        if (clientVideo) {
          clientVideo.pause();
        }
      },
      // markers: true,
    });
  });
}

