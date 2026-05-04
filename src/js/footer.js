const scrollBtn = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {

  if (window.scrollY > 200) {
    scrollBtn.classList.add('scroll-up--active');
  } else {
    scrollBtn.classList.remove('scroll-up--active');
  }

});