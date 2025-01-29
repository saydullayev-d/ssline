
// MAIN
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isActive = item.classList.contains('active');


    document.querySelectorAll('.faq-item').forEach(otherItem => {
      otherItem.classList.remove('active');

      const answer = otherItem.querySelector('.faq-answer');
      answer.style.maxHeight = '0';
    });

    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


document.getElementById('questionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Получаем значения полей
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const question = document.getElementById('question').value;

  // Здесь можно добавить логику отправки данных на сервер
  console.log('Отправка формы:', { name, email, question });

  // Очищаем форму после отправки
  this.reset();

  // Показываем уведомление об успешной отправке
  alert('Спасибо! Ваш вопрос отправлен. Мы свяжемся с вами в ближайшее время.');
});
