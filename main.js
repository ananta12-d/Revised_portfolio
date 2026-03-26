/* =============================================
   ANANTA KISHORE SWAIN — PORTFOLIO SCRIPTS
   main.js
   ============================================= */

// ── DARK / LIGHT THEME TOGGLE ──────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved preference, default to dark
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

// ── HAMBURGER MENU ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobile();
  }
});

// ── NAV BACKGROUND ON SCROLL ───────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const scrolled = window.scrollY > 60;
  nav.style.background = scrolled
    ? 'var(--nav-scroll)'
    : 'var(--nav-bg)';
});

// ── ACTIVE NAV LINK HIGHLIGHT ──────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? 'var(--accent)' : '';
        link.style.fontWeight = isActive ? '600' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// ── SCROLL FADE-UP ANIMATIONS ─────────────────
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .timeline-item').forEach(el => {
  scrollObserver.observe(el);
});

// ── STAGGER DELAYS FOR GRIDS ────────────────────
document.querySelectorAll('.skill-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.cert-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.055}s`;
});
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.09}s`;
});

// ── CONTACT FORM — MAILTO TO opbitu855@gmail.com ──
function sendEmail(event) {
  event.preventDefault();

  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('msgSubject').value.trim();
  const body    = document.getElementById('msgBody').value.trim();

  if (!name || !email || !subject || !body) {
    alert('Please fill in all fields before sending.');
    return;
  }

  // Build mailto URL targeting Ananta's Gmail
  const toEmail = 'opbitu855@gmail.com';

  const emailSubject = encodeURIComponent(`[Portfolio] ${subject} — from ${name}`);

  const emailBody = encodeURIComponent(
    `Hi Ananta,\n\n` +
    `${body}\n\n` +
    `---\n` +
    `Sender: ${name}\n` +
    `Email: ${email}\n` +
    `Sent via: Portfolio Contact Form`
  );

  const mailtoLink = `mailto:${toEmail}?subject=${emailSubject}&body=${emailBody}`;

  // Open the email client
  window.location.href = mailtoLink;

  // Visual feedback on button
  const btn = document.getElementById('submitBtn');
  const originalText = btn.textContent;
  btn.textContent = '✓ Email client opened!';
  btn.style.opacity = '0.8';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.opacity = '1';
    btn.disabled = false;
    document.getElementById('contactForm').reset();
  }, 3500);
}

// Make sendEmail globally accessible (called from HTML onsubmit)
window.sendEmail = sendEmail;
window.closeMobile = closeMobile;