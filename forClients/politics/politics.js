// // MAIN
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();
//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//         behavior: 'smooth'
//       });
//     });
//   });
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.style.opacity = '1';
//         entry.target.style.transform = 'translateY(0)';
//       }
//     });
//   }, {
//     threshold: 0.1
//   });

//   document.querySelectorAll('.privacy-section').forEach(section => {
//     observer.observe(section);
//   });
// });
