// Sutera Sites - shared JS (GSAP animations, nav, forms)

document.addEventListener('DOMContentLoaded', () => {

  // --- Mega menu (desktop) ---
  const nav = document.querySelector('[data-nav]');
  const megaTriggers = document.querySelectorAll('[data-mega-trigger]');
  const megaPanels = document.querySelectorAll('[data-mega-panel]');
  let megaHoverTimer = null;
  let hoverOpened = null;

  const closeAllMegaMenus = () => {
    megaPanels.forEach(p => p.classList.remove('open'));
    megaTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    hoverOpened = null;
  };

  const openMegaMenu = (key) => {
    megaPanels.forEach(p => p.classList.toggle('open', p.dataset.megaPanel === key));
    megaTriggers.forEach(t => t.setAttribute('aria-expanded', String(t.dataset.megaTrigger === key)));
  };

  megaTriggers.forEach(trigger => {
    const key = trigger.dataset.megaTrigger;

    // Mouse only: a tap fires this too, and the click after it would close the panel it just opened
    trigger.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(megaHoverTimer);
      hoverOpened = key;
      openMegaMenu(key);
    });

    trigger.addEventListener('click', () => {
      // Hover already opened it, so this click keeps it open rather than closing it
      if (hoverOpened === key) {
        hoverOpened = null;
        return;
      }
      if (trigger.getAttribute('aria-expanded') === 'true') closeAllMegaMenus();
      else openMegaMenu(key);
    });
  });

  megaPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => clearTimeout(megaHoverTimer));
    panel.addEventListener('mouseleave', () => {
      megaHoverTimer = setTimeout(closeAllMegaMenus, 150);
    });
    panel.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeAllMegaMenus();
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-mega-trigger]') && !e.target.closest('[data-mega-panel]')) {
      closeAllMegaMenus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('[data-mega-trigger][aria-expanded="true"]');
    if (open) {
      closeAllMegaMenus();
      open.focus();
    }
  });

  // --- Nav scroll state (floating bar + hide on scroll down) ---
  if (nav) {
    let lastY = window.scrollY;
    const SCROLL_THRESHOLD = 10;
    const HIDE_AFTER = 100;

    const setNavState = () => {
      const y = window.scrollY;

      // Join the links and button into the floating bar once scrolled past 20px
      if (y > 20) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');

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
        closeAllMegaMenus();
      } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
      }

      lastY = y;
    };

    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });

    nav.addEventListener('mouseleave', () => {
      megaHoverTimer = setTimeout(closeAllMegaMenus, 150);
    });

    // Tabbing out of an open menu closes it
    nav.addEventListener('focusout', (e) => {
      const to = e.relatedTarget;
      const open = nav.querySelector('[data-mega-panel].open');
      if (!to || !open) return;
      if (!open.contains(to) && !to.closest(`[data-mega-trigger="${open.dataset.megaPanel}"]`)) closeAllMegaMenus();
    });
  }

  // --- Mobile nav toggle ---
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileClose = document.querySelector('[data-mobile-close]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (mobileToggle && mobileClose && mobileNav) {
    const behindSheet = [...document.body.children].filter(el => el !== mobileNav && el.tagName !== 'SCRIPT');

    const setMobileNav = (open) => {
      mobileNav.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      behindSheet.forEach(el => { el.inert = open; });
    };

    mobileToggle.addEventListener('click', () => {
      setMobileNav(true);
      mobileClose.focus();
    });
    mobileClose.addEventListener('click', () => {
      setMobileNav(false);
      mobileToggle.focus();
    });
    document.querySelectorAll('[data-mobile-nav] a').forEach(link => {
      link.addEventListener('click', () => setMobileNav(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        setMobileNav(false);
        mobileToggle.focus();
      }
    });
    // Turning a tablet sideways past the phone layout must not leave the page locked
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
      if (e.matches) setMobileNav(false);
    });
  }

  // --- GSAP animations ---
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance is CSS-only now (see .hero-anim in styles.css) so the LCP
    // element paints immediately instead of waiting for the GSAP CDN to load.

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
