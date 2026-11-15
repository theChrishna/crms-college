/**
 * Captain Rakesh Mohan Shyam Degree College, Bharnakalan, Mathura
 * Official Degree College Website - Client Logic
 * Design & Interaction System: MIT Admissions Style
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearEls = document.querySelectorAll('.current-year');
  const nowYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = nowYear);

  // 2. Mobile Nav Toggle
  const navTrigger = document.querySelector('.js-nav-trigger') || document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav') || document.querySelector('.site-nav__links');

  if (navTrigger && mainNav) {
    const setNav = (open) => {
      mainNav.classList.toggle('is-open', open);
      navTrigger.setAttribute('aria-expanded', String(open));
    };

    navTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setNav(!mainNav.classList.contains('is-open'));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navTrigger.contains(e.target) && !mainNav.contains(e.target)) setNav(false);
    });

    // Close on Escape and return focus to the trigger
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        setNav(false);
        navTrigger.focus();
      }
    });
  }

  // 5. Highlights Carousel Controls
  const carouselContainer = document.querySelector('.hp__highlights-container');
  const prevBtn = document.querySelector('.js-carousel-prev');
  const nextBtn = document.querySelector('.js-carousel-next');

  if (carouselContainer && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      carouselContainer.scrollBy({ left: -360, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carouselContainer.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }

  // 7. Faculty Department Filter (faculty.html)
  const facultyFilterBtns = document.querySelectorAll('.faculty-filter-btn');
  const facultyCards = document.querySelectorAll('.faculty-card');

  if (facultyFilterBtns.length > 0 && facultyCards.length > 0) {
    facultyFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        facultyFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const dept = btn.getAttribute('data-dept');

        facultyCards.forEach(card => {
          const cardDept = card.getAttribute('data-dept');
          if (dept === 'all' || cardDept === dept) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Gallery Lightbox (gallery.html)
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-img-wrap');

  if (lightboxModal && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Campus Photo';
          lightboxModal.classList.add('active');
        }
      });
    });

    // Keyboard: gallery tiles are role="button", so Enter / Space must open them
    galleryItems.forEach(item => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
      });
    });

    lightboxClose?.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 9. Generic Enquiry Form Handler with Honeypot
  const enquiryForms = document.querySelectorAll('.enquiry-form');

  enquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = form.querySelector('input[name="website_hp"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam submission detected and blocked.');
        return;
      }

      const statusEl = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = form.querySelector('[name="name"]')?.value.trim();
      const phone = form.querySelector('[name="phone"]')?.value.trim();

      if (!name || !phone) {
        if (statusEl) {
          statusEl.textContent = 'Please fill in all required fields (Name and Mobile Number).';
          statusEl.className = 'form-status error';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      setTimeout(() => {
        if (statusEl) {
          statusEl.textContent = 'Thank you! Your enquiry has been recorded. The college admissions office will contact you shortly.';
          statusEl.className = 'form-status success';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Enquiry';
        }
      }, 700);
    });
  });
});
