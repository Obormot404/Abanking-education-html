import './styles/main.scss';

const menuButton = document.querySelector('.header__menu');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('nav_open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelector('.tools__grid').addEventListener('click', event => {
  const button = event.target.closest('.icon-button');
  if (!button) return;
  const active = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', String(!active));
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

document.querySelector('.button_load').addEventListener('click', event => {
  const tools = [
    ['Penpot', 'https://penpot.app/', 'Design and prototype interfaces together with your team.'],
    ['Blender', 'https://www.blender.org/', 'Create 3D models, animations and visual effects.'],
    ['GIMP', 'https://www.gimp.org/', 'Edit photos and create digital artwork.']
  ];
  tools.forEach(([name, url, description]) => {
    const card = cards[0].cloneNode(true);
    card.hidden = false;
    card.querySelector('.tool-card__name').textContent = name;
    card.querySelector('.tool-card__description').textContent = description;
    card.querySelector('.tool-card__visit').href = url;
    const badge = document.createElement('span');
    badge.className = 'tool-card__badge';
    badge.textContent = name.slice(0, 2);
    card.querySelector('.tool-card__icon').replaceWith(badge);
    card.querySelectorAll('.icon-button').forEach(button => {
      const action = button.getAttribute('aria-label').split(' ')[0];
      button.setAttribute('aria-label', `${action} ${name}`);
      button.setAttribute('aria-pressed', 'false');
    });
    document.querySelector('.tools__grid').append(card);
    cards.push(card);
  });
  search.querySelector('input').value = '';
  cards.forEach(card => { card.hidden = false; });
  document.querySelector('.tools__empty').hidden = true;
  event.currentTarget.hidden = true;
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
