document.addEventListener('DOMContentLoaded', () => {
  // Загрузка header
  fetch('/header-footer/header.html')
    .then(r => r.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      initializeHeader();
    });

  // Загрузка footer
  fetch('/header-footer/footer.html')
    .then(r => r.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
      initializeHeader(); // Запускаем снова, чтобы подсветить и футер
    });
});

function initializeHeader() {
  const currentPath = window.location.pathname;

  // === ПОДСВЕТКА ВСЕХ ССЫЛОК ПО href ===
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Пропускаем внешние ссылки, якоря, пустые
    if (!href || href.startsWith('http') || href.startsWith('#') || href === '#') {
      return;
    }

    // Нормализуем пути
    const normalizedHref = href.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    const normalizedCurrent = currentPath.replace(/\/index\.html$/, '/').replace(/\/$/, '');

    if (normalizedHref === normalizedCurrent) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // === Подсветка родительских пунктов (например, "Услуги") ===
  const servicePaths = [
    '/services/web-dev/web.html',
    '/services/mob-dev/mob.html',
    '/services/PO-dev/dev-po.html',
    '/services/ui/ui.html'
  ];
  if (servicePaths.some(p => currentPath.includes(p.replace('.html', '')))) {
    document.querySelector('[href="/services/web-dev/web.html"]')?.closest('.nav-item')?.querySelector('.nav-item-link')?.classList.add('active');
  }

  // === Бургер-меню, модалки и т.д. (остаётся без изменений) ===
  window.toggleMobileMenu = function () {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
  };

  document.querySelectorAll('.nav-item-link').forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = item.parentElement.querySelector('.dropdown');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.nav-item-link').forEach(i => {
          i.classList.remove('active');
          i.parentElement.querySelector('.dropdown')?.classList.remove('show');
        });

        if (!isActive && dropdown) {
          item.classList.add('active');
          dropdown.classList.add('show');
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const burger = document.querySelector('.burger-menu');
    if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
      navMenu.classList.remove('mobile-active');
      document.querySelectorAll('.nav-item-link').forEach(i => {
        i.classList.remove('active');
        i.parentElement.querySelector('.dropdown')?.classList.remove('show');
      });
    }
  });

  // Модалки
  document.querySelectorAll('.login-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('login-modal').style.display = 'block';
    });
  });

  document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
  });

  document.querySelectorAll('#contactBtn, #contactBtnn, .mobile-request-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('requestModal');
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelector('.request-modal-close')?.addEventListener('click', () => {
    const modal = document.getElementById('requestModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    const loginModal = document.getElementById('login-modal');
    const requestModal = document.getElementById('requestModal');
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === requestModal) {
      requestModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  document.querySelector('.request-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена!');
    document.getElementById('requestModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    e.target.reset();
  });

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
}