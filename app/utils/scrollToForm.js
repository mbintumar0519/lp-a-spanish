// Utility function to scroll to the hero form
export const scrollToHeroForm = (e) => {
  if (e) {
    e.preventDefault();
  }
  
  // Find the hero form element
  const heroForm = document.getElementById('hero-form');
  
  if (heroForm) {
    // Smooth scroll to the form, centering it in the viewport
    heroForm.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Optional: focus the first input after scrolling
    setTimeout(() => {
      const firstInput = heroForm.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 800);
  }
};
