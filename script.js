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
    navTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navTrigger.getAttribute('aria-expanded') === 'true';
      navTrigger.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navTrigger.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('active');
        navTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Search Topper Drawer (MIT Admissions Style)
  const searchTriggers = document.querySelectorAll('.js-search-trigger');
  const searchTopper = document.getElementById('search__topper');
  const searchInput = document.getElementById('search-input');

  if (searchTriggers.length > 0 && searchTopper) {
    searchTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        searchTopper.classList.toggle('active');
        if (searchTopper.classList.contains('active')) {
          searchInput?.focus();
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchTopper.classList.contains('active')) {
        searchTopper.classList.remove('active');
      }
    });
  }

  // 4. Teaser Feed: Condense | Expand View Toggle
  const teaseCloseBtn = document.querySelector('.js-tease-close');
  const teaseExpandBtn = document.querySelector('.js-tease-expand');
  const teaseFeedMod = document.querySelector('.tease-feed-mod');

  if (teaseCloseBtn && teaseExpandBtn && teaseFeedMod) {
    teaseCloseBtn.addEventListener('click', () => {
      teaseFeedMod.classList.add('tease-feed-mod--small');
      teaseCloseBtn.classList.add('active');
      teaseExpandBtn.classList.remove('active');
    });

    teaseExpandBtn.addEventListener('click', () => {
      teaseFeedMod.classList.remove('tease-feed-mod--small');
      teaseExpandBtn.classList.add('active');
      teaseCloseBtn.classList.remove('active');
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

  // 6. Notice Category Filter & Search (notices.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const noticeItems = document.querySelectorAll('.notice-item');
  const noticeSearchInput = document.getElementById('noticeSearch');

  if (filterBtns.length > 0 && noticeItems.length > 0) {
    function filterNotices() {
      const activeBtn = document.querySelector('.filter-btn.active');
      const selectedCategory = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
      const searchQuery = noticeSearchInput ? noticeSearchInput.value.toLowerCase().trim() : '';

      noticeItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemTitle = item.querySelector('.notice-item-title')?.textContent.toLowerCase() || '';
        const itemDesc = item.querySelector('.notice-item-desc')?.textContent.toLowerCase() || '';

        const matchesCategory = selectedCategory === 'all' || itemCategory === selectedCategory;
        const matchesSearch = searchQuery === '' || itemTitle.includes(searchQuery) || itemDesc.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterNotices();
      });
    });

    if (noticeSearchInput) {
      noticeSearchInput.addEventListener('input', filterNotices);
    }
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
