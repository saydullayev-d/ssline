 const contactBtn = document.getElementById('contactBtn');
 const contactModal = document.getElementById('contactModal');
 const closeBtn = document.querySelector('.close-btn');

 contactBtn.addEventListener('click', (e) => {
     e.preventDefault();
     contactModal.style.display = 'flex';
 });

 closeBtn.addEventListener('click', () => {
     contactModal.style.display = 'none';
 });
 window.addEventListener('click', (e) => {
     if (e.target === contactModal) {
         contactModal.style.display = 'none';
     }
 });
 const contactForm = document.querySelector('.contact-form');
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
     contactModal.style.display = 'none';
 });

 document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observerOptions = {
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, observerOptions);

  timelineItems.forEach(item => {
      observer.observe(item);
  });
});



const cards = document.querySelectorAll('.project-card');
        
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            translateY(-15px) 
            perspective(1000px) 
            rotateX(${(y - rect.height/2)/20}deg) 
            rotateY(${-(x - rect.width/2)/20}deg)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});
