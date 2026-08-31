/**
 * MLX Media — Neon Diamond Cursor
 * Drop-in: add <script src="mlx-cursor.js" defer></script> to <head>
 *
 * Uses your page's existing CSS variables automatically:
 *   --accent  (orange #FF8A00 / teal #00BFA6)
 *   --glow    (rgba glow colour matching accent)
 * If those variables aren't defined on a page, it falls back to orange.
 *
 * Cursor states are triggered by data attributes on your elements:
 *   data-cursor="email"   → envelope cursor
 *   data-cursor="video"   → play triangle (white ghost + accent)
 *   data-cursor="photo"   → image icon (rectangle + sun + mountains)
 *   data-cursor="nav"     → underline bar cursor
 *   data-cursor="ai"      → AI/robot cursor
 *   data-cursor="calendar"→ calendar cursor
 *   data-cursor="call"    → phone cursor
 *   data-cursor="theme"   → half-moon / half-sun toggle cursor
 *   data-cursor="award"   → trophy cup cursor
 *   data-cursor="nextpage"→ chevron arrow cursor
 *   data-cursor="message" → speech bubble cursor
 *   .nav-links a          → also triggers nav cursor automatically
 *   <a> (any plain link)  → 20° lean diamond
 *   <button>, cards       → hover glow
 *   <p>, text nodes       → I-beam, trail pauses
 *
 * Tweakable constants at the top of this file:
 */

(function () {

  /* ── Configuration ─────────────────────────── */
  const TRAIL_LEN   = 12;   // trail decay length  (3–24)
  const TRAIL_SPEED = 5;    // trail spawn rate     (1–10)
  const TRAIL_SIZE  = 4;    // trail particle size  (2–12)
  const MAG_RANGE   = 92;   // magnetic pull radius in px
  const MAG_PULL    = 0.35; // magnetic pull strength (0–1)
  /* ─────────────────────────────────────────── */

  /* ── Inject CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #mlx-cursor {
      position: fixed; top: 0; left: 0;
      z-index: 100001; pointer-events: none;
      width: 7px; height: 7px;
      background: var(--accent, #FF8A00);
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.88),
        0 0 10px 2px var(--glow, rgb(from var(--accent) r g b / 0.55)),
        0 0 14px 3px var(--glow, rgb(from var(--accent) r g b / 0.55));
      transform: translate(-50%,-50%) rotate(45deg);
      transition:
        width .2s cubic-bezier(0.22,1,0.36,1),
        height .2s cubic-bezier(0.22,1,0.36,1),
        border-radius .2s cubic-bezier(0.22,1,0.36,1),
        background .2s,
        box-shadow .2s;
      will-change: transform;
    }

    /* Hover — cards, buttons */
    body.mlx-hovering #mlx-cursor {
      width: 9px; height: 9px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.88),
        0 0 10px 3px var(--glow, rgb(from var(--accent) r g b / 0.55)),
        0 0 20px 6px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }

    /* Link — 20° lean, slightly larger */
    body.mlx-link #mlx-cursor {
      width: 8px; height: 8px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.88),
        0 0 8px 2px var(--glow, rgb(from var(--accent) r g b / 0.55)),
        0 0 16px 5px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }

    /* Text — I-beam */
    body.mlx-text #mlx-cursor {
      width: 2px; height: 14px; border-radius: 1px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.7),
        0 0 4px 2px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }

    /* Click — flash white */
    body.mlx-clicking #mlx-cursor {
      width: 3px; height: 3px; background: #ffffff;
      box-shadow:
        0 0 0 1.5px rgba(255,255,255,0.5),
        0 0 16px 6px var(--glow, rgb(from var(--accent) r g b / 0.85)),
        0 0 36px 12px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }

    /* Email — envelope with V-flap + bottom fold */
    body.mlx-email #mlx-cursor {
      width: 21px; height: 14px; border-radius: 3px;
      background: transparent;
      border: 1px solid var(--accent, #FF8A00);
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.55),
        0 0 14px 4px var(--glow, rgb(from var(--accent) r g b / 0.55));
      overflow: visible;
    }
    body.mlx-email #mlx-cursor::before {
      content: '';
      position: absolute;
      top: 1.5px; left: 1.5px; right: 1.5px;
      height: calc(50% - 0.5px);
      clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
      background: var(--accent, #FF8A00);
      opacity: 0.6;
    }
    body.mlx-email #mlx-cursor::after {
      content: '';
      position: absolute;
      bottom: 1.5px; left: 1.5px; right: 1.5px;
      height: calc(40% - 0.5px);
      clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
      background: var(--accent, #FF8A00);
      opacity: 0.28;
    }

    /* Video — play triangle only */
    body.mlx-video #mlx-cursor {
      width: 24px; height: 24px;
      background: transparent;
      border: none;
      box-shadow: none;
      overflow: visible;
    }
    /* White ghost triangle — slightly larger, behind */
    body.mlx-video #mlx-cursor::before {
      content: '';
      position: absolute;
      top: 50%; left: 52%;
      transform: translate(-50%, -50%);
      width: 0; height: 0;
      border-style: solid;
      border-width: 8px 0 8px 14px;
      border-color: transparent transparent transparent rgba(255,255,255,0.55);
      filter: blur(1px);
    }
    /* Accent triangle — sharp, in front */
    body.mlx-video #mlx-cursor::after {
      content: '';
      position: absolute;
      top: 50%; left: 52%;
      transform: translate(-50%, -50%);
      width: 0; height: 0;
      border-style: solid;
      border-width: 7px 0 7px 12px;
      border-color: transparent transparent transparent var(--accent, #FF8A00);
      filter: drop-shadow(0 0 4px var(--glow, rgb(from var(--accent) r g b / 0.6)));
    }

    /* Photo — image icon: rectangle frame + SVG scene (sun + mountains) */
    body.mlx-photo #mlx-cursor {
      width: 36px; height: 28px;
      background: transparent;
      border: none;
      box-shadow: none;
      overflow: visible;
    }
    /* White ghost frame behind */
    body.mlx-photo #mlx-cursor::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 1.5px solid rgba(255,255,255,0.35);
      border-radius: 3px;
      box-shadow:
        0 0 10px 3px rgba(255,255,255,0.12),
        0 0 20px 5px var(--glow, rgb(from var(--accent) r g b / 0.3));
      filter: blur(0.8px);
    }
    /* Accent frame */
    body.mlx-photo #mlx-cursor::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--accent, #FF8A00);
      border-radius: 3px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.2),
        0 0 14px 4px var(--glow, rgb(from var(--accent) r g b / 0.6));
    }
    /* SVG scene inside — sun dot top-right, mountain horizon bottom */
    body.mlx-photo #mlx-cursor .photo-scene {
      position: absolute;
      inset: 4px;
      overflow: hidden;
      border-radius: 1px;
    }
    body.mlx-photo #mlx-cursor .photo-scene svg {
      width: 100%; height: 100%;
      overflow: visible;
    }

    /* Nav — horizontal underline bar */
    body.mlx-nav #mlx-cursor {
      width: 17px; height: 2px; border-radius: 2px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.6),
        0 0 8px 2px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }

    /* AI — refined marker */
    body.mlx-ai #mlx-cursor {
      width: 13px; height: 13px; border-radius: 6px;
      background: transparent;
      border: 1.2px solid var(--accent, #FF8A00);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.3), 0 0 10px 2px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }

    /* Calendar — calendar icon */
    body.mlx-calendar #mlx-cursor {
      width: 13px; height: 12px;
      background: transparent;
      border: 1.5px solid var(--accent, #FF8A00);
      border-radius: 2px;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.3), 0 0 8px 2px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }
    body.mlx-calendar #mlx-cursor::before {
      content: '';
      position: absolute;
      top: 1px; left: 1px; right: 1px; height: 2px;
      background: var(--accent, #FF8A00);
      border-radius: 1px;
    }
    body.mlx-calendar #mlx-cursor::after {
      content: '';
      position: absolute;
      top: 5px; left: 1px; width: 2px; height: 2px; background: var(--accent, #FF8A00);
      border-radius: 1px;
    }

    /* Call — phone icon */
    body.mlx-call #mlx-cursor {
      width: 12px; height: 16px;
      background: transparent;
      border: 1.5px solid var(--accent, #FF8A00);
      border-radius: 3px;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.3), 0 0 10px 2px var(--glow, rgb(from var(--accent) r g b / 0.55));
    }
    body.mlx-call #mlx-cursor::before {
      content: '';
      position: absolute;
      top: 3px; left: 3px; width: 7px; height: 2px;
      background: var(--accent, #FF8A00);
      border-radius: 1px;
    }
    body.mlx-call #mlx-cursor::after {
      content: '';
      position: absolute;
      bottom: 3px; left: 4px; width: 4px; height: 2px;
      background: var(--accent, #FF8A00);
      border-radius: 1px;
    }

    /* Hide inner SVG children by default — only shown in their own state */
    #mlx-cursor .photo-scene,
    #mlx-cursor .award-icon,
    #mlx-cursor .message-icon { display: none; }

    body.mlx-photo   #mlx-cursor .photo-scene  { display: block; }
    body.mlx-award   #mlx-cursor .award-icon   { display: block; }
    body.mlx-message #mlx-cursor .message-icon { display: block; }

    /* Award — trophy cup */
    body.mlx-award #mlx-cursor {
      width: 22px; height: 26px;
      background: transparent;
      border: none; box-shadow: none;
      overflow: visible;
    }
    body.mlx-award #mlx-cursor .award-icon {
      position: absolute; inset: 0;
    }
    body.mlx-award #mlx-cursor .award-icon svg {
      width: 22px; height: 26px; overflow: visible;
      filter: drop-shadow(0 0 5px var(--glow, rgb(from var(--accent) r g b / 0.7)));
    }

    /* Next page — chevron › */
    body.mlx-nextpage #mlx-cursor {
      width: 20px; height: 28px;
      background: transparent;
      border: none; box-shadow: none;
      overflow: visible;
    }
    body.mlx-nextpage #mlx-cursor::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 12px; height: 12px;
      border-top: 2.5px solid rgba(255,255,255,0.65);
      border-right: 2.5px solid rgba(255,255,255,0.65);
      transform: translate(-65%, -50%) rotate(45deg) scale(1.18);
      filter: blur(1.2px);
      z-index: -1;
    }
    body.mlx-nextpage #mlx-cursor::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 10px; height: 10px;
      border-top: 2.5px solid var(--accent, #FF8A00);
      border-right: 2.5px solid var(--accent, #FF8A00);
      transform: translate(-65%, -50%) rotate(45deg);
      filter: drop-shadow(0 0 5px var(--glow, rgb(from var(--accent) r g b / 0.7)));
      z-index: 1;
    }

    /* Message — speech bubble */
    body.mlx-message #mlx-cursor {
      width: 26px; height: 22px;
      background: transparent;
      border: none; box-shadow: none;
      overflow: visible;
    }
    body.mlx-message #mlx-cursor::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 28px; height: 24px;
      border: 1.5px solid rgba(255,255,255,0.65);
      border-radius: 4px;
      transform: translate(-50%, -50%) scale(1.15);
      filter: blur(1.2px);
      z-index: -1;
    }
    body.mlx-message #mlx-cursor::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1.5px solid var(--accent, #FF8A00);
      border-radius: 4px;
      box-shadow: 0 0 6px 2px var(--glow, rgb(from var(--accent) r g b / 0.55));
      z-index: 1;
    }
    body.mlx-message #mlx-cursor .message-icon {
      position: absolute; inset: 0; z-index: 2;
    }
    body.mlx-message #mlx-cursor .message-icon svg {
      width: 26px; height: 22px; overflow: visible;
      filter: drop-shadow(0 0 5px var(--glow, rgb(from var(--accent) r g b / 0.7)));
    }

    /* Trail particles */
    .mlx-trail {
      position: fixed; border-radius: 50%; pointer-events: none;
      background: var(--accent, #FF8A00);
      transform: translate(-50%,-50%);
      z-index: 99988;
      animation: mlxTrailFade var(--dur,.5s) forwards cubic-bezier(0.4,0,1,1);
    }
    @keyframes mlxTrailFade {
      0%   { opacity:.65; transform:translate(-50%,-50%) scale(1); }
      100% { opacity:0;   transform:translate(-50%,-50%) scale(0); }
    }

    /* Glitch artifacts */
    .mlx-glitch {
      position: fixed; pointer-events: none; z-index: 99985;
      background: var(--accent, #FF8A00); opacity: 0;
      animation: mlxGlitch var(--gd,.22s) forwards;
    }
    @keyframes mlxGlitch {
      0%  { opacity:.5;  transform:scaleX(1); }
      50% { opacity:.3;  transform:scaleX(1.5); }
      100%{ opacity:0;   transform:scaleX(0); }
    }

    /* Shockwave rings */
    .mlx-shock {
      position: fixed; pointer-events: none; z-index: 99992;
      border-radius: 50%;
      border: 1.5px solid var(--accent, #FF8A00);
      box-shadow: 0 0 12px var(--glow, rgb(from var(--accent) r g b / 0.55));
      transform: translate(-50%,-50%) scale(0);
      animation: mlxShock .55s forwards;
    }
    @keyframes mlxShock {
      0%  { opacity:1;  transform:translate(-50%,-50%) scale(0); }
      70% { opacity:.5; }
      100%{ opacity:0;  transform:translate(-50%,-50%) scale(1); }
    }
  `;
  document.head.appendChild(style);

  /* ── Inject cursor element ── */
  const el = document.createElement('div');
  el.id = 'mlx-cursor';

  // Photo scene SVG — sun dot + mountain silhouette
  const photoScene = document.createElement('div');
  photoScene.className = 'photo-scene';
  photoScene.innerHTML = `<svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" fill="none">
    <!-- sun dot top-right -->
    <circle cx="22" cy="5" r="2.5" fill="var(--accent,#FF8A00)" opacity="0.9"/>
    <!-- white ghost sun -->
    <circle cx="22" cy="5" r="3.5" fill="rgba(255,255,255,0.2)"/>
    <!-- mountain left: larger -->
    <polygon points="1,20 10,7 19,20" fill="var(--accent,#FF8A00)" opacity="0.55"/>
    <!-- mountain right: smaller, overlapping -->
    <polygon points="10,20 18,10 26,20" fill="var(--accent,#FF8A00)" opacity="0.85"/>
    <!-- white ghost mountains -->
    <polygon points="1,20 10,7 19,20" fill="rgba(255,255,255,0.12)"/>
    <polygon points="10,20 18,10 26,20" fill="rgba(255,255,255,0.18)"/>
  </svg>`;
  el.appendChild(photoScene);

  // Award icon SVG — trophy cup: bowl, handles, stem, base, star
  const awardIcon = document.createElement('div');
  awardIcon.className = 'award-icon';
  awardIcon.innerHTML = `<svg viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg" fill="none">
    <!-- ghost glow layer -->
    <path d="M6,2 H16 Q16,12 11,15 Q6,12 6,2 Z" fill="rgba(255,255,255,0.15)" transform="scale(1.08) translate(-0.8,-0.5)"/>
    <!-- left handle -->
    <path d="M6,4 Q2,4 2,8 Q2,11 6,11" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round" fill="none" filter="blur(0.5px)"/>
    <path d="M6,4 Q2,4 2,8 Q2,11 6,11" stroke="var(--accent,#FF8A00)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    <!-- right handle -->
    <path d="M16,4 Q20,4 20,8 Q20,11 16,11" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round" fill="none" filter="blur(0.5px)"/>
    <path d="M16,4 Q20,4 20,8 Q20,11 16,11" stroke="var(--accent,#FF8A00)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    <!-- cup body -->
    <path d="M6,2 H16 Q16,12 11,15 Q6,12 6,2 Z" stroke="var(--accent,#FF8A00)" stroke-width="1.4" stroke-linejoin="round" fill="rgba(255,138,0,0.08)"/>
    <!-- stem -->
    <line x1="11" y1="15" x2="11" y2="20" stroke="var(--accent,#FF8A00)" stroke-width="1.4" stroke-linecap="round"/>
    <!-- base -->
    <line x1="7.5" y1="20" x2="14.5" y2="20" stroke="var(--accent,#FF8A00)" stroke-width="1.8" stroke-linecap="round"/>
    <!-- star inside cup -->
    <polygon points="11,5 11.6,7 13.5,7 12,8.2 12.6,10 11,9 9.4,10 10,8.2 8.5,7 10.4,7"
      fill="var(--accent,#FF8A00)" opacity="0.9"/>
  </svg>`;
  el.appendChild(awardIcon);

  // Message icon SVG — rounded speech bubble with tail + three dots
  const messageIcon = document.createElement('div');
  messageIcon.className = 'message-icon';
  messageIcon.innerHTML = `<svg viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg" fill="none">
    <!-- ghost glow bubble -->
    <rect x="0.5" y="0.5" width="23" height="16" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" stroke-width="1" filter="blur(0.8px)"/>
    <!-- tail ghost -->
    <path d="M5,16 L3,21 L10,16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" stroke-width="1" stroke-linejoin="round" filter="blur(0.5px)"/>
    <!-- bubble body -->
    <rect x="0.5" y="0.5" width="23" height="16" rx="4"
      stroke="var(--accent,#FF8A00)" stroke-width="1.4"
      fill="rgba(255,138,0,0.06)"
      style="filter:drop-shadow(0 0 3px var(--glow,rgb(from var(--accent) r g b / 0.5)))"/>
    <!-- tail -->
    <path d="M5,16 L3,21 L10,16" fill="rgba(255,138,0,0.06)" stroke="var(--accent,#FF8A00)" stroke-width="1.4" stroke-linejoin="round"/>
    <!-- three dots -->
    <circle cx="8"  cy="8.5" r="1.4" fill="var(--accent,#FF8A00)" opacity="0.9"/>
    <circle cx="12" cy="8.5" r="1.4" fill="var(--accent,#FF8A00)" opacity="0.9"/>
    <circle cx="16" cy="8.5" r="1.4" fill="var(--accent,#FF8A00)" opacity="0.9"/>
  </svg>`;
  el.appendChild(messageIcon);

  document.body.appendChild(el);

  /* ── Apply play cursor to every film and short card ── */
  document.querySelectorAll('.project-card, .short-card').forEach(card => {
    card.dataset.cursor = 'video';
  });

  /* ── State ── */
  const body = document.body;
  let mx=0, my=0;
  let vx=0, vy=0, lastMx=0, lastMy=0, lastTime=performance.now();
  let frameCount=0;

  /* ── Mouse move ── */
  document.addEventListener('mousemove', e => {
    const now=performance.now(), dt=now-lastTime; lastTime=now;
    vx=(e.clientX-lastMx)/Math.max(dt,1);
    vy=(e.clientY-lastMy)/Math.max(dt,1);
    lastMx=e.clientX; lastMy=e.clientY;
    mx=e.clientX; my=e.clientY;

    // Rotation per state
    let rot=45;
    if (body.classList.contains('mlx-link'))  rot=20;
    if (body.classList.contains('mlx-text')  ||
        body.classList.contains('mlx-email') ||
        body.classList.contains('mlx-nav')   ||
        body.classList.contains('mlx-video') ||
        body.classList.contains('mlx-photo') ||
        body.classList.contains('mlx-ai')    ||
        body.classList.contains('mlx-calendar') ||
        body.classList.contains('mlx-call')  ||
        body.classList.contains('mlx-award') ||
        body.classList.contains('mlx-nextpage') ||
        body.classList.contains('mlx-message')) rot=0;

    el.style.transform=`translate(calc(${mx}px - 50%), calc(${my}px - 50%)) rotate(${rot}deg)`;

    // Trail — pauses during text and photo states
    frameCount++;
    const interval=Math.max(1,Math.round(11-TRAIL_SPEED));
    if (frameCount%interval===0 && !body.classList.contains('mlx-text') && !body.classList.contains('mlx-photo')) spawnTrail(mx,my);

    // Glitch at high speed
    const speed=Math.sqrt(vx*vx+vy*vy);
    if (speed>2.8 && Math.random()<speed*0.016) spawnGlitch(mx,my,vx,vy);
  });

  function spawnTrail(x,y) {
    const p=document.createElement('div');
    p.className='mlx-trail';
    const decay=(TRAIL_LEN/12)*0.55;
    const size=TRAIL_SIZE*(0.3+Math.random()*0.7);
    p.style.cssText=`width:${size}px;height:${size}px;left:${x+(Math.random()-.5)*5}px;top:${y+(Math.random()-.5)*5}px;box-shadow:0 0 ${size*2}px var(--glow, rgb(from var(--accent) r g b / 0.55));--dur:${decay}s;`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),decay*1000);
  }

  function spawnGlitch(x,y,vxVal,vyVal) {
    const g=document.createElement('div');
    g.className='mlx-glitch';
    const w=4+Math.random()*18, h=1+Math.random()*2;
    const ang=Math.atan2(vyVal,vxVal)*180/Math.PI;
    const dur=0.14+Math.random()*0.18;
    g.style.cssText=`width:${w}px;height:${h}px;left:${x+(Math.random()-.5)*20}px;top:${y+(Math.random()-.5)*10}px;transform:rotate(${ang}deg);--gd:${dur}s;`;
    document.body.appendChild(g);
    setTimeout(()=>g.remove(),dur*1000);
  }

  /* ── Click / shockwave ── */
  document.addEventListener('mousedown', e => {
    body.classList.add('mlx-clicking');
    [28,52,78].forEach((size,i)=>{
      const s=document.createElement('div');
      s.className='mlx-shock';
      s.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;animation-delay:${i*.07}s;`;
      document.body.appendChild(s);
      setTimeout(()=>s.remove(),650+i*70);
    });
  });
  document.addEventListener('mouseup',()=>body.classList.remove('mlx-clicking'));

  /* ── Magnetic buttons (add class="mlx-magnetic" to any button) ── */
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mlx-magnetic').forEach(btn => {
      const r=btn.getBoundingClientRect();
      const cx=r.left+r.width/2, cy=r.top+r.height/2;
      const dist=Math.sqrt((e.clientX-cx)**2+(e.clientY-cy)**2);
      if(dist<MAG_RANGE){ const pull=(1-dist/MAG_RANGE)*MAG_PULL; btn.style.transform=`translate(${(e.clientX-cx)*pull}px,${(e.clientY-cy)*pull}px)`; }
      else btn.style.transform='';
    });
  });

  /* ── State detection (mouseover priority chain) ── */
  document.addEventListener('mouseover', e => {
    const t=e.target;
    // Remove only mlx- cursor classes, not other body classes
    body.classList.remove('mlx-email','mlx-video','mlx-photo','mlx-nav','mlx-link','mlx-hovering','mlx-text','mlx-ai','mlx-calendar','mlx-call','mlx-award','mlx-nextpage','mlx-message');

    if (t.dataset.cursor==='email'||t.closest('[data-cursor="email"]'))         { body.classList.add('mlx-email');    return; }
    if (t.dataset.cursor==='video'||t.closest('[data-cursor="video"]'))         { body.classList.add('mlx-video');    return; }
    if (t.dataset.cursor==='photo'||t.closest('[data-cursor="photo"]'))         { body.classList.add('mlx-photo');    return; }
    if (t.dataset.cursor==='nav'  ||t.closest('[data-cursor="nav"]'))           { body.classList.add('mlx-nav');      return; }
    if (t.dataset.cursor==='ai'   ||t.closest('[data-cursor="ai"]'))            { body.classList.add('mlx-hovering'); return; }
    if (t.dataset.cursor==='calendar'||t.closest('[data-cursor="calendar"]'))   { body.classList.add('mlx-calendar'); return; }
    if (t.dataset.cursor==='call' ||t.closest('[data-cursor="call"]'))          { body.classList.add('mlx-call');     return; }
    if (t.dataset.cursor==='award'||t.closest('[data-cursor="award"]'))         { body.classList.add('mlx-award');    return; }
    if (t.dataset.cursor==='nextpage'||t.closest('[data-cursor="nextpage"]'))   { body.classList.add('mlx-nextpage'); return; }
    if (t.dataset.cursor==='message'||t.closest('[data-cursor="message"]'))     { body.classList.add('mlx-message');  return; }
    if (t.closest('.nav-links a'))                                             { body.classList.add('mlx-nav');      return; }
    if (t.closest('a:not([data-cursor])'))                                     { body.classList.add('mlx-link');     return; }
    if (t.closest('button:not([disabled]),[role="button"],[tabindex]'))        { body.classList.add('mlx-hovering'); return; }
    if (t.closest('p,h1,h2,h3,h4,h5,h6,li,blockquote,label,span'))           { body.classList.add('mlx-text');     return; }
  });

})();
