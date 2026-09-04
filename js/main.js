/**
 * EP HOMES — Main JavaScript
 * Interactive components: Mobile Drawer, Accordion, Floating Call Button & Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Header Elevation on Scroll
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  const floatingCallBtn = document.getElementById('floatingCallBtn');
  
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header shadow & blur
    if (scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Floating call button reveal on scroll
    if (floatingCallBtn) {
      if (scrollY > 150) {
        floatingCallBtn.classList.add('is-visible');
      } else {
        floatingCallBtn.classList.remove('is-visible');
      }
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

  // Close drawer on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    }
  });

  // -------------------------------------------------------------------------
  // 3. Interactive Accordion ("Clear terms, from day one")
  // -------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Close all other accordion items for clean single-panel behavior
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('is-active');
        const otherTrigger = otherItem.querySelector('.accordion__trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // If clicked item was not active, open it
      if (!isActive) {
        item.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. Dynamic Copyright Year
  // -------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
