function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Simple animation for position cards
document.querySelectorAll('.position-card').forEach(card => {
  card.addEventListener('click', () => {
    card.style.transform = 'scale(1.02)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 200);
  });
});
