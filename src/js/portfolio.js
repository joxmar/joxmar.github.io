import { initPortfolioAnimations } from './animations.js';

const portfolioData = [
  {
    id: 1,
    title: 'Small chic hotels',
    brandColor: '#7C181A',
    agency: '2 Hats Media',
    role: 'development',
    technology: 'HTML, CSS, JavaScript',
    url: 'https://www.2hatsmedia.com/',
    media: {
      type: 'video',
      src: 'images/video.mp4',
    },
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    brandColor: '#0A0435',
    agency: 'Digital Agency',
    role: 'Full-stack development',
    technology: 'React, Node.js, MongoDB',
    url: 'https://example.com',
    media: {
      type: 'video',
      src: 'images/video.mp4',
    },
  },
  {
    id: 3,
    title: 'Brand Identity Website',
    brandColor: '#0099CC',
    agency: 'Creative Studio',
    role: 'Frontend development',
    technology: 'Vue.js, SCSS, Webpack',
    url: 'https://example.com',
    media: {
      type: 'video',
      src: 'images/video.mp4',
    },
  },
  {
    id: 4,
    title: 'Portfolio Showcase',
    brandColor: '#582B76',
    agency: 'Independent',
    role: 'Full-stack development',
    technology: 'WordPress, PHP, MySQL',
    url: 'https://example.com',
    media: {
      type: 'video',
      src: 'images/video.mp4',
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
                    <a href="${project.url}" target="_blank" rel="noopener" class="btn">Launch Project</a>
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
