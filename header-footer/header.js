document.addEventListener('DOMContentLoaded', () => {
  // Загрузка header
  fetch('/header-footer/header.html')
    .then(r => r.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      initializeHeader(); // Хедер уже есть → можно инициализировать
    })
    .catch(err => console.error('Ошибка загрузки header.html:', err));

  // Загрузка footer
  fetch('/header-footer/footer.html')
    .then(r => r.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
      initializeHeader(); // На всякий случай — если в футере есть ссылки
    })
    .catch(err => console.error('Ошибка загрузки footer.html:', err));
});

function initializeHeader() {
  const currentPath = window.location.pathname;

  // === ПОДСВЕТКА АКТИВНЫХ ССЫЛОК ===
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href === '#') return;

    const normalizedHref = href.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    const normalizedCurrent = currentPath.replace(/\/index\.html$/, '/').replace(/\/$/, '');

    if (normalizedHref === normalizedCurrent) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // === Подсветка родительского пункта "Услуги" ===
  const servicePaths = [
    '/services/web-dev/web.html',
    '/services/mob-dev/mob.html',
    '/services/PO-dev/dev-po.html',
    '/services/ui/ui.html'
  ];
  if (servicePaths.some(p => currentPath.includes(p.replace('.html', '')))) {
    document.querySelector('[href="/services/web-dev/web.html"]')
      ?.closest('.nav-item')
      ?.querySelector('.nav-item-link')
      ?.classList.add('active');
  }

  // === БУРГЕР-МЕНЮ ===
  window.toggleMobileMenu = function () {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.toggle('mobile-active');
  };

  // Мобильные дропдауны
  document.querySelectorAll('.nav-item-link').forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = item.parentElement.querySelector('.dropdown');
        const isActive = item.classList.contains('active');

        // Закрываем все
        document.querySelectorAll('.nav-item-link').forEach(i => {
          i.classList.remove('active');
          i.parentElement.querySelector('.dropdown')?.classList.remove('show');
        });

        // Открываем текущий, если есть дропдаун
        if (!isActive && dropdown) {
          item.classList.add('active');
          dropdown.classList.add('show');
        }
      }
    });
  });

  // Закрытие меню при клике вне
  document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const burger = document.querySelector('.burger-menu');
    if (!navMenu?.contains(e.target) && !burger?.contains(e.target)) {
      navMenu?.classList.remove('mobile-active');
      document.querySelectorAll('.nav-item-link').forEach(i => {
        i.classList.remove('active');
        i.parentElement.querySelector('.dropdown')?.classList.remove('show');
      });
    }
  });

  // === МОДАЛКИ ===
  document.querySelectorAll('.login-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('login-modal');
      if (modal) modal.style.display = 'block';
    });
  });

  document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
  });

  document.querySelectorAll('#contactBtn, #contactBtnn, .mobile-request-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('requestModal');
      if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelector('.request-modal-close')?.addEventListener('click', () => {
    const modal = document.getElementById('requestModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Закрытие модалок по клику на фон
  window.addEventListener('click', (e) => {
    const loginModal = document.getElementById('login-modal');
    const requestModal = document.getElementById('requestModal');
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === requestModal) {
      requestModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Отправка формы заявки
  document.querySelector('.request-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена!');
    document.getElementById('requestModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    e.target.reset();
  });

  // Esc — закрытие модалок
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('login-modal').style.display = 'none';
      const req = document.getElementById('requestModal');
      if (req?.style.display === 'block') {
        req.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });

  const header = document.querySelector('.header');
  if (!header) return; 
  window.removeEventListener('scroll', handleHeaderScroll);
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Проверка при загрузке страницы
} 
