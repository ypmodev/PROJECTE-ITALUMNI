document.querySelectorAll('[data-private]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    openLoginModal();
  });
});
