// Анимация появления статистики при скролле
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.stats-animation').forEach(element => {
  observer.observe(element);
});

// Анимация чисел в статистике
function animateNumbers() {
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.innerText);
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const step = duration / 50;

    const updateNumber = () => {
      current += increment;
      if (current < target) {
        stat.innerText = Math.floor(current) + '+';
        setTimeout(updateNumber, step);
      } else {
        stat.innerText = target + '+';
      }
    };

    updateNumber();
  });
}

// Запуск анимации при загрузке страницы
window.addEventListener('load', animateNumbers);
