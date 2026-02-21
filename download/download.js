'use strict';
(function() {
  const CV_FILE_ID   = '1WMkpszuSoUas1w5Odq3os433vnDiit-l';
  const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
  const FILENAME     = 'Thirumala_Narasimha_Poluru_CV.pdf';

  const btn       = document.getElementById('dlBtn');
  const progWrap  = document.getElementById('dlProgress');
  const fill      = document.getElementById('dlProgressFill');
  const pct       = document.getElementById('dlProgressPct');
  if (!btn) return;

  function ease(t) { return t < 0.85 ? 1 - Math.pow(1 - t/0.85, 2.8)*0.1 : 0.9+(t-0.85)/0.15*0.1; }

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.querySelector('.dl-btn-text').textContent = 'Downloading…';
    progWrap.style.display = 'flex';
    const start = performance.now();
    await new Promise(resolve => {
      function tick(now) {
        const raw = Math.min((now - start) / 2600, 1);
        const p   = Math.round(ease(raw) * 100);
        fill.style.width = p + '%';
        pct.textContent  = p + '%';
        if (raw < 1) requestAnimationFrame(tick); else resolve();
      }
      requestAnimationFrame(tick);
    });
    const a = Object.assign(document.createElement('a'), { href: DOWNLOAD_URL, download: FILENAME, rel: 'noopener' });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    btn.querySelector('.dl-btn-text').textContent = '✅ Downloaded!';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.disabled = false;
      btn.querySelector('.dl-btn-text').textContent = 'Download CV (PDF)';
      btn.style.background = '';
      progWrap.style.display = 'none';
      fill.style.width = '0%'; pct.textContent = '0%';
    }, 3200);
  });
})();
