function handleSignup(inputId, successId) {
  const input = document.getElementById(inputId);
  const success = document.getElementById(successId);
  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    input.style.borderColor = '#D42B2B';
    input.setAttribute('aria-invalid', 'true');
    input.placeholder = 'Please enter a valid email';
    setTimeout(() => {
      input.style.borderColor = '';
      input.removeAttribute('aria-invalid');
      input.placeholder = inputId === 'heroEmail' ? 'Enter your email address' : 'Your email address';
    }, 2000);
    return;
  }
  input.parentElement.style.display = 'none';
  success.style.display = 'block';
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.08) + 's';
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card, .topic-pill').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.card, .topic-pill').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
}

const banner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('cookieAccept');
const declineBtn = document.getElementById('cookieDecline');

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

if (!getCookie('m4m_cookie_consent')) {
  setTimeout(() => banner.classList.add('visible'), 800);
}

acceptBtn.addEventListener('click', () => { setCookie('m4m_cookie_consent', 'all', 365); banner.classList.remove('visible'); });
declineBtn.addEventListener('click', () => { setCookie('m4m_cookie_consent', 'essential', 365); banner.classList.remove('visible'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && banner.classList.contains('visible')) declineBtn.click(); });

const hamburger = document.getElementById('navHamburger');
const mobileDrawer = document.getElementById('navMobileDrawer');
const navBackdrop = document.getElementById('navBackdrop');
const mobileLinks = document.querySelectorAll('.nav-mobile-link');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Close navigation menu');
  mobileDrawer.classList.add('open');
  mobileDrawer.removeAttribute('aria-hidden');
  navBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOpen = false;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  mobileDrawer.classList.remove('open');
  mobileDrawer.setAttribute('aria-hidden', 'true');
  navBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => { menuOpen ? closeMenu() : openMenu(); });
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
navBackdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) closeMenu(); });
