function initApp(){
  let swiper = null;
  
  // Function to check if device is desktop
  function isDesktop() {
    return window.innerWidth >= 1024; // Common desktop breakpoint
  }
  
  // Function to initialize or destroy Swiper based on viewport
  function handleViewportChange() {
    if (isDesktop()) {
      if (!swiper) {
        swiper = new Swiper('.swiper', {
          // direction: "vertical",
          // Optional parameters
          slidesPerView: "auto",
          spaceBetween: 40,
          centeredSlides: true,
          keyboard: {
            enabled: true,
          },    

          // mousewheel
          mousewheel: true,
        
          // // If we need pagination
          pagination: {
            el: '.swiper-pagination',
            type: "progressbar",
          },
        
          // // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          
          // ...existing code...
        });
      }
    } else {
      // Destroy swiper on mobile
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
    }
  }
  
  // Initial check
  handleViewportChange();
  
  // Listen for window resize events
  window.addEventListener('resize', handleViewportChange);
  

  const accordionBtn = document.querySelectorAll('.accordion-btn');
  accordionBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      // remove .active from all .accordion-bullets
      const accordionBullets = document.querySelectorAll('.accordion-bullets');
      accordionBullets.forEach((bullet) => {
        bullet.classList.remove('active');
      });

      const accordionParent = btn.parentNode;
      accordionParent.classList.toggle('active');      
    });
  })
}
document.addEventListener('DOMContentLoaded', initApp);