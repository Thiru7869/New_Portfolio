'use strict';

// ── BACKEND URL ───────────────────────────────────────────────
const BACKEND_URL = (() => {
  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') return 'http://localhost:5000';
  return 'https://portfolio-backend-REPLACE_ME.onrender.com';
})();

const backendConfigured = () =>
  !!BACKEND_URL && !BACKEND_URL.includes('REPLACE_ME');

// ── UTILS ─────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ── PRELOADER ─────────────────────────────────────────────────
const preloader = $('#preloader');
function hidePreloader() {
  if (!preloader) return;
  preloader.classList.add('fade-out');
  setTimeout(() => { if (preloader) preloader.style.display = 'none'; }, 500);
}
document.readyState === 'loading'
  ? window.addEventListener('load', () => setTimeout(hidePreloader, 300))
  : setTimeout(hidePreloader, 400);

// ── THEME ─────────────────────────────────────────────────────
// Default is LIGHT MODE. Dark is only applied if the user previously
// chose dark explicitly (saved as 'dark' in localStorage).
const themeToggle    = $('#themeToggle');
const themeColorMeta = document.getElementById('themeColorMeta');

function applyTheme(isLight) {
  document.body.classList.toggle('light-mode', isLight);
  themeToggle && (themeToggle.checked = isLight, themeToggle.setAttribute('aria-checked', String(isLight)));
  themeColorMeta && (themeColorMeta.content = isLight ? '#f0f4ff' : '#060b14');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// On first visit localStorage has no 'theme' key → savedTheme is null → default to light.
// User can only get dark mode by explicitly toggling the switch.
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme !== 'dark');

themeToggle?.addEventListener('change', () => {
  applyTheme(themeToggle.checked);
  showToast(themeToggle.checked ? '☀️ Light mode on' : '🌙 Dark mode on', 'info', 1800);
});

// ── SCROLL PROGRESS ───────────────────────────────────────────
const scrollBar = $('#scrollProgress');
const backToTop = $('#backToTop');
function updateScrollProgress() {
  const top = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? (top / max) * 100 : 0;
  if (scrollBar) scrollBar.style.width = pct + '%';
  if (backToTop) backToTop.classList.toggle('visible', top > 500);
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
backToTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' })
);

// ── NAVBAR SCROLL ─────────────────────────────────────────────
const navbar = $('#navbar');
window.addEventListener('scroll', debounce(() => {
  navbar?.classList.toggle('scrolled', window.scrollY > 70);
}, 20), { passive: true });

// ── MOBILE MENU ───────────────────────────────────────────────
const hamburger    = $('#hamburger');
const navMenu      = $('#navMenu');
const menuBackdrop = $('#menuBackdrop');

function openMenu() {
  navMenu?.classList.add('active');
  hamburger?.classList.add('active');
  menuBackdrop?.classList.add('active');
  hamburger?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  setTimeout(() => navMenu?.querySelector('.nav-link')?.focus(), 100);
}
function closeMenu() {
  navMenu?.classList.remove('active');
  hamburger?.classList.remove('active');
  menuBackdrop?.classList.remove('active');
  hamburger?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hamburger?.addEventListener('click', e => {
  e.stopPropagation();
  navMenu?.classList.contains('active') ? closeMenu() : openMenu();
});
document.getElementById('navCloseBtn')?.addEventListener('click', closeMenu);
menuBackdrop?.addEventListener('click', closeMenu);
navMenu?.addEventListener('keydown', e => {
  if (!navMenu.classList.contains('active')) return;
  const links = $$('.nav-link', navMenu);
  if (e.key === 'Escape') closeMenu();
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); links[links.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === links[links.length - 1]) { e.preventDefault(); links[0].focus(); }
  }
});

// ── SMOOTH SCROLL ─────────────────────────────────────────────
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = $(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const offset = (navbar?.offsetHeight || 0) + 8;
  window.scrollTo({ top: target.offsetTop - offset, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  closeMenu();
});

// ── ACTIVE NAV ────────────────────────────────────────────────
const sections = $$('section[id]');
const navLinks = $$('.nav-link');
const PAGE_TITLES = {
  home: 'Thirumala Narasimha Poluru | Full Stack Developer',
  about: 'About | TNP', education: 'Education | TNP', skills: 'Skills | TNP',
  internships: 'Internships & Certs | TNP', projects: 'Projects | TNP',
  experience: 'Experience | TNP', contact: 'Contact | TNP', rating: 'Rate | TNP',
};
let currentSec = 'home';
function highlightNav() {
  const pos = window.scrollY + 200;
  sections.forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      const id = sec.id;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      if (currentSec !== id) {
        currentSec = id;
        history.replaceState(null, '', `#${id}`);
        document.title = PAGE_TITLES[id] || PAGE_TITLES.home;
      }
    }
  });
}
window.addEventListener('scroll', debounce(highlightNav, 18), { passive: true });

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (!prefersReducedMotion) {
      const siblings = [
        ...el.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right'),
      ];
      const idx   = Math.min(siblings.indexOf(el), 5);
      const delay = idx * 80;
      el.style.transitionDelay = `${delay}ms`;
      setTimeout(() => { el.style.transitionDelay = ''; }, delay + 800);
    }

    el.classList.add('visible');
    revealObs.unobserve(el);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

// ── EDUCATION EXPAND/COLLAPSE ─────────────────────────────────
function initEducationToggles() {
  $$('.edu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item     = btn.closest('.edu-item');
      const details  = item.querySelector('.edu-details');
      const expanded = item.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      details?.setAttribute('aria-hidden', String(!expanded));
    });
  });
}

// ── INTERNSHIP EXPAND/COLLAPSE ────────────────────────────────
function initInternToggles() {
  $$('.intern-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card     = btn.closest('.intern-card');
      const details  = card.querySelector('.intern-details');
      const expanded = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      details?.setAttribute('aria-hidden', String(!expanded));
    });
  });
}

// ── CERTIFICATE MODAL ─────────────────────────────────────────
function initCertModal() {
  const modal    = $('#certModal');
  const backdrop = $('#certModalBackdrop');
  const closeBtn = $('#certModalClose');
  const modalImg = $('#certModalImg');
  const modalCap = $('#certModalCaption');
  if (!modal) return;

  function openModal(src, caption) {
    modalImg.src = src;
    modalImg.alt = caption || 'Certificate';
    if (modalCap) modalCap.textContent = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  document.addEventListener('click', e => {
    const thumb   = e.target.closest('.cert-thumb');
    const overlay = e.target.closest('.cert-thumb-overlay');
    if (thumb) { e.preventDefault(); openModal(thumb.src, thumb.dataset.caption || thumb.alt); }
    else if (overlay) {
      e.preventDefault();
      const img = overlay.closest('.cert-thumb-wrap')?.querySelector('.cert-thumb');
      if (img) openModal(img.src, img.dataset.caption || img.alt);
    }
  });

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ── PROJECT FILTER ─────────────────────────────────────────────
function initProjectFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('.project-card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('filtered-out', !show);
        card.setAttribute('aria-hidden', String(!show));
      });
    });
  });
}

// ── COPY BUTTONS ──────────────────────────────────────────────
function initCopyButtons() {
  document.addEventListener('click', async e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    const text = btn.dataset.copy;
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    btn.classList.add('copied');
    showToast(`📋 Copied: ${text}`, 'copy', 2200);
    setTimeout(() => btn.classList.remove('copied'), 2000);
  });
}

// ── COUNTER ANIMATION ─────────────────────────────────────────
function animateCounter(el, target, dur = 1400) {
  if (prefersReducedMotion) { el.textContent = target; return; }
  const start = performance.now();
  const ease  = t => 1 - Math.pow(1 - t, 3);
  const tick  = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(ease(p) * target);
    p < 1 ? requestAnimationFrame(tick) : (el.textContent = target);
  };
  requestAnimationFrame(tick);
}
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.counted) return;
      entry.target.counted = true;
      $$('.counter', entry.target).forEach(el => {
        const t = parseInt(el.dataset.target);
        if (!isNaN(t)) { el.textContent = '0'; setTimeout(() => animateCounter(el, t), 200); }
      });
    });
  }, { threshold: 0.5 });
  const aboutSec = $('.about');
  if (aboutSec) obs.observe(aboutSec);
}

// ── CONTACT FORM ──────────────────────────────────────────────
function initContactForm() {
  const form      = $('#contactForm');
  const submitBtn = $('#submitBtn');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = {
      name:    $('#name')?.value.trim(),
      email:   $('#email')?.value.trim(),
      subject: $('#subject')?.value.trim(),
      message: $('#message')?.value.trim(),
    };
    if (!f.name || !f.email || !f.subject || !f.message) { showToast('⚠️ Please fill in all fields!', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { showToast('⚠️ Enter a valid email!', 'error'); return; }
    submitBtn?.classList.add('loading');
    if (submitBtn) submitBtn.disabled = true;
    setTimeout(() => {
      window.location.href = `mailto:reddytn4@gmail.com?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\n\nMessage:\n${f.message}`)}`;
      submitBtn?.classList.remove('loading');
      if (submitBtn) submitBtn.disabled = false;
      showToast('✅ Email client opened!', 'success');
      form.reset();
    }, 800);
  });
}

// ── MOBILE FORM SCROLL ────────────────────────────────────────
function initMobileFormScroll() {
  if (!isTouch) return;
  $$('input,textarea').forEach(el => {
    el.addEventListener('focus', () => setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350));
  });
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 3500) {
  const container = $('#toastContainer');
  if (!container) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', copy: '📋' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span><button class="toast-close" aria-label="Close">×</button>`;
  container.appendChild(toast);
  const remove = () => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 250); };
  toast.querySelector('.toast-close').addEventListener('click', remove);
  setTimeout(remove, duration);
}
window.showToast = showToast;

// ── COMMAND PALETTE ───────────────────────────────────────────
const CMD_ITEMS = [
  { icon: '🏠', text: 'Home',                href: '#home' },
  { icon: '👤', text: 'About Me',            href: '#about' },
  { icon: '🎓', text: 'Education',           href: '#education' },
  { icon: '💻', text: 'Skills',              href: '#skills' },
  { icon: '💼', text: 'Internships & Certs', href: '#internships' },
  { icon: '🚀', text: 'Projects',            href: '#projects' },
  { icon: '⭐', text: 'Experience',          href: '#experience' },
  { icon: '📧', text: 'Contact',             href: '#contact' },
  { icon: '⭐', text: 'Rate Portfolio',      href: '#rating' },
  { icon: '📄', text: 'Download CV',         action: () => $('#downloadCVBtn')?.click() },
  { icon: '☀️', text: 'Toggle Theme',       action: () => themeToggle?.click() },
  { icon: '🔗', text: 'LinkedIn',            href: 'https://www.linkedin.com/in/thirumala-narasimha-poluru-23775926b', external: true },
  { icon: '💻', text: 'GitHub',              href: 'https://github.com/Thiru7869', external: true },
  { icon: '🧩', text: 'LeetCode',            href: 'https://leetcode.com/u/thiru7869/', external: true },
];

function initCommandPalette() {
  const palette  = $('#commandPalette');
  const backdrop = $('#commandBackdrop');
  const input    = $('#commandInput');
  const results  = $('#commandResults');
  if (!palette || !input || !results) return;
  let selIdx = -1;

  const open = () => {
    palette.classList.add('active');
    backdrop?.classList.add('active');
    input.value = ''; selIdx = -1;
    renderResults('');
    requestAnimationFrame(() => input.focus());
  };
  const close = () => {
    palette.classList.remove('active');
    backdrop?.classList.remove('active');
    selIdx = -1;
  };

  function renderResults(q) {
    const lq       = q.toLowerCase().trim();
    const filtered = lq ? CMD_ITEMS.filter(i => i.text.toLowerCase().includes(lq)) : CMD_ITEMS;
    if (!filtered.length) { results.innerHTML = `<div class="command-empty">No results for "${escapeHtml(q)}"</div>`; return; }
    results.innerHTML = filtered.map((item, i) =>
      `<div class="command-result-item${i === selIdx ? ' selected' : ''}" data-index="${i}" role="option" tabindex="-1">
        <span class="command-result-icon">${item.icon}</span>
        <span class="command-result-text">${escapeHtml(item.text)}</span>
      </div>`
    ).join('');
    $$('.command-result-item', results).forEach((el, i) => el.addEventListener('click', () => executeItem(filtered[i])));
  }

  function executeItem(item) {
    close();
    if (item.action) { setTimeout(item.action, 80); return; }
    if (item.external) { window.open(item.href, '_blank', 'noopener'); return; }
    const target = $(item.href);
    if (target) window.scrollTo({ top: target.offsetTop - (navbar?.offsetHeight || 0) - 8, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  }

  $('#cmdTrigger')?.addEventListener('click', open);
  backdrop?.addEventListener('click', close);
  $('#commandClose')?.addEventListener('click', close);
  input.addEventListener('input', e => { selIdx = -1; renderResults(e.target.value); });
  input.addEventListener('keydown', e => {
    const items    = $$('.command-result-item', results);
    const lq       = input.value.toLowerCase().trim();
    const filtered = lq ? CMD_ITEMS.filter(i => i.text.toLowerCase().includes(lq)) : CMD_ITEMS;
    if (e.key === 'ArrowDown') { e.preventDefault(); selIdx = Math.min(selIdx + 1, items.length - 1); items.forEach((el, i) => el.classList.toggle('selected', i === selIdx)); items[selIdx]?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selIdx = Math.max(selIdx - 1, 0); items.forEach((el, i) => el.classList.toggle('selected', i === selIdx)); items[selIdx]?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter' && selIdx >= 0) executeItem(filtered[selIdx]);
  });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); palette.classList.contains('active') ? close() : open(); }
    if (e.key === 'Escape') { close(); closeMenu(); }
  });
}

// ── RESIZE ────────────────────────────────────────────────────
window.addEventListener('resize', debounce(() => { if (window.innerWidth > 768) closeMenu(); }, 200));

// ═══════════════════════════════════════════════════════════════
//  RATING SYSTEM
// ═══════════════════════════════════════════════════════════════
const RATING_KEY   = 'portfolio_reviews_v2';
const RATE_LIMIT_K = 'portfolio_rated_at';
const RATE_LIMIT_H = 0.01;

const getReviews   = () => { try { return JSON.parse(localStorage.getItem(RATING_KEY) || '[]'); } catch { return []; } };
const saveReview   = r  => { const a = getReviews(); a.push(r); if (a.length > 100) a.splice(0, a.length - 100); localStorage.setItem(RATING_KEY, JSON.stringify(a)); };
const deleteReview = i  => { const a = getReviews(); a.splice(i, 1); localStorage.setItem(RATING_KEY, JSON.stringify(a)); };
const updateReview = (i, rating, text) => { const a = getReviews(); if (a[i]) { a[i].rating = rating; a[i].text = text; a[i].edited = true; localStorage.setItem(RATING_KEY, JSON.stringify(a)); } };

async function fetchReviewsFromBackend() {
  if (!backendConfigured()) return null;
  try {
    const res  = await fetch(`${BACKEND_URL}/api/review?limit=50`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data?.reviews)) return null;
    return data.data.reviews.map(r => ({
      name: r.name, email: r.email || null, rating: r.rating, text: r.message,
      timestamp: new Date(r.createdAt).getTime(), edited: false, fromDB: true,
    }));
  } catch { return null; }
}

async function notifyBackend({ name, email, rating, message }) {
  if (!backendConfigured()) {
    console.info('[Portfolio] Set BACKEND_URL in main.js to enable email notifications.');
    return;
  }
  try {
    const res  = await fetch(`${BACKEND_URL}/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, rating, message }),
    });
    const data = await res.json();
    if (!data.success) console.warn('Backend error:', data.message);
  } catch (err) {
    console.warn('Backend unreachable — review saved locally only:', err.message);
  }
}

function initRatingSystem() {
  const ratingForm    = $('#ratingForm');
  const ratingNums    = $('#ratingNumbers');
  const selRating     = $('#selectedRating');
  const ratingHint    = $('#ratingHint');
  const ratingSubmit  = $('#ratingSubmitBtn');
  const avgScoreEl    = $('#avgScore');
  const avgBarEl      = $('#avgBar');
  const totalRevEl    = $('#totalReviews');
  const reviewsListEl = $('#reviewsList');
  if (!ratingForm) return;
  let chosenRating = 0;
  let lastAvg = 0;

  function animateAvg(el, val) {
    if (!el) return;
    if (prefersReducedMotion) { el.textContent = val > 0 ? val : '—'; return; }
    const start = lastAvg, end = parseFloat(val) || 0, t0 = performance.now(), dur = 600;
    const ease  = t => 1 - Math.pow(1 - t, 3);
    const tick  = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = (start + (end - start) * ease(p)).toFixed(1);
      p < 1 ? requestAnimationFrame(tick) : (el.textContent = end > 0 ? end.toFixed(1) : '—', lastAvg = end);
    };
    requestAnimationFrame(tick);
  }

  function buildReviewCard(review, storageIdx, delay) {
    const sc          = review.rating <= 4 ? 'score-low' : review.rating <= 7 ? 'score-mid' : 'score-high';
    const editedBadge = review.edited ? `<span class="review-edited-badge">edited</span>` : '';
    const card        = document.createElement('div');
    card.className    = 'review-card';
    card.style.animationDelay    = `${delay}ms`;
    card.dataset.storageIndex    = storageIdx;
    card.innerHTML = `
      <div class="review-static-view">
        <div class="review-header">
          <span class="review-name">${escapeHtml(review.name || 'Anonymous')}</span>
          <div class="review-header-right">${editedBadge}<span class="review-score ${sc}">${review.rating}/10</span></div>
        </div>
        ${review.text ? `<p class="review-text">${escapeHtml(review.text)}</p>` : ''}
        <div class="review-date">${formatDate(review.timestamp)}</div>
        <div class="review-actions" role="group">
          <button class="review-action-btn review-edit-btn"><span class="review-action-icon">✏️</span>Edit</button>
          <button class="review-action-btn review-delete-btn"><span class="review-action-icon">🗑️</span>Delete</button>
        </div>
      </div>
      <div class="review-edit-panel" aria-hidden="true">
        <div class="review-edit-rating-row">
          <span class="review-edit-label">Rating</span>
          <div class="review-edit-rating-nums">
            ${[1,2,3,4,5,6,7,8,9,10].map(n => `<button type="button" class="review-edit-num${n === review.rating ? ' active' : ''}" data-val="${n}" aria-pressed="${n === review.rating}">${n}</button>`).join('')}
          </div>
        </div>
        <textarea class="review-edit-input" rows="3" maxlength="500" placeholder="Update your review… (Ctrl+Enter to save)">${escapeHtml(review.text || '')}</textarea>
        <div class="review-edit-actions">
          <button class="review-action-btn review-save-btn">💾 Save</button>
          <button class="review-action-btn review-cancel-btn">✕ Cancel</button>
        </div>
      </div>`;

    const editBtn   = card.querySelector('.review-edit-btn');
    const delBtn    = card.querySelector('.review-delete-btn');
    const saveBtn   = card.querySelector('.review-save-btn');
    const cancelBtn = card.querySelector('.review-cancel-btn');
    const editInput = card.querySelector('.review-edit-input');
    const editNums  = card.querySelectorAll('.review-edit-num');
    let pendingRating = review.rating;

    editNums.forEach(btn => {
      btn.addEventListener('click', () => {
        editNums.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
        pendingRating = +btn.dataset.val;
      });
    });

    editBtn.addEventListener('click', () => {
      pendingRating = review.rating;
      editNums.forEach(b => b.classList.toggle('active', +b.dataset.val === pendingRating));
      card.querySelector('.review-static-view').setAttribute('aria-hidden', 'true');
      card.querySelector('.review-edit-panel').setAttribute('aria-hidden', 'false');
      card.classList.add('editing');
      setTimeout(() => editInput?.focus(), 50);
    });

    const cancelEdit = () => {
      card.classList.remove('editing');
      card.querySelector('.review-static-view').setAttribute('aria-hidden', 'false');
      card.querySelector('.review-edit-panel').setAttribute('aria-hidden', 'true');
      editInput.value = review.text || '';
    };
    cancelBtn.addEventListener('click', cancelEdit);

    saveBtn.addEventListener('click', () => {
      const newText = editInput.value.trim();
      if (!newText) { showToast('⚠️ Review text cannot be empty.', 'error', 2600); return; }
      updateReview(+card.dataset.storageIndex, pendingRating, newText);
      showToast('✅ Review updated!', 'success', 2400);
      renderStats();
    });

    editInput.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') saveBtn.click(); });

    delBtn.addEventListener('click', () => {
      card.classList.add('review-card--removing');
      setTimeout(() => { deleteReview(+card.dataset.storageIndex); showToast('🗑️ Deleted.', 'info', 2000); renderStats(); }, 280);
    });

    return card;
  }

  async function renderStats() {
    const dbReviews = await fetchReviewsFromBackend();
    const reviews   = dbReviews !== null ? dbReviews : getReviews();
    if (!reviews.length) {
      animateAvg(avgScoreEl, 0);
      if (avgBarEl) avgBarEl.style.width = '0%';
      if (totalRevEl) totalRevEl.textContent = 'No reviews yet — be the first!';
      if (reviewsListEl) reviewsListEl.innerHTML = `<div class="no-reviews-msg">🌟 Be the first to rate this portfolio!</div>`;
      return;
    }
    const sum = reviews.reduce((a, r) => a + r.rating, 0);
    const avg = (sum / reviews.length).toFixed(1);
    animateAvg(avgScoreEl, avg);
    if (avgBarEl) setTimeout(() => avgBarEl.style.width = (avg / 10 * 100) + '%', 60);
    if (totalRevEl) totalRevEl.textContent = `${reviews.length} review${reviews.length > 1 ? 's' : ''}`;
    if (reviewsListEl) {
      reviewsListEl.innerHTML = '';
      const count = Math.min(reviews.length, 10);
      for (let i = 0; i < count; i++) {
        const si = reviews.length - 1 - i;
        reviewsListEl.appendChild(buildReviewCard(reviews[si], si, i * 50));
      }
    }
  }

  $$('.rating-num', ratingNums || document).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.rating-num').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('selected'); btn.setAttribute('aria-pressed', 'true');
      chosenRating = +btn.dataset.val;
      if (selRating) selRating.value = chosenRating;
      if (ratingHint) {
        const labels = ['', '😞 Very Poor', '😕 Poor', '😐 Below Average', '🙁 Fair', '😊 Average', '🙂 Good', '👍 Very Good', '⭐ Great', '🌟 Excellent', '🚀 Outstanding!'];
        ratingHint.textContent = `${chosenRating}/10 — ${labels[chosenRating] || ''}`;
        ratingHint.classList.add('selected-hint');
      }
    });
  });

  ratingNums?.addEventListener('keydown', e => {
    const btns = $$('.rating-num');
    const idx  = btns.indexOf(document.activeElement);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); btns[Math.min(idx + 1, btns.length - 1)]?.focus(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); btns[Math.max(idx - 1, 0)]?.focus(); }
    else if (e.key === 'Home') { e.preventDefault(); btns[0]?.focus(); }
    else if (e.key === 'End')  { e.preventDefault(); btns[btns.length - 1]?.focus(); }
  });

  ratingForm.addEventListener('submit', async e => {
    e.preventDefault();
    if ($('#hp_website')?.value) return;
    const lastRated = localStorage.getItem(RATE_LIMIT_K);
    if (lastRated) {
      const hours = (Date.now() - +lastRated) / 3600000;
      if (hours < RATE_LIMIT_H) { showToast(`⏳ You can submit again in ${Math.ceil(RATE_LIMIT_H - hours)}h`, 'info', 4000); return; }
    }
    if (!chosenRating) { showToast('⚠️ Please select a rating!', 'error'); return; }
    const reviewText = $('#reviewText')?.value.trim() || '';
    if (!reviewText) { showToast('⚠️ Please write a review!', 'error'); return; }
    if (reviewText.length > 500) { showToast('⚠️ Review too long (max 500 chars)', 'error'); return; }
    const name     = $('#reviewerName')?.value.trim() || '';
    const emailVal = $('#reviewerEmail')?.value.trim() || '';
    if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showToast('⚠️ If providing email, enter a valid address.', 'error'); return;
    }
    if (ratingSubmit) { ratingSubmit.classList.add('loading'); ratingSubmit.disabled = true; }
    try {
      const review = {
        rating: chosenRating, name: name || 'Anonymous', email: emailVal || null,
        text: reviewText, timestamp: Date.now(), edited: false,
      };
      saveReview(review);
      localStorage.setItem(RATE_LIMIT_K, Date.now().toString());
      notifyBackend({ name: review.name, email: review.email, rating: review.rating, message: review.text }).catch(() => {});
      showToast('🌟 Thank you for your rating!', 'success', 4200);
      ratingForm.reset();
      $$('.rating-num').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); });
      chosenRating = 0;
      if (selRating) selRating.value = '';
      if (ratingHint) { ratingHint.textContent = 'Select a number above'; ratingHint.classList.remove('selected-hint'); }
      renderStats();
    } finally {
      if (ratingSubmit) { ratingSubmit.classList.remove('loading'); ratingSubmit.disabled = false; }
    }
  });

  renderStats();
}

// ── SOFT SKILLS MODAL ────────────────────────────────────────
const SOFT_SKILL_DATA = {
  'problem-solving': {
    emoji: '💡', title: 'Problem Solving',
    what: 'Problem solving is the ability to analyze complex challenges, break them into manageable parts, and systematically devise effective solutions.',
    why: 'In software development, nearly every task is a problem to solve — from debugging a cryptic error to architecting a scalable system. Strong problem-solving skills distinguish great engineers from average ones.',
    scenarios: ['Diagnosing a production bug that only appears under high load', 'Optimizing an algorithm from O(n²) to O(n log n)', 'Designing a database schema to support complex reporting needs'],
    improve: 'Practice daily on LeetCode, HackerRank, and CodeChef. Study design patterns, system design, and algorithms regularly. Analyze real-world case studies.',
  },
  'teamwork': {
    emoji: '👥', title: 'Team Collaboration',
    what: "Team collaboration is the ability to work effectively with others toward a shared goal, leveraging each member's strengths while maintaining clear communication and mutual respect.",
    why: 'Modern software is built by teams. The ability to collaborate across roles — developers, designers, QA, product managers — is essential for delivering quality products on time.',
    scenarios: ['Participating in daily standups and sprint retrospectives in Agile teams', "Reviewing colleagues' pull requests constructively", 'Pair programming to share knowledge and reduce defects'],
    improve: 'Work on open-source projects, contribute to team hackathons, practice giving and receiving code reviews, and study Agile/Scrum methodologies.',
  },
  'communication': {
    emoji: '💬', title: 'Communication',
    what: 'Communication is the ability to convey technical and non-technical ideas clearly — through writing, speech, documentation, and presentations — to diverse audiences.',
    why: 'Even the best technical solution fails if it cannot be explained to stakeholders. Developers who communicate well become force multipliers for their teams.',
    scenarios: ['Writing clear technical documentation and README files', 'Explaining trade-offs of architectural decisions to non-technical managers', 'Presenting sprint demos and project updates effectively'],
    improve: "Write technical blog posts, practice public speaking, contribute to documentation, and take courses like NPTEL's Public Speaking.",
  },
  'time-management': {
    emoji: '⏰', title: 'Time Management',
    what: 'Time management is the skill of planning and controlling how much time to spend on specific activities to maximize productivity and meet deadlines.',
    why: 'In a deadline-driven development environment, managing time effectively ensures features ship on schedule, technical debt stays controlled, and work-life balance is maintained.',
    scenarios: ['Using Pomodoro technique to stay focused during deep-work coding sessions', 'Prioritizing backlog items using MoSCoW method', 'Breaking epics into time-boxed sprints to track progress'],
    improve: 'Use project management tools like Jira or Trello, set daily goals, practice timeboxing, and learn estimation techniques like story points.',
  },
  'attention-to-detail': {
    emoji: '🎯', title: 'Attention to Detail',
    what: 'Attention to detail is the ability to notice and address small but significant aspects of work — from pixel-perfect UI to edge cases in business logic.',
    why: 'A single overlooked edge case can cause a critical bug. Thorough code reviews and precise implementations are what separate reliable software from fragile software.',
    scenarios: ['Catching an off-by-one error that would have caused data corruption', 'Ensuring UI components render correctly across all screen sizes', 'Validating all API input parameters to prevent security vulnerabilities'],
    improve: 'Practice writing comprehensive unit tests, conduct thorough code reviews, use linters and static analysis tools, and adopt a checklist-based approach to code quality.',
  },
  'adaptability': {
    emoji: '🔄', title: 'Adaptability',
    what: 'Adaptability is the ability to remain effective and positive when facing change — new technologies, shifting requirements, evolving team dynamics, or unexpected challenges.',
    why: 'Tech evolves rapidly. A developer who embraces change learns new frameworks, pivots when requirements shift, and thrives in dynamic startup and enterprise environments alike.',
    scenarios: ['Quickly learning a new framework when a project requires it', 'Adjusting sprint priorities when business requirements change mid-cycle', 'Shifting from individual contributor to team lead as the project scales'],
    improve: 'Continuously learn new languages and tools, embrace side projects outside your comfort zone, and maintain a growth mindset in every challenge.',
  },
  'quick-learning': {
    emoji: '📚', title: 'Quick Learning',
    what: 'Quick learning is the capacity to rapidly absorb, process, and apply new information, technologies, and methodologies to deliver value faster.',
    why: 'The tech landscape changes every few years. Developers who learn quickly stay relevant, take on new projects confidently, and are invaluable to growing teams.',
    scenarios: ['Spinning up a working prototype in an unfamiliar tech stack within days', 'Reading official documentation and implementing features without tutorials', 'Completing certifications (AWS, Python, Java) while working full-time'],
    improve: 'Build projects with unfamiliar technologies, follow structured learning paths, maintain a "today I learned" journal, and contribute to open-source projects outside your stack.',
  },
  'analytical-thinking': {
    emoji: '📊', title: 'Analytical Thinking',
    what: 'Analytical thinking is the ability to gather relevant data, identify patterns, evaluate options systematically, and draw logical conclusions to make informed decisions.',
    why: 'From optimizing database queries to interpreting user analytics, analytical thinking drives data-informed development decisions that lead to better products.',
    scenarios: ['Profiling an application to identify bottlenecks using data, not guesswork', 'Analyzing user behavior data to prioritize which features to build next', 'Evaluating multiple architectural approaches against defined criteria'],
    improve: 'Study data structures and algorithms, practice SQL and data analysis, work with analytics tools like Power BI or Tableau, and read engineering post-mortems.',
  },
};

function initSoftSkillsModal() {
  const modal    = document.getElementById('softSkillModal');
  const backdrop = document.getElementById('softSkillModalBackdrop');
  const closeBtn = document.getElementById('softSkillModalClose');
  const content  = document.getElementById('softSkillModalContent');
  if (!modal) return;

  function openSoftModal(skillKey) {
    const data = SOFT_SKILL_DATA[skillKey];
    if (!data) return;
    content.innerHTML = `
      <div class="ssm-header">
        <span class="ssm-emoji">${data.emoji}</span>
        <h2 class="ssm-title">${escapeHtml(data.title)}</h2>
      </div>
      <div class="ssm-section">
        <h3>What is ${escapeHtml(data.title)}?</h3>
        <p>${escapeHtml(data.what)}</p>
      </div>
      <div class="ssm-section">
        <h3>Why It Matters in Software Development</h3>
        <p>${escapeHtml(data.why)}</p>
      </div>
      <div class="ssm-section">
        <h3>Real-World Scenarios</h3>
        <ul>${data.scenarios.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
      </div>
      <div class="ssm-section ssm-improve">
        <h3>How Developers Improve This Skill</h3>
        <p>${escapeHtml(data.improve)}</p>
      </div>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeSoftModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const card = e.target.closest('.soft-card[data-skill]');
    if (card) { e.preventDefault(); openSoftModal(card.dataset.skill); }
  });
  document.addEventListener('keydown', e => {
    const card = e.target.closest('.soft-card[data-skill]');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openSoftModal(card.dataset.skill); }
  });

  backdrop?.addEventListener('click', closeSoftModal);
  closeBtn?.addEventListener('click', closeSoftModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSoftModal(); });
}

// ── HELPERS ───────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function formatDate(ts) {
  try { return new Date(ts).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return ''; }
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

  initEducationToggles();
  initInternToggles();
  initCertModal();
  initProjectFilters();
  initCopyButtons();
  initCounters();
  initContactForm();
  initMobileFormScroll();
  initCommandPalette();
  initRatingSystem();
  initSoftSkillsModal();

  setTimeout(highlightNav, 100);
});
