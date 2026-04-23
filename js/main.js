// Sutera Sites - shared JS (GSAP animations, nav, forms)

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll state (blur + hide on scroll down) ---
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    let lastY = window.scrollY;
    const SCROLL_THRESHOLD = 10;
    const HIDE_AFTER = 100;

    const setNavState = () => {
      const y = window.scrollY;

      // Blur background once scrolled past 20px
      if (y > 20) nav.classList.add('nav-blur');
      else nav.classList.remove('nav-blur');

      // Hide on scroll down, show on scroll up
      const delta = y - lastY;

      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      // Don't hide near the top of the page
      if (y < HIDE_AFTER) {
        nav.classList.remove('nav-hidden');
      } else if (delta > 0) {
        // Scrolling down
        nav.classList.add('nav-hidden');
        // Also close any open mega menu
        document.querySelectorAll('[data-mega-panel].open').forEach(p => p.classList.remove('open'));
      } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
      }

      lastY = y;
    };

    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });
  }

  // --- Mega menu (desktop) ---
  const megaTriggers = document.querySelectorAll('[data-mega-trigger]');
  const megaPanels = document.querySelectorAll('[data-mega-panel]');
  const navEl = document.querySelector('[data-nav]');

  const closeAllMegaMenus = () => {
    megaPanels.forEach(p => p.classList.remove('open'));
  };

  const openMegaMenu = (key) => {
    megaPanels.forEach(p => {
      if (p.dataset.megaPanel === key) p.classList.add('open');
      else p.classList.remove('open');
    });
  };

  let megaHoverTimer = null;

  megaTriggers.forEach(trigger => {
    const key = trigger.dataset.megaTrigger;

    trigger.addEventListener('mouseenter', () => {
      clearTimeout(megaHoverTimer);
      openMegaMenu(key);
    });

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const panel = document.querySelector(`[data-mega-panel="${key}"]`);
      if (panel && panel.classList.contains('open')) {
        closeAllMegaMenus();
      } else {
        openMegaMenu(key);
      }
    });
  });

  megaPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => clearTimeout(megaHoverTimer));
    panel.addEventListener('mouseleave', () => {
      megaHoverTimer = setTimeout(closeAllMegaMenus, 150);
    });
  });

  if (navEl) {
    navEl.addEventListener('mouseleave', () => {
      megaHoverTimer = setTimeout(closeAllMegaMenus, 150);
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-mega-trigger]') && !e.target.closest('[data-mega-panel]')) {
      closeAllMegaMenus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMegaMenus();
  });

  // --- Mobile nav toggle ---
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileClose = document.querySelector('[data-mobile-close]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  document.querySelectorAll('[data-mobile-nav] a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- GSAP animations ---
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero reveal
    const heroReveal = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroReveal
      .to('[data-hero-pill]', { opacity: 1, y: 0, duration: 0.6 }, 0)
      .to('[data-hero-title]', { opacity: 1, y: 0, duration: 0.8 }, 0.1)
      .to('[data-hero-subtitle]', { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      .to('[data-hero-cta]', { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      .to('[data-hero-stats]', { opacity: 1, y: 0, duration: 0.6 }, 0.7);

    // Generic reveal-on-scroll
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Staggered reveals (e.g. service cards, stat pills)
    gsap.utils.toArray('[data-stagger-parent]').forEach(parent => {
      const children = parent.querySelectorAll('[data-stagger-child]');
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: parent,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Stat counters
    gsap.utils.toArray('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const counter = { value: 0 };

      gsap.to(counter, {
        value: end,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = prefix + counter.value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
        }
      });
    });
  }

  // --- Form submission (Formspree) ---
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          window.location.href = '/thank-you.html';
        } else {
          btn.textContent = originalText;
          btn.disabled = false;
          alert('Something went wrong. Please try again or call directly on 0434 542 005.');
        }
      } catch (err) {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Network error. Please try again or call directly on 0434 542 005.');
      }
    });
  }

  // --- Current year in footer ---
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
