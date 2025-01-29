document.addEventListener('DOMContentLoaded', () => {
  let burgerMenu = document.querySelector('.burger-menu');
  let navMenu = document.querySelector('.nav-menu');
  let loginBtns = document.querySelectorAll('.login-btn');
  let loginModal = document.getElementById('login-modal');
  let closeModalBtn = document.querySelector('.close-modal');
  let navItems = document.querySelectorAll('.nav-item-link');

  // Обработчик для навигационных элементов
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = item.parentElement.querySelector('.dropdown');

        // Закрываем все остальные открытые дропдауны
        navItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherDropdown = otherItem.parentElement.querySelector('.dropdown');
            if (otherDropdown) {
              otherDropdown.classList.remove('show');
            }
          }
        });

        // Переключаем текущий дропдаун
        item.classList.toggle('active');
        if (dropdown) {
          dropdown.classList.toggle('show');
        }
      }
    });
  });

  function toggleMobileMenu() {
    navMenu.classList.toggle('mobile-active');
    // Закрываем все открытые дропдауны при закрытии меню
    if (!navMenu.classList.contains('mobile-active')) {
      navItems.forEach(item => {
        item.classList.remove('active');
        const dropdown = item.parentElement.querySelector('.dropdown');
        if (dropdown) {
          dropdown.classList.remove('show');
        }
      });
    }
  }

  window.toggleMobileMenu = toggleMobileMenu;

  // Закрытие меню при клике вне его
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnBurger = burgerMenu.contains(e.target);
    if (!isClickInsideMenu && !isClickOnBurger) {
      navMenu.classList.remove('mobile-active');
      navItems.forEach(item => {
        item.classList.remove('active');
        const dropdown = item.parentElement.querySelector('.dropdown');
        if (dropdown) {
          dropdown.classList.remove('show');
        }
      });
    }
  });

  // Остальной код для модального окна остается без изменений
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

// Скрипт для модального окна заявки
document.addEventListener('DOMContentLoaded', function () {
  // Получаем все необходимые элементы
  const requestModal = document.getElementById('requestModal');
  const requestBtns = document.querySelectorAll('#contactBtn, #contactBtnn');
  const closeBtn = document.querySelector('.request-modal-close');
  const requestForm = document.querySelector('.request-form');

  // Открытие модального окна
  requestBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      requestModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Запрещаем прокрутку фона
    });
  });

  // Закрытие по клику на крестик
  closeBtn.addEventListener('click', function () {
    requestModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
  });

  // Закрытие по клику вне модального окна
  window.addEventListener('click', function (e) {
    if (e.target === requestModal) {
      requestModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Обработка отправки формы
  requestForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Получаем данные формы
    const formData = {
      name: this.querySelector('input[type="text"]').value,
      email: this.querySelector('input[type="email"]').value,
      message: this.querySelector('textarea').value
    };

    // Здесь можно добавить отправку данных на сервер
    console.log('Отправка данных:', formData);

    // Показываем уведомление об успешной отправке
    alert('Ваша заявка успешно отправлена!');

    // Закрываем модальное окно и очищаем форму
    requestModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    this.reset();
  });

  // Закрытие по нажатию Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && requestModal.style.display === 'block') {
      requestModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
