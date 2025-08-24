import { initPortfolioAnimations } from './animations.js';

const portfolioData = [
  {
    title: 'Thomas Just',
    brandColor: '#002f86',
    agency: 'Independent',
    role: 'UX Strategy, UI design, Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://justforhays.com/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/thomas-just.mp4',
    },
  },
  {
    title: 'Small chic hotels',
    brandColor: '#7C181A',
    agency: 'Small Chic Hotels',
    role: 'UX Strategy, UI design, Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'http://www.smallchichotels.com/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/small-chic.mp4',
    },
  },
  {
    title: 'Via Forma',
    brandColor: '#0A0435',
    agency: 'Independent',
    role: 'UX Strategy, UI design, Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'http://via-forma.com/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/via-forma.mp4',
    },
  },
  {
    title: 'ATKG Advisors',
    brandColor: '#0099CC',
    agency: 'Parallel, a brand agency',
    role: 'Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://atkg.com/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/atkg.mp4',
    },
  },
  {
    title: 'Kronkosky Foundation',
    brandColor: '#582B76',
    agency: 'Parallel, a brand agency',
    role: 'Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://kronkosky.org',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/kronkosky.mp4',
    },
  },
  {
    title: 'Talk About It Texas',
    brandColor: '#d83094',
    agency: 'Parallel, a brand agency',
    role: 'Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://talkaboutittx.org/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/tait.mp4',
    },
  },
  {
    title: 'Vibrant Works',
    brandColor: '#017683',
    agency: 'Parallel, a brand agency',
    role: 'Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://vibrantworks.org/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/vibrantworks.mp4',
    },
  },
  {
    title: 'Virtuoso Builders',
    brandColor: '#1C2938',
    agency: 'Parallel, a brand agency',
    role: 'Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://virtuosobuilders.com/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/virtuoso.mp4',
    },
  },
  // {
  //   title: 'Texas Ranger Whiskey',
  //   brandColor: '#28251F',
  //   agency: 'Parallel, a brand agency',
  //   role: 'Full-stack development',
  //   technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
  //   url: 'https://texasranger1823whiskey.com/',
  //   media: {
  //     type: 'video',
  //     src: 'https://api.jelvir.com/portfolio/texas-ranger.mp4',
  //   },
  // },
  {
    title: 'San Antonio Parks Foundation',
    brandColor: '#224420',
    agency: 'Parallel, a brand agency',
    role: 'Full-stack development',
    technology: 'CSS, JavaScript, PHP, MySQL, WordPress',
    url: 'https://saparks.org/',
    media: {
      type: 'video',
      src: 'https://api.jelvir.com/portfolio/saparks.mp4',
    },
  },
];

function createProjectHTML(project) {
  const mediaHTML =
    project.media.type === 'video'
      ? `<video class="feature-portfolio" src="${project.media.src}" muted inline loop></video>`
      : `<img class="feature-portfolio" src="${project.media.src}" alt="${project.title}">`;

  return `
        <div class="project" data-brand-color="${project.brandColor}">
            <div class="project-showcase">
                <div class="project-title-image">
                    <div class="name">
                        <h2>${project.title}</h2>
                    </div>
                    ${mediaHTML}
                </div>
            </div>
            <div class="project-details">
                <div>
                    <h5>Agency:</h5>
                    ${project.agency}
                </div>
                <div>
                    <h5>Role:</h5>
                    ${project.role}
                </div>
                <div>
                    <h5>Technology:</h5>
                    ${project.technology}
                </div>
                <div>
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn">Launch Project</a>
                </div>
            </div>
        </div>
    `;
}

export default function initPortfolio() {
  const workContainer = document.querySelector('.work-container');

  if (!workContainer) {
    console.error('Work container not found');
    return;
  }

  // Find the work title container
  const workTitleContainer = workContainer.querySelector(
    '.work-title-container'
  );

  if (!workTitleContainer) {
    console.error('Work title container not found');
    return;
  }

  // Clear existing projects (keep only the title)
  const existingProjects = workContainer.querySelectorAll(
    '.project:not(.work-title-container)'
  );
  existingProjects.forEach((project) => project.remove());

  // Generate and insert portfolio projects
  portfolioData.forEach((project) => {
    const projectHTML = createProjectHTML(project);
    workContainer.insertAdjacentHTML('beforeend', projectHTML);
  });

  // Initialize portfolio animations after elements are created
  initPortfolioAnimations();
}
