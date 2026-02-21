// ============================================================
//  PORTFOLIO — main.js v13
//  Enhanced: about expand, section animations, cert modal fix,
//  mobile nav close button, live scroll animations
// ============================================================
'use strict';

// ── BACKEND CONFIG ────────────────────────────────────────────
const BACKEND_URL = 'https://your-backend.onrender.com'; // ← UPDATE BEFORE DEPLOY

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
const themeToggle    = $('#themeToggle');
const themeColorMeta = document.getElementById('themeColorMeta');
function applyTheme(isLight) {
  document.body.classList.toggle('light-mode', isLight);
  themeToggle && (themeToggle.checked = isLight, themeToggle.setAttribute('aria-checked', String(isLight)));
  themeColorMeta && (themeColorMeta.content = isLight ? '#f0f4ff' : '#060b14');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
if (localStorage.getItem('theme') === 'light') applyTheme(true);
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
}, 10), { passive: true });

// ── MOBILE MENU ───────────────────────────────────────────────
const hamburger    = $('#hamburger');
const navMenu      = $('#navMenu');
const menuBackdrop = $('#menuBackdrop');
const navCloseBtn  = $('#navCloseBtn');

function openMenu() {
  navMenu?.classList.add('active');
  hamburger?.classList.add('active');
  menuBackdrop?.classList.add('active');
  hamburger?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  // Focus first nav link after open
  setTimeout(() => navMenu?.querySelector('.nav-link')?.focus(), 120);
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
// Mobile close button
navCloseBtn?.addEventListener('click', closeMenu);
menuBackdrop?.addEventListener('click', closeMenu);
navMenu?.addEventListener('keydown', e => {
  if (!navMenu.classList.contains('active')) return;
  const links = $$('.nav-link', navMenu);
  if (e.key === 'Escape') { closeMenu(); hamburger?.focus(); }
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); links[links.length-1].focus(); }
    else if (!e.shiftKey && document.activeElement === links[links.length-1]) { e.preventDefault(); links[0].focus(); }
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
const sections  = $$('section[id]');
const navLinks  = $$('.nav-link');
const PAGE_TITLES = {
  home:'Thirumala Narasimha Poluru | Full Stack Developer',
  about:'About | TNP', education:'Education | TNP', skills:'Skills | TNP',
  internships:'Internships & Certs | TNP', projects:'Projects | TNP',
  experience:'Experience | TNP', contact:'Contact | TNP', rating:'Rate | TNP'
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

// ── SCROLL REVEAL (Enhanced with stagger) ─────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const siblings = $$('.reveal-up,.reveal-left,.reveal-right', el.parentElement);
    const delay = prefersReducedMotion ? 0 : Math.min(siblings.indexOf(el) * 70, 450);
    el.style.transitionDelay = `${delay}ms`;
    el.classList.add('visible');
    revealObs.unobserve(el);
    setTimeout(() => el.style.transitionDelay = '', delay + 750);
  });
}, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

// ── SECTION ENTRANCE ANIMATION ────────────────────────────────
// Animates sections as they enter the viewport
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.entered) {
      entry.target.dataset.entered = 'true';
      if (!prefersReducedMotion) {
        entry.target.classList.add('section-enter');
      }
    }
  });
}, { threshold: 0.04 });

// ── EDUCATION EXPAND/COLLAPSE ─────────────────────────────────
function initEducationToggles() {
  $$('.edu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.edu-item');
      const details = item.querySelector('.edu-details');
      const expanded = item.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      details?.setAttribute('aria-hidden', String(!expanded));
    });
  });
}

// ── ABOUT EXPAND/COLLAPSE ─────────────────────────────────────
function initAboutExpand() {
  const expandBtn  = $('#aboutExpandBtn');
  const expandArea = $('#aboutExpanded');
  if (!expandBtn || !expandArea) return;

  expandBtn.addEventListener('click', () => {
    const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
    const next = !isExpanded;
    expandBtn.setAttribute('aria-expanded', String(next));
    expandArea.setAttribute('aria-hidden', String(!next));
    if (next && !prefersReducedMotion) {
      // Smooth scroll to keep content visible
      setTimeout(() => {
        expandArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 200);
    }
  });
}

// ── INTERNSHIP EXPAND/COLLAPSE ────────────────────────────────
function initInternToggles() {
  $$('.intern-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card    = btn.closest('.intern-card');
      const details = card.querySelector('.intern-details');
      const expanded = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      details?.setAttribute('aria-hidden', String(!expanded));
    });
  });
}

// ── CERTIFICATE MODAL — FIXED FULL SCREEN ─────────────────────
function initCertModal() {
  const modal      = $('#certModal');
  const backdrop   = $('#certModalBackdrop');
  const closeBtn   = $('#certModalClose');
  const modalImg   = $('#certModalImg');
  const modalCap   = $('#certModalCaption');
  if (!modal) return;

  function openModal(src, caption) {
    // Reset image first to trigger load event
    modalImg.src = '';
    modalImg.alt = caption || 'Certificate';
    if (modalCap) modalCap.textContent = caption || '';

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Load image
    const img = new Image();
    img.onload = () => { modalImg.src = src; };
    img.onerror = () => {
      modalImg.src = src; // try anyway
    };
    img.src = src;

    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { modalImg.src = ''; }, 350);
  }

  // Click on cert thumbnail image
  document.addEventListener('click', e => {
    const thumb = e.target.closest('.cert-thumb');
    if (thumb && thumb.src && !thumb.closest('.cert-img-error')) {
      e.preventDefault();
      e.stopPropagation();
      openModal(thumb.src, thumb.dataset.caption || thumb.alt);
      return;
    }
    // Also allow clicking the overlay inside a valid thumb wrap
    const overlay = e.target.closest('.cert-thumb-overlay');
    if (overlay) {
      const thumbWrap = overlay.closest('.cert-thumb-wrap');
      const img = thumbWrap?.querySelector('.cert-thumb');
      if (img && img.src && !thumbWrap.classList.contains('cert-img-error')) {
        e.preventDefault();
        openModal(img.src, img.dataset.caption || img.alt);
      }
    }
  });

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

// ── PROJECT FILTER ─────────────────────────────────────────────
function initProjectFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('.project-card').forEach((card, i) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('filtered-out', !show);
        card.setAttribute('aria-hidden', String(!show));
        if (show && !prefersReducedMotion) {
          card.style.animationDelay = `${i * 60}ms`;
        }
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
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
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
  const easeOut = t => 1 - Math.pow(1-t, 3);
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(easeOut(p) * target);
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
      message: $('#message')?.value.trim()
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

// ── TOAST (exposed globally) ──────────────────────────────────
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
  { icon:'🏠', text:'Home',                href:'#home' },
  { icon:'👤', text:'About Me',            href:'#about' },
  { icon:'🎓', text:'Education',           href:'#education' },
  { icon:'💻', text:'Skills',              href:'#skills' },
  { icon:'💼', text:'Internships & Certs', href:'#internships' },
  { icon:'🚀', text:'Projects',            href:'#projects' },
  { icon:'⭐', text:'Experience',          href:'#experience' },
  { icon:'📧', text:'Contact',             href:'#contact' },
  { icon:'⭐', text:'Rate Portfolio',      href:'#rating' },
  { icon:'📄', text:'Download CV',         action: () => $('#downloadCVBtn')?.click() },
  { icon:'☀️', text:'Toggle Theme',       action: () => themeToggle?.click() },
  { icon:'🔗', text:'LinkedIn',            href:'https://www.linkedin.com/in/thirumala-narasimha-poluru-23775926b', external:true },
  { icon:'💻', text:'GitHub',              href:'https://github.com/Thiru7869', external:true },
  { icon:'🧩', text:'LeetCode',            href:'https://leetcode.com/u/thiru7869/', external:true },
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
    const lq = q.toLowerCase().trim();
    const filtered = lq ? CMD_ITEMS.filter(i => i.text.toLowerCase().includes(lq)) : CMD_ITEMS;
    if (!filtered.length) { results.innerHTML = `<div class="command-empty">No results for "${escapeHtml(q)}"</div>`; return; }
    results.innerHTML = filtered.map((item, i) =>
      `<div class="command-result-item${i===selIdx?' selected':''}" data-index="${i}" role="option" tabindex="-1">
        <span class="command-result-icon">${item.icon}</span>
        <span class="command-result-text">${escapeHtml(item.text)}</span>
      </div>`
    ).join('');
    $$('.command-result-item', results).forEach((el, i) =>
      el.addEventListener('click', () => executeItem(filtered[i]))
    );
  }

  function executeItem(item) {
    close();
    if (item.action) { setTimeout(item.action, 80); return; }
    if (item.external) { window.open(item.href, '_blank', 'noopener'); return; }
    const target = $(item.href);
    if (target) window.scrollTo({ top: target.offsetTop - (navbar?.offsetHeight||0) - 8, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  }

  $('#cmdTrigger')?.addEventListener('click', open);
  backdrop?.addEventListener('click', close);
  $('#commandClose')?.addEventListener('click', close);
  input.addEventListener('input', e => { selIdx = -1; renderResults(e.target.value); });
  input.addEventListener('keydown', e => {
    const items = $$('.command-result-item', results);
    const lq = input.value.toLowerCase().trim();
    const filtered = lq ? CMD_ITEMS.filter(i => i.text.toLowerCase().includes(lq)) : CMD_ITEMS;
    if (e.key === 'ArrowDown') { e.preventDefault(); selIdx = Math.min(selIdx+1, items.length-1); items.forEach((el,i)=>el.classList.toggle('selected',i===selIdx)); items[selIdx]?.scrollIntoView({block:'nearest'}); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selIdx = Math.max(selIdx-1, 0); items.forEach((el,i)=>el.classList.toggle('selected',i===selIdx)); items[selIdx]?.scrollIntoView({block:'nearest'}); }
    else if (e.key === 'Enter' && selIdx >= 0) executeItem(filtered[selIdx]);
  });
  document.addEventListener('keydown', e => {
    if ((e.metaKey||e.ctrlKey) && e.key === 'k') { e.preventDefault(); palette.classList.contains('active') ? close() : open(); }
    if (e.key === 'Escape') { close(); closeMenu(); }
  });
}

// ── LIVE SECTION ANIMATIONS ────────────────────────────────────
function initSectionAnimations() {
  if (prefersReducedMotion) return;

  // Floating particles in hero
  const heroBg = $('.hero-bg');
  if (heroBg) {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      const size = Math.random() * 6 + 3;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        animation-duration:${Math.random() * 12 + 8}s;
        animation-delay:${Math.random() * 8}s;
      `;
      heroBg.appendChild(p);
    }
  }

  // Stagger section label + title
  $$('.section-label, .section-title').forEach((el, i) => {
    el.style.transitionDelay = `${i * 40}ms`;
  });
}

// ── RESIZE ────────────────────────────────────────────────────
window.addEventListener('resize', debounce(() => { if (window.innerWidth > 768) closeMenu(); }, 200));

// ══════════════════════════════════════════════════════════════
//  RATING SYSTEM
// ══════════════════════════════════════════════════════════════
const RATING_KEY   = 'portfolio_reviews_v2';
const RATE_LIMIT_K = 'portfolio_rated_at';
const RATE_LIMIT_H = 24;

const getReviews    = () => { try { return JSON.parse(localStorage.getItem(RATING_KEY) || '[]'); } catch { return []; } };
const saveReview    = r  => { const a = getReviews(); a.push(r); if(a.length>100) a.splice(0,a.length-100); localStorage.setItem(RATING_KEY,JSON.stringify(a)); };
const deleteReview  = i  => { const a = getReviews(); a.splice(i,1); localStorage.setItem(RATING_KEY,JSON.stringify(a)); };
const updateReview  = (i,rating,text) => { const a = getReviews(); if(a[i]) { a[i].rating=rating; a[i].text=text; a[i].edited=true; localStorage.setItem(RATING_KEY,JSON.stringify(a)); } };

async function notifyBackend({ name, email, rating, message }) {
  if (!BACKEND_URL || BACKEND_URL.includes('your-backend')) {
    console.info('[Portfolio] Backend URL not configured — skipping email notification.');
    return;
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, rating, message }),
    });
    const data = await res.json();
    if (data.success) console.log('📧 Backend notified — email sent.');
    else console.warn('Backend responded with error:', data.message);
  } catch (err) {
    console.warn('Backend notification failed (review still saved locally):', err.message);
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
    const start = lastAvg, end = parseFloat(val)||0, t0 = performance.now(), dur = 600;
    const easeOut = t => 1-Math.pow(1-t,3);
    const tick = now => {
      const p = Math.min((now-t0)/dur,1);
      el.textContent = (start + (end-start)*easeOut(p)).toFixed(1);
      p < 1 ? requestAnimationFrame(tick) : (el.textContent = end>0 ? end.toFixed(1) : '—', lastAvg = end);
    };
    requestAnimationFrame(tick);
  }

  function buildReviewCard(review, storageIdx, delay) {
    const sc = review.rating<=4 ? 'score-low' : review.rating<=7 ? 'score-mid' : 'score-high';
    const editedBadge = review.edited ? `<span class="review-edited-badge">edited</span>` : '';
    const card = document.createElement('div');
    card.className = 'review-card';
    card.style.animationDelay = `${delay}ms`;
    card.dataset.storageIndex = storageIdx;
    card.innerHTML = `
      <div class="review-static-view">
        <div class="review-header">
          <span class="review-name">${escapeHtml(review.name||'Anonymous')}</span>
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
            ${[1,2,3,4,5,6,7,8,9,10].map(n=>`<button type="button" class="review-edit-num${n===review.rating?' active':''}" data-val="${n}" aria-pressed="${n===review.rating}">${n}</button>`).join('')}
          </div>
        </div>
        <textarea class="review-edit-input" rows="3" maxlength="500" placeholder="Update your review… (Ctrl+Enter to save)">${escapeHtml(review.text||'')}</textarea>
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
        editNums.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
        pendingRating = +btn.dataset.val;
      });
    });
    editBtn.addEventListener('click', () => {
      pendingRating = review.rating;
      editNums.forEach(b => b.classList.toggle('active', +b.dataset.val === pendingRating));
      card.querySelector('.review-static-view').setAttribute('aria-hidden','true');
      card.querySelector('.review-edit-panel').setAttribute('aria-hidden','false');
      card.classList.add('editing');
      setTimeout(() => editInput?.focus(), 50);
    });
    const cancelEdit = () => {
      card.classList.remove('editing');
      card.querySelector('.review-static-view').setAttribute('aria-hidden','false');
      card.querySelector('.review-edit-panel').setAttribute('aria-hidden','true');
      editInput.value = review.text || '';
    };
    cancelBtn.addEventListener('click', cancelEdit);
    saveBtn.addEventListener('click', () => {
      const newText = editInput.value.trim();
      if (!newText) { showToast('⚠️ Review text cannot be empty.','error',2600); return; }
      updateReview(+card.dataset.storageIndex, pendingRating, newText);
      showToast('✅ Review updated!','success',2400);
      renderStats();
    });
    editInput.addEventListener('keydown', e => { if ((e.ctrlKey||e.metaKey) && e.key==='Enter') saveBtn.click(); });
    delBtn.addEventListener('click', () => {
      card.classList.add('review-card--removing');
      setTimeout(() => { deleteReview(+card.dataset.storageIndex); showToast('🗑️ Deleted.','info',2000); renderStats(); }, 280);
    });
    return card;
  }

  function renderStats() {
    const reviews = getReviews();
    if (!reviews.length) {
      animateAvg(avgScoreEl, 0);
      if (avgBarEl) avgBarEl.style.width = '0%';
      if (totalRevEl) totalRevEl.textContent = 'No reviews yet — be the first!';
      if (reviewsListEl) reviewsListEl.innerHTML = `<div class="no-reviews-msg">🌟 Be the first to rate this portfolio!</div>`;
      return;
    }
    const sum = reviews.reduce((a,r) => a+r.rating, 0);
    const avg = (sum/reviews.length).toFixed(1);
    animateAvg(avgScoreEl, avg);
    if (avgBarEl) setTimeout(() => avgBarEl.style.width = (avg/10*100)+'%', 60);
    if (totalRevEl) totalRevEl.textContent = `${reviews.length} review${reviews.length>1?'s':''}`;
    if (reviewsListEl) {
      reviewsListEl.innerHTML = '';
      const count = Math.min(reviews.length, 10);
      for (let i=0; i<count; i++) {
        const si = reviews.length-1-i;
        reviewsListEl.appendChild(buildReviewCard(reviews[si], si, i*50));
      }
    }
  }

  $$('.rating-num', ratingNums || document).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.rating-num').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('selected'); btn.setAttribute('aria-pressed','true');
      chosenRating = +btn.dataset.val;
      if (selRating) selRating.value = chosenRating;
      if (ratingHint) {
        const labels = ['','😞 Very Poor','😕 Poor','😐 Below Average','🙁 Fair','😊 Average','🙂 Good','👍 Very Good','⭐ Great','🌟 Excellent','🚀 Outstanding!'];
        ratingHint.textContent = `${chosenRating}/10 — ${labels[chosenRating]||''}`;
        ratingHint.classList.add('selected-hint');
      }
    });
  });

  ratingNums?.addEventListener('keydown', e => {
    const btns = $$('.rating-num');
    const idx = btns.indexOf(document.activeElement);
    if (idx === -1) return;
    if (e.key==='ArrowRight'||e.key==='ArrowDown') { e.preventDefault(); btns[Math.min(idx+1,btns.length-1)]?.focus(); }
    else if (e.key==='ArrowLeft'||e.key==='ArrowUp') { e.preventDefault(); btns[Math.max(idx-1,0)]?.focus(); }
    else if (e.key==='Home') { e.preventDefault(); btns[0]?.focus(); }
    else if (e.key==='End')  { e.preventDefault(); btns[btns.length-1]?.focus(); }
  });

  ratingForm.addEventListener('submit', async e => {
    e.preventDefault();
    const hp = $('#hp_website');
    if (hp && hp.value) return;

    const lastRated = localStorage.getItem(RATE_LIMIT_K);
    if (lastRated) {
      const hours = (Date.now() - +lastRated) / 3600000;
      if (hours < RATE_LIMIT_H) { showToast(`⏳ You can submit again in ${Math.ceil(RATE_LIMIT_H-hours)}h`,'info',4000); return; }
    }

    if (!chosenRating) { showToast('⚠️ Please select a rating!','error'); return; }
    const reviewText = $('#reviewText')?.value.trim() || '';
    if (!reviewText) { showToast('⚠️ Please write a review!','error'); return; }
    if (reviewText.length > 500) { showToast('⚠️ Review too long (max 500 chars)','error'); return; }

    const name     = $('#reviewerName')?.value.trim() || '';
    const emailVal = $('#reviewerEmail')?.value.trim() || '';
    if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showToast('⚠️ If providing email, please enter a valid address.','error');
      return;
    }

    if (ratingSubmit) { ratingSubmit.classList.add('loading'); ratingSubmit.disabled = true; }

    try {
      const review = {
        rating: chosenRating, name: name || 'Anonymous',
        email: emailVal || null, text: reviewText,
        timestamp: Date.now(), edited: false,
      };
      saveReview(review);
      localStorage.setItem(RATE_LIMIT_K, Date.now().toString());

      notifyBackend({ name: review.name, email: review.email, rating: review.rating, message: review.text }).catch(() => {});

      showToast('🌟 Thank you for your rating!', 'success', 4200);
      ratingForm.reset();
      $$('.rating-num').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
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

// ── UTILITIES ─────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}
function formatDate(ts) {
  try { return new Date(ts).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'}); }
  catch { return ''; }
}

// ── DOMContentLoaded ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Observe all reveal elements
  $$('.reveal-up,.reveal-left,.reveal-right').forEach(el => revealObs.observe(el));

  // Observe sections for entrance animation
  $$('.section').forEach(sec => sectionObs.observe(sec));

  initEducationToggles();
  initAboutExpand();
  initInternToggles();
  initCertModal();
  initProjectFilters();
  initCopyButtons();
  initCounters();
  initContactForm();
  initMobileFormScroll();
  initCommandPalette();
  initRatingSystem();
  initSectionAnimations();

  setTimeout(highlightNav, 100);
});

console.log('%c Portfolio v13 — Enhanced & Production Ready', 'font-size:14px;color:#4f8ef7;font-weight:700;');
console.log('%c ⌘K → Command Palette | 🌙/☀️ Theme Toggle', 'font-size:12px;color:#7cb3ff;');
console.log('%c https://github.com/Thiru7869', 'font-size:12px;color:#00d4aa;');
