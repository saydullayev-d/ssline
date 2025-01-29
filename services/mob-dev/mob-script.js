/* Section1 */
function closeModal() {
  document.querySelector('.contact-modal').style.display = 'none';
}

// Close modal when clicking outside of modal content
document.querySelector('.contact-modal').addEventListener('click', function (event) {
  if (event.target === this) {
    closeModal();
  }
});
