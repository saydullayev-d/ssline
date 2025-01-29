
// MAIN
// Sample reviews data with more reviews
const reviews = [
  {
    name: 'Александр Петров',
    company: 'TechCorp',
    rating: 5,
    text: 'Отличная команда профессионалов! Проект был выполнен в срок и с высоким качеством. Особенно хочу отметить отличную коммуникацию на всех этапах разработки и внимание к деталям. Обязательно будем сотрудничать снова.',
    date: '2024-01-15',
    avatar: '/api/placeholder/60/60',
    likes: 12,
    liked: false
  },
  {
    name: 'Елена Сидорова',
    company: 'Digital Solutions',
    rating: 4,
    text: 'Хорошая коммуникация и профессиональный подход к решению задач. Команда быстро реагировала на наши запросы и вносила необходимые корректировки. Единственное замечание - некоторые задачи могли бы быть выполнены быстрее.',
    date: '2024-01-10',
    avatar: '/api/placeholder/60/60',
    likes: 8,
    liked: false
  },
  {
    name: 'Игорь Волков',
    company: 'StartupHub',
    rating: 5,
    text: 'Превзошли все наши ожидания! Разработали сложное приложение точно в срок и даже добавили несколько полезных функций, о которых мы изначально не думали. Техническая экспертиза команды на высочайшем уровне.',
    date: '2024-01-05',
    avatar: '/api/placeholder/60/60',
    likes: 15,
    liked: false
  },
  {
    name: 'Мария Ковалева',
    company: 'FintechPro',
    rating: 3,
    text: 'В целом работа была выполнена хорошо, но были задержки в коммуникации и некоторые баги пришлось исправлять после релиза. Тем не менее, команда ответственно подошла к исправлению всех замечаний.',
    date: '2024-01-03',
    avatar: '/api/placeholder/60/60',
    likes: 4,
    liked: false
  },
  {
    name: 'Дмитрий Соколов',
    company: 'E-Commerce Plus',
    rating: 5,
    text: 'Отличное соотношение цены и качества. Команда разработчиков не только выполнила все наши требования, но и предложила несколько инновационных решений, которые значительно улучшили проект.',
    date: '2023-12-28',
    avatar: '/api/placeholder/60/60',
    likes: 19,
    liked: false
  },
  {
    name: 'Анна Морозова',
    company: 'RetailTech',
    rating: 4,
    text: 'Качественная разработка и внимательное отношение к деталям. Порадовала гибкость в работе и готовность учесть все наши пожелания.',
    date: '2023-12-25',
    avatar: '/api/placeholder/60/60',
    likes: 7,
    liked: false
  },
  {
    name: 'Сергей Васильев',
    company: 'LogisticPro',
    rating: 5,
    text: 'Великолепная работа! Система автоматизации, которую разработала команда, позволила нам существенно оптимизировать бизнес-процессы.',
    date: '2023-12-20',
    avatar: '/api/placeholder/60/60',
    likes: 23,
    liked: false
  }
];

// Function to create star rating
function createStarRating(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Function to format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ru-RU');
}

// Function to create review card
function createReviewCard(review) {
  const expanded = review.text.length > 150;
  const truncatedText = expanded ? review.text.slice(0, 150) + '...' : review.text;

  return `
              <article class="review-card">
                  <div class="reviewer-info">
                      <div class="reviewer-avatar">
                          <img src="${review.avatar}" alt="${review.name}">
                      </div>
                      <div class="reviewer-details">
                          <h3 class="reviewer-name">${review.name}</h3>
                          <p class="reviewer-company">${review.company}</p>
                      </div>
                  </div>
                  <div class="review-rating">${createStarRating(review.rating)}</div>
                  <div class="review-text" data-full-text="${review.text}">
                      ${truncatedText}
                      ${expanded ? '<span class="review-text-toggle">Читать далее</span>' : ''}
                  </div>
                  <p class="review-date">${formatDate(review.date)}</p>
                  <div class="review-actions">
                      <span class="review-like ${review.liked ? 'liked' : ''}" data-likes="${review.likes}">
                          ♥ ${review.likes}
                      </span>
                  </div>
              </article>
          `;
}

// Function to render reviews
function renderReviews(filteredReviews = reviews) {
  const reviewsGrid = document.getElementById('reviewsGrid');
  reviewsGrid.innerHTML = filteredReviews.map(review => createReviewCard(review)).join('');

  // Update average rating
  const avgRating = (filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length).toFixed(1);
  document.querySelector('.average-rating').textContent = avgRating;
}

// Filter functionality
document.querySelector('.filter-section').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-button')) {
    // Update active state
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filter reviews
    const rating = e.target.dataset.rating;
    let filteredReviews = reviews;
    if (rating !== 'all') {
      const ratingNum = parseInt(rating);
      filteredReviews = reviews.filter(review =>
        rating === '3' ? review.rating <= 3 : review.rating === ratingNum
      );
    }
    renderReviews(filteredReviews);
  }
});

// Handle review text expansion
document.getElementById('reviewsGrid').addEventListener('click', (e) => {
  if (e.target.classList.contains('review-text-toggle')) {
    const reviewText = e.target.parentElement;
    const fullText = reviewText.dataset.fullText;
    reviewText.innerHTML = reviewText.classList.contains('expanded')
      ? `${fullText.slice(0, 150)}...<span class="review-text-toggle">Читать далее</span>`
      : `${fullText}<span class="review-text-toggle">Свернуть</span>`;
    reviewText.classList.toggle('expanded');
  }

  if (e.target.classList.contains('review-like')) {
    e.target.classList.toggle('liked');
    const likes = parseInt(e.target.dataset.likes);
    e.target.dataset.likes = e.target.classList.contains('liked') ? likes + 1 : likes - 1;
    e.target.innerHTML = `♥ ${e.target.dataset.likes}`;
  }
});

// Handle form submission with animation
document.getElementById('reviewForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Show loading indicator
  const loadingIndicator = document.getElementById('loadingIndicator');
  loadingIndicator.style.display = 'block';

  // Highlight form section
  const formSection = document.getElementById('addReviewSection');
  formSection.classList.add('highlight');

  // Create new review object
  const newReview = {
    name: document.getElementById('name').value,
    company: document.getElementById('company').value,
    rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
    text: document.getElementById('review').value,
    date: new Date().toISOString().split('T')[0],
    avatar: '/api/placeholder/60/60',
    likes: 0,
    liked: false
  };

  // Simulate API delay
  setTimeout(() => {
    reviews.unshift(newReview);
    renderReviews();
    this.reset();

    // Hide loading indicator
    loadingIndicator.style.display = 'none';

    // Remove highlight with delay
    setTimeout(() => {
      formSection.classList.remove('highlight');
    }, 500);
  }, 1000);
});

// Initial render
renderReviews();
