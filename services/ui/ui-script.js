// Анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
      }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .process-step, .tool-card, .advantage-item').forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});
