
const openTeamModal = document.querySelector('.footer-open-modal');
const teamModal = document.querySelector('#modal');
const btnCloseModal = teamModal.querySelector('.close');

openTeamModal.addEventListener('click', e => {
  e.preventDefault();
  teamModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

btnCloseModal.addEventListener('click', () => {
  teamModal.classList.remove('is-open');
  document.body.style.overflow = 'visible';
});

teamModal.addEventListener('click', e => {
  if (e.target === teamModal) {
    teamModal.classList.remove('is-open');
    document.body.style.overflow = 'visible';
  }
});