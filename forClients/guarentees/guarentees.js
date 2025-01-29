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
  document.querySelectorAll('.guarantee-collapse-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('active');
        button.textContent = button.textContent.includes('▼') 
            ? button.textContent.replace('▼', '▲')
            : button.textContent.replace('▲', '▼');
    });
});
