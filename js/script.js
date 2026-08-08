// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form -> submits to FormSubmit.co via AJAX so the visitor stays on the page
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
const formSubmitBtn = form ? form.querySelector('button[type="submit"]') : null;

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formSubmitBtn) formSubmitBtn.disabled = true;
    formNote.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Request failed');

      form.reset();
      formNote.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
    } catch (err) {
      formNote.textContent = 'Something went wrong sending that. Please call us directly.';
    } finally {
      if (formSubmitBtn) formSubmitBtn.disabled = false;
    }
  });
}
