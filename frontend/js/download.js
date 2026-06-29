'use strict';

(function initCVDownload() {
  const CV_FILE_ID    = '1WMkpszuSoUas1w5Odq3os433vnDiit-l';
  const DOWNLOAD_URL  = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
  const FILENAME      = 'Thirumala_Narasimha_Poluru_CV.pdf';
  const ANIM_MS       = 2400;
  const RESET_MS      = 3000;
  const REDUCED       = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let btn, fillEl, pctEl;

  // Ease-out cubic: starts fast, decelerates smoothly to 100 %
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function setProgress(p) {
    if (fillEl) fillEl.style.width = `${p}%`;
    if (pctEl)  pctEl.textContent  = `${p}%`;
  }

  function runProgressAnimation() {
    return new Promise(resolve => {
      if (REDUCED) { setProgress(100); return setTimeout(resolve, 300); }
      const t0 = performance.now();
      function tick(now) {
        const raw = Math.min((now - t0) / ANIM_MS, 1);
        setProgress(Math.round(easeOut(raw) * 100));
        raw < 1 ? requestAnimationFrame(tick) : resolve();
      }
      requestAnimationFrame(tick);
    });
  }

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = DOWNLOAD_URL; a.download = FILENAME; a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a); a.click();
    setTimeout(() => document.body.removeChild(a), 500);
  }

  // Inject the three-state button HTML.
  // The button gains a solid accent background via .cv-downloading (CSS),
  // so the white progress bar is always readable in both light and dark mode.
  function buildButtonUI(cvBtn) {
    cvBtn.innerHTML = `
      <span class="cv-btn-default-state">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>Download CV</span>
      </span>

      <span class="cv-btn-progress-state" aria-hidden="true">
        <span class="cv-progress-wrap">
          <span class="cv-progress-bar-bg">
            <span class="cv-progress-bar-fill" id="cvFill"></span>
          </span>
          <span class="cv-progress-pct" id="cvPct">0%</span>
        </span>
        <span class="cv-progress-text">Downloading…</span>
      </span>

      <span class="cv-btn-done-state" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Downloaded!</span>
      </span>`;

    fillEl = cvBtn.querySelector('#cvFill');
    pctEl  = cvBtn.querySelector('#cvPct');
  }

  async function handleClick() {
    if (btn.disabled) return;

    // Phase 1 — downloading
    // .cv-downloading applies background:var(--accent) via CSS,
    // making the white progress bar visible in BOTH light and dark mode.
    btn.disabled = true;
    btn.classList.add('cv-downloading');
    btn.setAttribute('aria-label', 'Downloading CV…');

    await runProgressAnimation();
    triggerDownload();

    // Phase 2 — success
    btn.classList.remove('cv-downloading');
    btn.classList.add('cv-done');
    btn.setAttribute('aria-label', 'CV downloaded');

    if (typeof window.showToast === 'function') {
      window.showToast('✅ CV downloaded successfully!', 'success');
    }

    // Phase 3 — reset
    setTimeout(() => {
      btn.classList.remove('cv-done');
      btn.disabled = false;
      btn.setAttribute('aria-label', 'Download CV');
      setProgress(0);
    }, RESET_MS);
  }

  function boot() {
    btn = document.getElementById('downloadCVBtn');
    if (!btn) return;
    buildButtonUI(btn);
    btn.addEventListener('click', handleClick);
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();