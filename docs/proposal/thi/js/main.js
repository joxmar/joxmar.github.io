function initApp(){
  const swiper = new Swiper('.swiper', {
    // direction: "vertical",
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 40,
    centeredSlides: true,
    keyboard: {
      enabled: true,
    },    
  
    // // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
    // // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });
  
}
document.addEventListener('DOMContentLoaded', initApp);