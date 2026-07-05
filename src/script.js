/* ==============================================
   Personal Website — script.js
   ============================================== */

(function () {
  'use strict';

  /* --------------------------------------------------
     NAV: add .scrolled class when page scrolls
  -------------------------------------------------- */
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* --------------------------------------------------
     SMOOTH SCROLL for anchor links
  -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // account for fixed nav
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------
     SCROLL REVEAL: fade elements in as they enter view
  -------------------------------------------------- */
  function addRevealClasses() {
    // Elements to reveal on scroll
    const selectors = [
      '.section__heading',
      '.section__subtext',
      '.card',
      '.post',
      '.stat',
      '.section__body p',
      '.social-row',
      '.btn--lg',
    ];

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('reveal');
      });
    });
  }

  function createObserver() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just make everything visible
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------
     STAGGER cards and posts so they animate in sequence
  -------------------------------------------------- */
  function staggerRevealGroups() {
    ['.card-grid .card', '.post-list .post'].forEach(function (groupSel) {
      document.querySelectorAll(groupSel).forEach(function (el, i) {
        el.style.transitionDelay = (i * 80) + 'ms';
      });
    });
  }

  /* --------------------------------------------------
     ACTIVE NAV LINK: highlight link for current section
  -------------------------------------------------- */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a');

    if (!sections.length || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.style.color = '';
              if (link.getAttribute('href') === '#' + id) {
                link.style.color = 'var(--text)';
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* --------------------------------------------------
     INIT
  -------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    addRevealClasses();
    staggerRevealGroups();
    createObserver();
    initActiveNav();
  });
})();
