
// Получаем элементы
const consultationBtn = document.getElementById('consultationBtn');
const modal = document.getElementById('consultationModal');
const closeModalBtn = document.getElementById('closeModal');
const form = document.getElementById('consultationForm');

// Маска для телефона
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  let formattedValue = '';

  if (value.length > 0) {
    formattedValue += '+7';

    if (value.length > 1) {
      formattedValue += '(' + value.substring(1, 4);
    }

    if (value.length >= 4) {
      formattedValue += ') ' + value.substring(4, 7);
    }

    if (value.length >= 7) {
      formattedValue += '-' + value.substring(7, 9);
    }

    if (value.length >= 9) {
      formattedValue += '-' + value.substring(9, 11);
    }
  }

  e.target.value = formattedValue;
});

// Открытие модального окна
consultationBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Закрытие модального окна
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрытие модального окна при клике вне формы
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Обработка отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Простая валидация
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  let isValid = true;

  // Валидация имени
  if (name.value.trim() === '') {
    nameError.style.display = 'block';
    isValid = false;
  } else {
    nameError.style.display = 'none';
  }

  // Валидация телефона (простая)
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  if (!phoneRegex.test(phone.value)) {
    phoneError.style.display = 'block';
    isValid = false;
  } else {
    phoneError.style.display = 'none';
  }

  // Если все проверки пройдены
  if (isValid) {
    // Здесь должна быть логика отправки формы
    alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
    modal.style.display = 'none';
    form.reset();
  }
})


function showDetails(card) {
  card.style.transform = 'scale(1.05)';
  setTimeout(() => {
    card.style.transform = 'scale(1)';
  }, 200);
  alert(card.querySelector('.service-title').textContent + '\n\n' +
    card.querySelector('.service-description').textContent);
}



const codeLines = document.querySelectorAll('.code-line');
codeLines.forEach(line => {
  line.addEventListener('mouseenter', () => {
    line.style.transform = 'translateX(20px)';
    line.style.opacity = '1';
    line.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
  });

  line.addEventListener('mouseleave', () => {
    line.style.transform = 'translateX(0)';
    line.style.opacity = '0.7';
    line.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  });
});

const codeAnimation = document.querySelector('.code-animation');

for (let i = 0; i < 10; i++) {
  const codeLine = document.createElement('div');
  codeLine.classList.add('code-line');
  codeLine.style.top = `${i * 30}px`;
  codeLine.style.width = `${Math.random() * 80 + 20}%`;
  codeAnimation.appendChild(codeLine);
}
