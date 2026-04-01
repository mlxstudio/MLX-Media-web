/* MLX Highlight & AI Action Buttons
   Patched: smooth 2.5s fade, no collapse-to-dot, 300% pulsing arrow,
   nav-arrow points up from below, section-arrow points down from above.
*/
(function () {
  const CSS = `
  /* ---------- Premium AI action button ---------- */
  .mlx-ai-btn {
    -webkit-appearance:none; appearance:none; border:none;
    padding: 4px 12px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 14px;
    background-color: #00BFA6;
    color: white;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    transition: transform .15s ease, box-shadow .2s ease, background-color .2s ease;
    display:inline-flex; align-items:center; gap:.55em; text-decoration:none;
  }
  .mlx-ai-btn:focus{ outline:none; box-shadow:0 0 0 3px rgba(0,191,166,.3); }
  .mlx-ai-btn:hover{ transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,0,0,.15); background-color: #00a38a; }
  .mlx-ai-btn:active{ transform:translateY(0); box-shadow:0 2px 6px rgba(0,0,0,.12); }
  .mlx-ai-btn .mlx-icon{ font-size:1.05em; }

  /* ---------- Glowing outline rings (nav + section) ---------- */
  #mlx-nav-ring, #mlx-section-ring {
    position:absolute;
    left:0; top:0;
    width:0; height:0;
    opacity:0;
    visibility:hidden;
    border-radius:18px;
    pointer-events:none;
    z-index:9998;
  box-shadow:
    0 0 4px rgba(0,255,210,0.7),   /* tight core glow (bright cyan/teal) */
    0 0 8px rgba(0,191,166,0.65),  /* small outer glow */
    0 0 14px rgba(0,255,200,0.5),  /* subtle halo */
    inset 0 0 6px rgba(0,255,220,0.6); /* inner glow for neon effect */
    transform-origin: center center;
    /* important: only opacity uses a long transition; size/shape transitions are short */
    transition:
      transform 220ms cubic-bezier(.2,.9,.2,1),
      width 220ms cubic-bezier(.2,.9,.2,1),
      height 220ms cubic-bezier(.2,.9,.2,1),
      border-radius 220ms cubic-bezier(.2,.9,.2,1),
      opacity 2.5s ease-out,
      border-width 220ms ease;
    box-sizing: border-box;
    overflow: visible; /* let arrow pseudo-element display outside */
  }

  /* visible / fading states */
  #mlx-nav-ring.is-visible, #mlx-section-ring.is-visible {
    opacity: 1;
    visibility: visible;
  }
  #mlx-nav-ring.is-fading, #mlx-section-ring.is-fading {
    opacity: 0;
    /* keep visibility so it fades visually while still occupying the same size */
    visibility: visible;
    pointer-events: none;
  }

  /* Specific styles for each ring */
  #mlx-nav-ring { border: 3px solid rgba(0,191,166,.95); } /* nav */
  #mlx-section-ring { border: 4px solid rgba(0,191,166,.95); } /* sections/footer */

  /* reduced motion */
  @media (prefers-reduced-motion: reduce){
    #mlx-nav-ring, #mlx-section-ring{ transition:none !important; animation:none !important; }
  }

  /* ---------- Giant pulsing arrow for all rings (300% scale) ---------- */
  /* Use a single definition, then override placement for nav vs section */
  #mlx-nav-ring::after,
  #mlx-section-ring::after {
    content: "➜";
    position: absolute;
    font-size: 1.2em;           /* base glyph size; scale handles the visual size */
    color: #00BFA6;
    opacity: 0;
    transform-origin: center;
    animation: mlx-pulse 1.4s infinite ease-in-out;
    transition: opacity 0.8s ease, transform 0.8s ease;
    pointer-events: none;
    text-shadow: 0 6px 20px rgba(0,191,166,0.12);
  }

  /* NAV arrow: placed below the item, pointing UP (rotate -90deg) */
  #mlx-nav-ring::after {
    left: 50%;
    bottom: -44px; /* below the nav element */
    transform: translateX(-50%) rotate(-90deg) scale(3); /* 300% */
    font-size: 1.6em;
  }

  /* SECTION/FOOTER arrow: placed above the section, pointing DOWN (rotate 90deg) */
  #mlx-section-ring::after {
    left: 50%;
    top: -44px; /* above the section */
    transform: translateX(-50%) rotate(90deg) scale(3); /* 300% */
    font-size: 1.6em;
  }

  /* When ring is visible -> show arrow */
  #mlx-nav-ring.is-visible::after,
  #mlx-section-ring.is-visible::after {
    opacity: 1;
  }

  /* When fading, arrow fades out with ring over 2.5s */
  #mlx-nav-ring.is-fading::after,
  #mlx-section-ring.is-fading::after {
    opacity: 0;
    transition: opacity 2.5s ease-out, transform 2.5s ease-out;
  }

  @keyframes mlx-pulse {
    0%   { transform: scale(2.85) translateX(-50%); opacity: 0.85; }
    50%  { transform: scale(3.15) translateX(-50%); opacity: 1; }
    100% { transform: scale(2.85) translateX(-50%); opacity: 0.85; }
  }

/* NAV arrow: points UP */
#mlx-nav-ring::after {
  content: "▲";              
  position: absolute;
  display: block;
  left: 50%;
  bottom: -80px;              /* a bit lower so it's clear */
  transform: translateX(-50%) scale(2);
  font-size: 1.6em;
  animation: navArrowBob 1.4s infinite ease-in-out;
}

#mlx-nav-ring::after,
#mlx-section-ring::after {
  text-shadow:
    2px 3px 3px rgba(0,0,0,0.65),   /* sharper, closer shadow */
    4px 6px 8px rgba(0,0,0,0.5);    /* softer depth shadow */
}


/* SECTION/FOOTER arrow: points DOWN */
#mlx-section-ring::after {
  content: "▼";              
  position: absolute;
  display: block;
  left: 50%;
  top: -140px;                 /* a bit higher so it's clear */
  transform: translateX(-50%) scale(3);
  font-size: 1.6em;
  animation: sectionArrowBob 1.4s infinite ease-in-out;
}


/* NAV arrow bobbing up and down (points upward) */
@keyframes navArrowBob {
  0%, 100% { transform: translateX(-50%) translateY(0) scale(1.8); opacity: 1; }
  50%      { transform: translateX(-50%) translateY(-20px) scale(1.8); opacity: 1; }
}

/* SECTION arrow bobbing down and up (points downward) */
@keyframes sectionArrowBob {
  0%, 100% { transform: translateX(-50%) translateY(0) scale(3); opacity: 1; }
  50%      { transform: translateX(-50%) translateY(40px) scale(3); opacity: 1; }
}



  `;

  // Inject CSS once
  function ensureCSS(){
    if(document.getElementById('mlx-highlight-css')) return;
    const style = document.createElement('style');
    style.id = 'mlx-highlight-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // Create overlay rings once
  function ensureRings(){
    if(document.getElementById('mlx-nav-ring') && document.getElementById('mlx-section-ring')) return;
    const navRing = document.createElement('div'); navRing.id = 'mlx-nav-ring'; navRing.setAttribute('aria-hidden','true');
    const sectionRing = document.createElement('div'); sectionRing.id = 'mlx-section-ring'; sectionRing.setAttribute('aria-hidden','true');
    document.body.appendChild(navRing); document.body.appendChild(sectionRing);
  }

  function rectWithPadding(el, pad){
    const r = el.getBoundingClientRect();
    const x = Math.round(r.left + window.scrollX - pad);
    const y = Math.round(r.top + window.scrollY - pad);
    const w = Math.round(r.width + pad*2);
    const h = Math.round(r.height + pad*2);
    return {x,y,w,h};
  }

  function shapeRadius(shape, w, h){
    if(shape === 'circle') return Math.max(w,h)/2 + 'px';
    if(shape === 'rounded') return '18px';
    return '6px';
  }

  // Show ring: set inline size/position and make visible.
  function showRing(ring, el, {shape='rounded', pad=undefined}={}){
    if(!ring || !el) return;
    // choose sane default padding: small for nav, larger for big sections
    if(pad === undefined) pad = (ring.id === 'mlx-nav-ring' ? 0 : 12);

    // cancel any pending hide timer so it won't collapse mid-fade
    if(ring._fadeTimer){ clearTimeout(ring._fadeTimer); ring._fadeTimer = null; }

    const {x,y,w,h} = rectWithPadding(el, pad);
    // Apply position & size (inline styles) so CSS transitions apply from current values
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    ring.style.width = w + 'px';
    ring.style.height = h + 'px';
    ring.style.borderRadius = shapeRadius(shape, w, h);
    // Make visible (opacity will transition to 1 over 2.5s)
    ring.classList.remove('is-fading');
    ring.classList.add('is-visible');
  }

  // Hide ring, but keep its inline size while opacity transitions.
  function hideRing(ring){
    if(!ring) return;
    // If already fading, reset timer
    if(ring._fadeTimer) clearTimeout(ring._fadeTimer);
    // remove visible, add fading (opacity -> 0 over 2.5s)
    ring.classList.remove('is-visible');
    ring.classList.add('is-fading');
    // After fade completes, clean up inline sizes so ring no longer occupies space
    ring._fadeTimer = setTimeout(() => {
      ring.classList.remove('is-fading');
      // Clear inline sizing/position so next show starts from zero
      ring.style.width = '0px';
      ring.style.height = '0px';
      ring.style.left = '0px';
      ring.style.top = '0px';
      ring.style.borderRadius = '18px';
      ring._fadeTimer = null;
    }, 2500); // 2.5s to match CSS opacity transition
  }

  // Persist highlight across pages
  const STORAGE_KEY = 'mlx-persist-highlight';
  function persistHighlight(payload){ sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); }
  function readPersisted(){ try{ return JSON.parse(sessionStorage.getItem(STORAGE_KEY)||'null'); }catch{ return null; } }
  function clearPersisted(){ sessionStorage.removeItem(STORAGE_KEY); }

  // Keep section highlight until it scrolls out significantly or user interacts
  let activeSectionTarget = null;
  let sectionIO = null;
  function makeSectionSticky(target, shape){
    const ring = document.getElementById('mlx-section-ring');
    activeSectionTarget = target;
    if(sectionIO) sectionIO.disconnect();
    sectionIO = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if(ent.target !== activeSectionTarget) return;
        if(ent.intersectionRatio < 0.08){
          hideRing(ring);
          activeSectionTarget = null;
          sectionIO.disconnect();
        } else {
          showRing(ring, ent.target, {shape});
        }
      });
    }, {threshold:[0, .08, .2, 1]});
    sectionIO.observe(target);
    // reposition on scroll/resize while active
    const rebinder = () => { if(activeSectionTarget) showRing(ring, activeSectionTarget, {shape}); };
    window.addEventListener('scroll', rebinder, {passive:true});
    window.addEventListener('resize', rebinder);
  }

  function applyPersistedOnLoad(){
    const data = readPersisted();
    if(!data) return;
    // Only apply if path matches (ignoring domain)
    if(data.path && data.path !== location.pathname) return;
    if(data.target){
      const el = document.querySelector(data.target);
      if(el){
        setTimeout(() => {
          try{ el.scrollIntoView({behavior:'smooth', block:'center'}); }catch{}
          const ring = document.getElementById('mlx-section-ring');
          showRing(ring, el, {shape:data.outline||'rounded'});
          makeSectionSticky(el, data.outline||'rounded');
        }, 80);
      }
    }
    // Clear nav preview ring if any
    hideRing(document.getElementById('mlx-nav-ring'));
    clearPersisted();
  }

  // Delegated interactions for any .mlx-ai-btn (even if injected later by AI)
  function onPointerOver(e){
    const btn = e.target.closest('.mlx-ai-btn');
    if(!btn) return;
    // Highlight nav item preview
    const navSel = btn.dataset.nav;
    const navEl = navSel ? document.querySelector(navSel) : null;
    const shape = btn.dataset.outline || 'rounded';
    if(navEl){ showRing(document.getElementById('mlx-nav-ring'), navEl, {shape}); }
    // If target exists on this page (same-page link), preview that too
    const targetSel = btn.dataset.target;
    const targetEl = targetSel ? document.querySelector(targetSel) : null;
    if(targetEl){ showRing(document.getElementById('mlx-section-ring'), targetEl, {shape}); }
  }
  function onPointerOut(e){
    const btn = e.target.closest('.mlx-ai-btn');
    if(!btn) return;
    // hide preview rings; sticky section highlight remains if activeSectionTarget set
    hideRing(document.getElementById('mlx-nav-ring'));
    if(!activeSectionTarget) hideRing(document.getElementById('mlx-section-ring'));
  }
  function onClick(e){
    const btn = e.target.closest('.mlx-ai-btn');
    if(!btn) return;
    const href = btn.dataset.dest; // e.g. "technika.html#osvetleni"
    if(!href) return;
    e.preventDefault();
    const URLAbs = new URL(href, location.origin);
    // Persist for next page
    persistHighlight({
      path: URLAbs.pathname,
      target: btn.dataset.target || URLAbs.hash || '',
      outline: btn.dataset.outline || 'rounded'
    });
    // Navigate
    location.href = href;
  }

  // Public helper if you prefer JS instead of data-* attributes
  function registerHighlightButton(element, {dest, navSelector, targetSelector, outline='rounded'}={}){
    if(!element) return;
    element.classList.add('mlx-ai-btn');
    if(dest) element.dataset.dest = dest;
    if(navSelector) element.dataset.nav = navSelector;
    if(targetSelector) element.dataset.target = targetSelector;
    element.dataset.outline = outline;
  }

  function mount(){
    ensureCSS();
    ensureRings();
    applyPersistedOnLoad();
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
    document.addEventListener('click', onClick);
    // ESC clears highlights
    document.addEventListener('keydown', (ev)=>{ if(ev.key==='Escape'){ hideRing(document.getElementById('mlx-nav-ring')); hideRing(document.getElementById('mlx-section-ring')); activeSectionTarget=null; } });
    // ensure rings reposition on resize while visible
    window.addEventListener('resize', () => {
      const navRing = document.getElementById('mlx-nav-ring');
      const sectionRing = document.getElementById('mlx-section-ring');
      // try to re-show with previous targets if any (safe no-op if none)
      if(navRing && navRing.classList.contains('is-visible') && navRing._lastTarget) showRing(navRing, navRing._lastTarget, {});
      if(sectionRing && sectionRing.classList.contains('is-visible') && sectionRing._lastTarget) showRing(sectionRing, sectionRing._lastTarget, {});
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  // Expose minimal API
  window.MLXHighlight = { registerHighlightButton };
})();
