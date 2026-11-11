import './styles/main.scss';

const menuButton = document.querySelector('.header__menu');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('nav_open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.icon-button').forEach(button => {
  button.addEventListener('click', () => {
    const active = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!active));
  });
});

const cards = [...document.querySelectorAll('.tool-card')];
const search = document.querySelector('.search');
search.addEventListener('submit', event => {
  event.preventDefault();
  const query = search.querySelector('input').value.trim().toLowerCase();
  cards.forEach(card => {
    card.hidden = !card.querySelector('.tool-card__name').textContent.toLowerCase().includes(query);
  });
  document.querySelector('.tools__empty').hidden = cards.some(card => !card.hidden);
  document.querySelector('#tools').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button_load').addEventListener('click', () => {
  search.querySelector('input').value = '';
  cards.forEach(card => { card.hidden = false; });
  window.open('https://www.producthunt.com/categories/design-tools', '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('[data-auth]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById(link.dataset.auth).showModal();
  });
});

document.querySelectorAll('.auth').forEach(dialog => {
  dialog.querySelector('.auth__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => dialog.querySelector('form').reset());
});

document.querySelector('[data-collections]').addEventListener('click', () => {
  cards.forEach(card => {
    card.hidden = card.querySelector('[aria-label^="Save"]').getAttribute('aria-pressed') !== 'true';
  });
  document.querySelector('.tools__empty').hidden = cards.some(card => !card.hidden);
});

document.querySelector('.nav__link_dropdown').addEventListener('click', () => {
  cards.forEach(card => { card.hidden = false; });
  document.querySelector('.tools__empty').hidden = true;
});
