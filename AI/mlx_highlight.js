/* MLX Highlight & AI Action Buttons – v3.1
   - All colors use CSS variables: rings/arrows match dark (orange) or light (teal)
   - Dedup guard: sets window._mlxHLMounted synchronously so ChatBot.js
     skips registering duplicate event listeners.
   - CSS is self-contained (works on pages without ChatBot.css too).
*/
(function () {

  // ── Dedup guard ─────────────────────────────────────────────
  // This runs synchronously at script-load time, before DOMContentLoaded.
  // ChatBot.js checks this flag inside its HL.mount() (which fires on
  // DOMContentLoaded) and skips registering duplicate listeners.
  if (window._mlxHLMounted) return;
  window._mlxHLMounted = true;

  // ── Injected CSS ────────────────────────────────────────────
  // All accent colors use CSS variables with teal fallbacks.
  // On pages with the MLX dark/light theme, --accent automatically
  // switches between orange and teal, so the rings always match.
  const CSS = `
  /* ---- AI action button ---- */
  .mlx-ai-btn {
    -webkit-appearance: none; appearance: none;
    display: inline-flex; align-items: center; gap: 6px;
    margin: 4px 4px 0 0; padding: 5px 14px;
    border-radius: 9999px;
    border: 1.5px solid var(--accent, #00BFA6);
    background: var(--accent-soft, rgba(0,191,166,0.10));
    color: var(--accent, #00BFA6);
    font-weight: 600; font-size: 13px;
    font-family: var(--font-body, 'DM Sans', sans-serif);
    cursor: pointer; text-decoration: none;
    transition: background 0.2s, transform 0.15s ease, box-shadow 0.2s, color 0.2s;
  }
  .mlx-ai-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-glow, rgba(0,191,166,0.25));
  }
  .mlx-ai-btn:hover {
    background: var(--accent, #00BFA6);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px var(--accent-glow, rgba(0,191,166,0.40));
  }
  .mlx-ai-btn:active { transform: translateY(0); }
  .mlx-ai-btn .mlx-icon { font-size: 1.05em; }

  /* ---- Glowing outline rings ---- */
  #mlx-nav-ring, #mlx-section-ring {
    position: absolute; left: 0; top: 0;
    width: 0; height: 0;
    opacity: 0; visibility: hidden;
    border-radius: 18px; pointer-events: none; z-index: 9998;
    box-shadow:
      0 0 5px  var(--accent-glow, rgba(0,255,210,0.65)),
      0 0 12px var(--accent-glow, rgba(0,191,166,0.50)),
      0 0 24px var(--accent-glow, rgba(0,191,166,0.25)),
      inset 0 0 8px var(--accent-soft, rgba(0,255,220,0.20));
    transition:
      width  220ms cubic-bezier(.2,.9,.2,1),
      height 220ms cubic-bezier(.2,.9,.2,1),
      border-radius 220ms cubic-bezier(.2,.9,.2,1),
      opacity 2.5s ease-out;
    box-sizing: border-box; overflow: visible;
  }
  #mlx-nav-ring     { border: 4px solid var(--accent, rgba(0,191,166,.95)); }
  #mlx-section-ring { border: 4px solid var(--accent, rgba(0,191,166,.95)); }

  #mlx-nav-ring.is-visible, #mlx-section-ring.is-visible { opacity: 1; visibility: visible; }
  #mlx-nav-ring.is-fading,  #mlx-section-ring.is-fading  {
    opacity: 0; visibility: visible; pointer-events: none;
  }

  /* ---- Arrows ---- */
  #mlx-nav-ring::after, #mlx-section-ring::after {
    position: absolute; display: block;
    left: 50%;
    color: var(--accent, #00BFA6);
    font-size: 1.4em; opacity: 0; pointer-events: none;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
  }
  #mlx-nav-ring.is-visible::after,
  #mlx-section-ring.is-visible::after { opacity: 1; }
  #mlx-nav-ring.is-fading::after,
  #mlx-section-ring.is-fading::after  { opacity: 0; transition: opacity 2.5s ease-out; }

  /* NAV arrow – below element, points UP */
  #mlx-nav-ring::after {
    content: "▲";
    bottom: -60px;
    transform: translateX(-50%) scale(1.8);
    animation: mlxNavBob 1.4s ease-in-out infinite;
  }
  /* SECTION arrow – above element, points DOWN */
  #mlx-section-ring::after {
    content: "▼";
    top: -100px;
    transform: translateX(-50%) scale(2.8);
    animation: mlxSectionBob 1.4s ease-in-out infinite;
  }

  @keyframes mlxNavBob {
    0%, 100% { transform: translateX(-50%) translateY(0)    scale(1.8); }
    50%       { transform: translateX(-50%) translateY(-16px) scale(1.8); }
  }
  @keyframes mlxSectionBob {
    0%, 100% { transform: translateX(-50%) translateY(0)   scale(2.8); }
    50%       { transform: translateX(-50%) translateY(32px) scale(2.8); }
  }

  section[id], footer, #footer, [data-scroll-target] { scroll-margin-top: 80px; }

  @media (prefers-reduced-motion: reduce) {
    #mlx-nav-ring, #mlx-section-ring { transition: none !important; animation: none !important; }
  }
  `;

  // ── DOM helpers ─────────────────────────────────────────────
  function ensureCSS() {
    if (document.getElementById('mlx-highlight-css')) return;
    const s = document.createElement('style');
    s.id = 'mlx-highlight-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function ensureRings() {
    ['mlx-nav-ring', 'mlx-section-ring'].forEach(id => {
      if (document.getElementById(id)) return;
      const d = document.createElement('div');
      d.id = id; d.setAttribute('aria-hidden', 'true');
      document.body.appendChild(d);
    });
  }

  function rectPadded(el, pad) {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.left + window.scrollX - pad),
      y: Math.round(r.top  + window.scrollY - pad),
      w: Math.round(r.width  + pad * 2),
      h: Math.round(r.height + pad * 2),
    };
  }

  function borderRadius(shape, w, h) {
    if (shape === 'circle')  return Math.max(w, h) / 2 + 'px';
    if (shape === 'rounded') return '18px';
    return '6px';
  }

  // ── Ring show / hide ─────────────────────────────────────────
  function showRing(ring, el, { shape = 'rounded', pad } = {}) {
    if (!ring || !el) return;
    if (pad === undefined) pad = ring.id === 'mlx-nav-ring' ? 9 : 14;
    if (ring._fadeTimer) { clearTimeout(ring._fadeTimer); ring._fadeTimer = null; }
    const { x, y, w, h } = rectPadded(el, pad);
    ring.style.left = x + 'px'; ring.style.top    = y + 'px';
    ring.style.width = w + 'px'; ring.style.height = h + 'px';
    ring.style.borderRadius = borderRadius(shape, w, h);
    ring.classList.remove('is-fading');
    ring.classList.add('is-visible');
    ring._lastEl = el; ring._lastShape = shape;
  }

  function hideRing(ring) {
    if (!ring) return;
    if (ring._fadeTimer) clearTimeout(ring._fadeTimer);
    ring.classList.remove('is-visible');
    ring.classList.add('is-fading');
    ring._fadeTimer = setTimeout(() => {
      ring.classList.remove('is-fading');
      ['width','height','left','top'].forEach(p => ring.style[p] = '0px');
      ring.style.borderRadius = '18px';
      ring._fadeTimer = null;
    }, 2500);
  }

  // ── Persistent highlight across page navigation ─────────────
  const HL_KEY = 'mlx-hl-persist';
  function persistHL(data) { try { sessionStorage.setItem(HL_KEY, JSON.stringify(data)); } catch {} }
  function readHL()        { try { return JSON.parse(sessionStorage.getItem(HL_KEY) || 'null'); } catch { return null; } }
  function clearHL()       { try { sessionStorage.removeItem(HL_KEY); } catch {} }

  // ── Sticky section (stays highlighted while in view) ────────
  let activeSectionEl = null;
  let sectionIO       = null;

  function stickySection(el, shape) {
    const ring = document.getElementById('mlx-section-ring');
    activeSectionEl = el;
    if (sectionIO) sectionIO.disconnect();
    sectionIO = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.target !== activeSectionEl) return;
        if (ent.intersectionRatio < 0.08) {
          hideRing(ring); activeSectionEl = null; sectionIO.disconnect();
        } else {
          showRing(ring, ent.target, { shape });
        }
      });
    }, { threshold: [0, 0.08, 0.2, 1] });
    sectionIO.observe(el);
    const reposition = () => { if (activeSectionEl) showRing(ring, activeSectionEl, { shape }); };
    window.addEventListener('scroll', reposition, { passive: true });
    window.addEventListener('resize', reposition);
  }

  function applyPersisted() {
    const data = readHL();
    if (!data) return;
    if (data.path && data.path !== location.pathname) return;
    if (data.target) {
      const el = document.querySelector(data.target)
              || document.getElementById(data.target.replace(/^#/, ''))
              || null;
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const ring = document.getElementById('mlx-section-ring');
          showRing(ring, el, { shape: data.outline || 'rounded' });
          stickySection(el, data.outline || 'rounded');
        }, 120);
      }
    }
    hideRing(document.getElementById('mlx-nav-ring'));
    clearHL();
  }

  // ── Button click ─────────────────────────────────────────────
  function handleBtnClick(btn) {
    const dest      = btn.dataset.dest || btn.getAttribute('href') || '';
    const targetSel = btn.dataset.target || '';
    const outline   = btn.dataset.outline || 'rounded';
    if (!dest) return;

    if (dest.startsWith('mailto:') || dest.startsWith('tel:')) {
      window.location.href = dest; return;
    }
    const isHash     = dest.startsWith('#');
    const url        = new URL(dest, location.origin);
    const isSamePage = url.pathname === location.pathname || isHash;

    if (isSamePage) {
      const sel = targetSel || (isHash ? dest : url.hash);
      const el  = sel ? (document.querySelector(sel) || document.getElementById(sel.replace(/^#/, ''))) : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const ring = document.getElementById('mlx-section-ring');
        showRing(ring, el, { shape: outline });
        stickySection(el, outline);
      }
      return;
    }

    persistHL({ path: url.pathname, target: targetSel || url.hash, outline });
    location.href = dest;
  }

  // ── DOM events ───────────────────────────────────────────────
  function mount() {
    ensureCSS();
    ensureRings();
    applyPersisted();

    document.addEventListener('pointerover', e => {
      const btn = e.target.closest('.mlx-ai-btn');
      if (!btn) return;
      const shape  = btn.dataset.outline || 'rounded';
      const navSel = btn.dataset.nav;
      const navEl  = navSel ? document.querySelector(navSel) : null;
      if (navEl) showRing(document.getElementById('mlx-nav-ring'), navEl, { shape });
      const tgtSel = btn.dataset.target;
      const tgtEl  = tgtSel
        ? (document.querySelector(tgtSel) || document.getElementById(tgtSel.replace(/^#/, '')))
        : null;
      if (tgtEl && !activeSectionEl) showRing(document.getElementById('mlx-section-ring'), tgtEl, { shape });
    });

    document.addEventListener('pointerout', e => {
      if (!e.target.closest('.mlx-ai-btn')) return;
      hideRing(document.getElementById('mlx-nav-ring'));
      if (!activeSectionEl) hideRing(document.getElementById('mlx-section-ring'));
    });

    document.addEventListener('click', e => {
      const btn = e.target.closest('.mlx-ai-btn');
      if (!btn) return;
      e.preventDefault();
      handleBtnClick(btn);
    });

    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      hideRing(document.getElementById('mlx-nav-ring'));
      hideRing(document.getElementById('mlx-section-ring'));
      activeSectionEl = null;
    });

    window.addEventListener('resize', () => {
      ['mlx-nav-ring', 'mlx-section-ring'].forEach(id => {
        const r = document.getElementById(id);
        if (r && r.classList.contains('is-visible') && r._lastEl)
          showRing(r, r._lastEl, { shape: r._lastShape });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // ── Public API ───────────────────────────────────────────────
  window.MLXHighlight = {
    showRing,
    hideRing,
    stickySection,
    registerButton(el, { dest, navSelector, targetSelector, outline = 'rounded' } = {}) {
      if (!el) return;
      el.classList.add('mlx-ai-btn');
      if (dest)           el.dataset.dest   = dest;
      if (navSelector)    el.dataset.nav    = navSelector;
      if (targetSelector) el.dataset.target = targetSelector;
      el.dataset.outline = outline;
    },
  };

})();