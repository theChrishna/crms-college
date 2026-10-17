/**
 * Captain Rakesh Mohan Shyam Degree College
 * Official Degree College Website - Common Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearEls = document.querySelectorAll('.current-year');
  const nowYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = nowYear);

  // 2. Mobile Nav Toggle
  const navToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Notice Category Filter (notices.html)
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

  // 4. Faculty Department Filter (faculty.html)
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

  // 5. Gallery Lightbox (gallery.html)
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

  // 6. Generic Form Handler with Spam Honeypot Check (Admissions / Contact)
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

      // Validation check
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

      // Simulate reliable submission
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
