// HEADER
/* Header*/
document.addEventListener('DOMContentLoaded', () => {
  let burgerMenu = document.querySelector('.burger-menu');
  let navMenu = document.querySelector('.nav-menu');
  let loginBtns = document.querySelectorAll('.login-btn');
  let loginModal = document.getElementById('login-modal');
  let closeModalBtn = document.querySelector('.close-modal');

  function toggleMobileMenu() {
    navMenu.classList.toggle('mobile-active');
  }
  window.toggleMobileMenu = toggleMobileMenu;
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnBurger = burgerMenu.contains(e.target);
    if (!isClickInsideMenu && !isClickOnBurger) {
      navMenu.classList.remove('mobile-active');
    }
  });
  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.style.display = 'block';
      navMenu.classList.remove('mobile-active');
    });
  });
  closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });
  let loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Вход выполняется...');
    loginModal.style.display = 'none';
  });
});


// MAIN
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll('.team-member, .value-card').forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  observer.observe(el);
});

