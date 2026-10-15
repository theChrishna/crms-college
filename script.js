/**
 * Captain Rakesh Mohan Shyam Degree College
 * Fullscreen Campus Photo Showcase
 */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const thumbs = document.querySelectorAll('.thumb');
  const caption = document.getElementById('caption');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  const total = slides.length;
  let timer = null;

  function setSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));

    const activeSlide = slides[index];
    if (caption && activeSlide) {
      caption.textContent = activeSlide.getAttribute('data-title') || '';
    }

    currentIndex = index;

    // Reset auto-advance timer
    clearInterval(timer);
    timer = setInterval(() => setSlide(currentIndex + 1), 5000);
  }

  // Navigation arrows
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setSlide(currentIndex - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setSlide(currentIndex + 1);
  });

  // Thumbnail buttons
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(i);
    });
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      setSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      setSlide(currentIndex - 1);
    }
  });

  // Start with first slide
  setSlide(0);
});
