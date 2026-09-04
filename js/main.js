/**
 * EP HOMES — Main JavaScript
 * Interactive components: Mobile Drawer, Accordion, Modal Dialog, Form Handling & Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Header Elevation on Scroll
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // -------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

  const openDrawer = () => {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // -------------------------------------------------------------------------
  // 3. Interactive Accordion ("Clear terms, from day one")
  // -------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Close all accordion items for clean single-panel behavior
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('is-active');
        const otherTrigger = otherItem.querySelector('.accordion__trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // If the clicked one was not active, open it
      if (!isActive) {
        item.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. Modal Dialog: Schedule Viewing / Enquiry
  // -------------------------------------------------------------------------
  const modal = document.getElementById('enquiry-modal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const enquiryForm = document.getElementById('enquiryForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const preferredDateInput = document.getElementById('preferredDate');

  // Set minimum date for preferred date picker to tomorrow
  if (preferredDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', tomorrowFormatted);
    preferredDateInput.value = tomorrowFormatted;
  }

  const openModal = () => {
    if (mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 150);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('is-open')) {
        closeModal();
      }
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    }
  });

  // -------------------------------------------------------------------------
  // 5. Enquiry Form Validation & Submission Handling
  // -------------------------------------------------------------------------
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Full Name
      const nameInput = document.getElementById('fullName');
      const nameGroup = nameInput.closest('.form-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailInput = document.getElementById('emailAddress');
      const emailGroup = emailInput.closest('.form-group');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Phone
      const phoneInput = document.getElementById('phoneNumber');
      const phoneGroup = phoneInput.closest('.form-group');
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        phoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        phoneGroup.classList.remove('has-error');
      }

      // Validate Date
      const dateInput = document.getElementById('preferredDate');
      const dateGroup = dateInput.closest('.form-group');
      if (!dateInput.value) {
        dateGroup.classList.add('has-error');
        isValid = false;
      } else {
        dateGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Simulate submission loading
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing request...';
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Hide form fields & show success message
        Array.from(enquiryForm.children).forEach(child => {
          if (child !== modalSuccess) {
            child.style.display = 'none';
          }
        });

        modalSuccess.style.display = 'block';

        // Auto close after 4 seconds and reset form
        setTimeout(() => {
          closeModal();
          setTimeout(() => {
            enquiryForm.reset();
            Array.from(enquiryForm.children).forEach(child => {
              if (child !== modalSuccess) {
                child.style.display = '';
              }
            });
            modalSuccess.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
          }, 400);
        }, 4000);
      }, 800);
    });

    // Remove error class on input
    enquiryForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 6. Dynamic Copyright Year
  // -------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
