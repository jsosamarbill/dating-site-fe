const header = document.querySelector('.header');
const headerMnml = document.querySelector('.header-mnml');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 200) {
    header.classList.add('d-none');
    headerMnml.classList.remove('d-none');
  } else {
    header.classList.remove('d-none');
    headerMnml.classList.add('d-none');
  }
})