/**
 * download.js — CV Download with Blue Progress Animation
 * Works visibly in both Dark Mode and Light Mode
 */
'use strict';

(function initCVDownload() {
  const CV_FILE_ID    = '1WMkpszuSoUas1w5Odq3os433vnDiit-l';
  const DOWNLOAD_URL  = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
  const FILENAME      = 'Thirumala_Narasimha_Poluru_CV.pdf';
  const ANIM_DURATION = 2600;
  const RESET_DELAY   = 3200;
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let btn, bar, pct;

  // Ease out cubic — fast start, slow near 100%
  function ease(t) {
    if (t < 0.85) return 1 - Math.pow(1 - t / 0.85, 2.8) * 0.1;
    return 0.9 + (t - 0.85) / 0.15 * 0.1;
  }

  function animateProgress() {
    return new Promise(resolve => {
      if (REDUCED_MOTION) { setProgress(100); return setTimeout(resolve, 300); }
      const start = performance.now();
      function tick(now) {
        const raw = Math.min((now - start) / ANIM_DURATION, 1);
        const p   = Math.round(ease(raw) * 100);
        setProgress(p);
        if (raw < 1) requestAnimationFrame(tick);
        else resolve();
      }
      requestAnimationFrame(tick);
    });
  }

  function setProgress(p) {
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
  }

  function triggerDownload() {
    const a = Object.assign(document.createElement('a'), {
      href: DOWNLOAD_URL, download: FILENAME,
      rel: 'noopener noreferrer', style: 'display:none'
    });
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 500);
  }

  function showLoading() {
    btn.disabled = true;
    btn.classList.add('cv-downloading');
    btn.setAttribute('aria-label', 'Downloading CV…');
  }

  function showSuccess() {
    btn.classList.remove('cv-downloading');
    btn.classList.add('cv-done');
    btn.setAttribute('aria-label', 'CV Downloaded Successfully');
    setProgress(100);
  }

  function resetButton() {
    btn.classList.remove('cv-downloading', 'cv-done');
    btn.disabled = false;
    btn.setAttribute('aria-label', 'Download CV');
    setProgress(0);
  }

  function injectProgressUI(cvBtn) {
    cvBtn.innerHTML = `
      <span class="cv-btn-default-state">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>Download CV</span>
      </span>

      <span class="cv-btn-progress-state" aria-hidden="true">
        <span class="cv-progress-wrap">
          <span class="cv-progress-bar-bg">
            <span class="cv-progress-bar-fill" id="cvProgressFill"></span>
          </span>
          <span class="cv-progress-pct" id="cvProgressPct">0%</span>
        </span>
        <span class="cv-progress-text">Downloading…</span>
      </span>

      <span class="cv-btn-done-state" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Downloaded!</span>
      </span>`;

    bar = cvBtn.querySelector('#cvProgressFill');
    pct = cvBtn.querySelector('#cvProgressPct');
  }

  async function handleDownload() {
    if (btn.disabled) return;
    showLoading();
    await animateProgress();
    triggerDownload();
    showSuccess();
    if (typeof window.showToast === 'function') {
      window.showToast('✅ CV downloaded successfully!', 'success');
    }
    setTimeout(resetButton, RESET_DELAY);
  }

  function boot() {
    btn = document.getElementById('downloadCVBtn');
    if (!btn) return;
    injectProgressUI(btn);
    btn.addEventListener('click', handleDownload);
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDownload(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
