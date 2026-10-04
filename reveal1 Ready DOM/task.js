document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
      
      const { top, bottom } = element.getBoundingClientRect();

      
      if (top < windowHeight && bottom > 0) {
        element.classList.add('reveal_active');
      } else {
        element.classList.remove('reveal_active');
      }
    });
  };

 
  window.addEventListener('scroll', checkReveal);
  
  
  checkReveal();
});
