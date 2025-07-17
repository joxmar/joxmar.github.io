import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
    clearProps: 'filter', // This will ensure the filter is completely removed after animation
    // delay: 1,
  });

  // sub-intro animation
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
        trigger: subIntro,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
        invalidateOnRefresh: true,
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
          y: 50,
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '+=0.2'
      ); // Small delay after h2 completes
  }

  // Reusable title animation for .title-section elements
  document.querySelectorAll('.title-section').forEach((title) => {
    gsap.from(title, {
      filter: 'blur(15px)',
      y: '-10',
      autoAlpha: 0,
      duration: 1,
      clearProps: 'filter',
      scrollTrigger: {
        trigger: title.parentElement,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  /**********************************************
    Animate About section
  ************************************************/

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 100%',
    end: '+=1000',
    // markers: true,
    onEnter: () => {
      document.body.style.backgroundColor = '#080808';
    },
    onLeave: () => {
      document.body.style.backgroundColor = '#ffffff';
    },
    onEnterBack: () => {
      document.body.style.backgroundColor = '#080808';
    },
    onLeaveBack: () => {
      document.body.style.backgroundColor = '#ffffff';
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
      start: 'top 50%',
      // end: "bottom -20vh",
      end: '+=1000',
      pin: true,
      animation: tween,
      scrub: 2,
      invalidateOnRefresh: true,
    });
  }
}

/**********************************************
  portfolio horizontal scroller
************************************************/

// Portfolio animation function that can be called after portfolio is created
export function initPortfolioAnimations() {
  const projects = gsap.utils.toArray('.project');
  const projectContainer = document.querySelector('.work-container');

  if (projects.length === 0) {
    console.warn('No portfolio projects found for animations');
    return;
  }

  // Initialize project elements to be hidden
  projects.forEach((project) => {
    const elements = [
      project.querySelector('.name'),
      project.querySelector('.feature-portfolio'),
      project.querySelector('.project-details'),
    ].filter(Boolean);

    gsap.set(elements, {
      opacity: 0,
      y: 50,
    });
  });

  function getScrollDistance() {
    // Get the total width of all projects plus gaps
    const projectWidth = projects[0].offsetWidth;
    const gap =
      parseInt(window.getComputedStyle(projectContainer).gap) || 96 * 2; // 6rem = 96px fallback. x2 to account for left and right gap on the last project
    const totalWidth =
      projectWidth * projects.length +
      (window.innerWidth / 3) * (projects.length - 1);
    const containerWidth = projectContainer.offsetWidth;

    return -(totalWidth - containerWidth);
  }

  let scrollTween = gsap.to(projects, {
    x: getScrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: '#work',
      start: 'top 0%',
      pin: true,
      scrub: 1,
      end: '+=3000',
      // markers: true,
      invalidateOnRefresh: true,
    },
  });

  // portfolio scroll trigger
  ScrollTrigger.create({
    trigger: '#work',
    start: 'top 0%',
    end: '+=3000',
    scrub: 4,
    onUpdate: (self) => {
      // Get the viewport center point
      const viewportCenter = window.innerWidth / 2;
      let closestProject = null;
      let closestDistance = Infinity;

      // Find which project is closest to the center of the viewport
      projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const projectCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(projectCenter - viewportCenter);

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestProject = index;
        }
      });

      if (closestProject !== null) {
        // Change background color
        if (
          projects[closestProject] &&
          projects[closestProject].dataset.brandColor
        ) {
          document.body.style.backgroundColor =
            projects[closestProject].dataset.brandColor;
        }

        // Animate project elements when they become active
        animateProjectElements(closestProject);
      }
    },
    onLeave: () => {
      // Reset background when leaving the work section (going down)
      document.body.style.backgroundColor = '#ffffff';
      resetProjectElements();
      // Pause all videos when leaving work section
      projects.forEach((project) => {
        const video = project.querySelector('video');
        if (video) {
          video.pause();
        }
      });
    },
    onLeaveBack: () => {
      // Reset background when leaving the work section (going up)
      document.body.style.backgroundColor = '#ffffff';
      resetProjectElements();
      // Pause all videos when leaving work section
      projects.forEach((project) => {
        const video = project.querySelector('video');
        if (video) {
          video.pause();
        }
      });
    },
    onEnterBack: () => {
      // Find which project is currently closest to center
      const viewportCenter = window.innerWidth / 2;
      let closestProject = 0;
      let closestDistance = Infinity;

      projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const projectCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(projectCenter - viewportCenter);

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestProject = index;
        }
      });

      // Set background color for the closest project
      if (
        projects[closestProject] &&
        projects[closestProject].dataset.brandColor
      ) {
        document.body.style.backgroundColor =
          projects[closestProject].dataset.brandColor;
      }

      // Reset the tracking variable and animate the closest project
      currentActiveProject = -1;
      animateProjectElements(closestProject);
    },
  });

  // Function to animate project elements with stagger
  let currentActiveProject = -1;
  function animateProjectElements(activeIndex) {
    // Only animate if we've moved to a different project
    if (activeIndex === currentActiveProject) return;

    currentActiveProject = activeIndex;
    const currentProject = projects[activeIndex];
    // console.log(currentProject);

    if (!currentProject) return;

    // Reset all project elements first
    resetProjectElements();

    // Get the elements to animate
    const name = currentProject.querySelector('.name');
    const featurePortfolio = currentProject.querySelector('.feature-portfolio');
    const projectDetails = currentProject.querySelector('.project-details');

    const elementsToAnimate = [name, featurePortfolio, projectDetails].filter(
      Boolean
    );

    // Animate the current project elements with stagger
    if (elementsToAnimate.length > 0) {
      gsap.fromTo(
        elementsToAnimate,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );
    }

    // Play video for active project
    const activeVideo = currentProject.querySelector('video');
    if (activeVideo) {
      activeVideo.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }

  function resetProjectElements() {
    projects.forEach((project) => {
      const elements = [
        project.querySelector('.name'),
        project.querySelector('.feature-portfolio'),
        project.querySelector('.project-details'),
      ].filter(Boolean);

      gsap.to(elements, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power2.out',
      });

      // Pause videos for non-active projects
      const video = project.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset to beginning
      }
    });
  }
}
