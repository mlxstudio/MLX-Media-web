// ============================================================
//  MLX Media – ChatBot Engine  v3.1
//  Clean additions over v2.0:
//  - Unread badge on toggle button
//  - Character counter (shows only near the 400-char limit)
//  - Status "Píše…" in header during bot typing
//  - HL dedup: skips registering duplicate event listeners
//    when mlx_highlight.js is also on the page
//  All core message rendering is identical to v2.0 (no layout changes).
// ============================================================

(function () {
  "use strict";

  // ── 1. UTILITY ──────────────────────────────────────────────
  function normalizeInput(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({length: m + 1}, (_, i) => [i]);
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]);
      }
    }
    return dp[m][n];
  }

  function pickResponse(value) {
    return Array.isArray(value)
      ? value[Math.floor(Math.random() * value.length)]
      : value;
  }

  // ── 2. MATCHING ENGINE ──────────────────────────────────────
  function getAnswer(input) {
    const norm  = normalizeInput(input);
    const words = norm.split(/\s+/);
    const found = [];

    for (const [key, value] of Object.entries(knowledge)) {
      const synonyms = key.split(",").map(s => normalizeInput(s.trim()));
      let matched = false;

      for (const syn of synonyms) {
        if (!syn) continue;
        if (norm.includes(syn)) { matched = true; break; }
        for (const word of words) {
          if (word.length < 3 || syn.length < 3) continue;
          const dist   = levenshtein(word, syn);
          const maxLen = Math.max(word.length, syn.length);
          if (dist <= 2 && dist <= Math.floor(maxLen * 0.3)) {
            matched = true; break;
          }
        }
        if (matched) break;
      }

      if (matched) found.push(pickResponse(value));
    }

    if (found.length === 0) {
      return "🤔 Tomu nerozumím, zkuste to napsat jinak nebo mi napište přímo na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.";
    }
    if (found.length === 1) return found[0];
    if (found.length === 2) return found[0] + "<br><br>A zároveň: " + found[1];
    return found.slice(0, -1).join("<br><br>") + "<br><br>A také: " + found[found.length - 1];
  }

  // ── 3. PERSISTENCE ──────────────────────────────────────────
  const STORE_KEY = "mlx-chatbot-session";

  function loadSession() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || "null"); } catch { return null; }
  }
  function saveSession(data) {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch {}
  }

  let session = loadSession() || { messages: [], open: false };

  function persistMessage(sender, text) {
    session.messages.push({ sender, text, ts: Date.now() });
    if (session.messages.length > 60) session.messages.splice(0, session.messages.length - 60);
    saveSession(session);
  }

  // ── 4. MLX HIGHLIGHT SYSTEM ─────────────────────────────────
  // This internal HL module ensures rings exist and persisted highlights
  // are applied on page load.  Event listeners are only registered here
  // if mlx_highlight.js has NOT already claimed them (via _mlxHLMounted).
  const HL = (() => {
    let activeSectionEl = null;
    let sectionIO       = null;

    function ensureRings() {
      ["mlx-nav-ring","mlx-section-ring"].forEach(id => {
        if (!document.getElementById(id)) {
          const d = document.createElement("div");
          d.id = id;
          d.setAttribute("aria-hidden","true");
          document.body.appendChild(d);
        }
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

    function showRing(ring, el, { shape="rounded", pad } = {}) {
      if (!ring || !el) return;
      if (pad === undefined) pad = ring.id === "mlx-nav-ring" ? 2 : 14;
      if (ring._fadeTimer) { clearTimeout(ring._fadeTimer); ring._fadeTimer = null; }
      const { x, y, w, h } = rectPadded(el, pad);
      ring.style.left         = x + "px";
      ring.style.top          = y + "px";
      ring.style.width        = w + "px";
      ring.style.height       = h + "px";
      ring.style.borderRadius = shape === "circle"
        ? Math.max(w, h) / 2 + "px"
        : shape === "rounded" ? "18px" : "6px";
      ring.classList.remove("is-fading");
      ring.classList.add("is-visible");
      ring._lastEl    = el;
      ring._lastShape = shape;
    }

    function hideRing(ring) {
      if (!ring) return;
      if (ring._fadeTimer) clearTimeout(ring._fadeTimer);
      ring.classList.remove("is-visible");
      ring.classList.add("is-fading");
      ring._fadeTimer = setTimeout(() => {
        ring.classList.remove("is-fading");
        ["width","height","left","top","borderRadius"].forEach(p =>
          ring.style[p] = p === "borderRadius" ? "18px" : "0px");
        ring._fadeTimer = null;
      }, 2500);
    }

    function stickySection(el, shape) {
      const ring = document.getElementById("mlx-section-ring");
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
      window.addEventListener("scroll", reposition, { passive: true });
      window.addEventListener("resize", reposition);
    }

    const HL_KEY = "mlx-hl-persist";
    function persistHL(data) { try { sessionStorage.setItem(HL_KEY, JSON.stringify(data)); } catch {} }
    function readHL()        { try { return JSON.parse(sessionStorage.getItem(HL_KEY) || "null"); } catch { return null; } }
    function clearHL()       { try { sessionStorage.removeItem(HL_KEY); } catch {} }

    function applyPersisted() {
      const data = readHL();
      if (!data) return;
      if (data.path && data.path !== location.pathname) return;
      if (data.target) {
        const el = document.querySelector(data.target)
          || document.getElementById(data.target.replace(/^#/,""))
          || null;
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            const ring = document.getElementById("mlx-section-ring");
            showRing(ring, el, { shape: data.outline || "rounded" });
            stickySection(el, data.outline || "rounded");
          }, 120);
        }
      }
      hideRing(document.getElementById("mlx-nav-ring"));
      clearHL();
    }

    function handleBtnClick(btn) {
      const dest      = btn.dataset.dest || btn.href || "";
      const targetSel = btn.dataset.target || "";
      const outline   = btn.dataset.outline || "rounded";
      if (!dest) return;
      if (dest.startsWith("mailto:") || dest.startsWith("tel:")) { window.location.href = dest; return; }
      const isHash    = dest.startsWith("#");
      const url       = new URL(dest, location.origin);
      const isSamePage = url.pathname === location.pathname || isHash;
      if (isSamePage || isHash) {
        const sel = targetSel || (isHash ? dest : url.hash);
        const el  = sel ? (document.querySelector(sel) || document.getElementById(sel.replace(/^#/,""))) : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          const ring = document.getElementById("mlx-section-ring");
          showRing(ring, el, { shape: outline });
          stickySection(el, outline);
        }
        return;
      }
      persistHL({ path: url.pathname, target: targetSel || url.hash, outline });
      location.href = dest;
    }

    function mount() {
      ensureRings();
      applyPersisted();

      // mlx_highlight.js sets window._mlxHLMounted = true synchronously when it
      // executes (before DOMContentLoaded). If it's on the page, skip registering
      // duplicate listeners here — mlx_highlight.js handles all of them.
      if (window._mlxHLMounted) return;
      window._mlxHLMounted = true;

      document.addEventListener("pointerover", e => {
        const btn = e.target.closest(".mlx-ai-btn");
        if (!btn) return;
        const navSel = btn.dataset.nav;
        const navEl  = navSel ? document.querySelector(navSel) : null;
        const shape  = btn.dataset.outline || "rounded";
        if (navEl) showRing(document.getElementById("mlx-nav-ring"), navEl, { shape });
        const tgtSel = btn.dataset.target;
        const tgtEl  = tgtSel ? (document.querySelector(tgtSel) || document.getElementById(tgtSel.replace(/^#/,""))) : null;
        if (tgtEl && !activeSectionEl) showRing(document.getElementById("mlx-section-ring"), tgtEl, { shape });
      });

      document.addEventListener("pointerout", e => {
        if (!e.target.closest(".mlx-ai-btn")) return;
        hideRing(document.getElementById("mlx-nav-ring"));
        if (!activeSectionEl) hideRing(document.getElementById("mlx-section-ring"));
      });

      document.addEventListener("click", e => {
        const btn = e.target.closest(".mlx-ai-btn");
        if (!btn) return;
        e.preventDefault();
        handleBtnClick(btn);
      });

      document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;
        hideRing(document.getElementById("mlx-nav-ring"));
        hideRing(document.getElementById("mlx-section-ring"));
        activeSectionEl = null;
      });

      window.addEventListener("resize", () => {
        ["mlx-nav-ring","mlx-section-ring"].forEach(id => {
          const r = document.getElementById(id);
          if (r && r.classList.contains("is-visible") && r._lastEl)
            showRing(r, r._lastEl, { shape: r._lastShape });
        });
      });
    }

    return { mount };
  })();

  // ── 5. UI CONSTANTS ─────────────────────────────────────────
  const QUICK_REPLIES = [
    "💰 Ceny",
    "📝 Objednávka",
    "📞 Kontakt",
    "🖼️ Portfolio",
    "📍 Lokace",
    "⚡ Technika",
  ];

  const WELCOME_MSG = "Dobrý den! Jsem <strong>MLX AI</strong> – asistent pro klienty MLX Media. Mohu vám pomoct s cenami, objednávkou nebo portfoliem. 😊";

  // ── 6. UNREAD BADGE ─────────────────────────────────────────
  let unreadCount = 0;

  function updateBadge() {
    const badge = document.getElementById("cb-unread-badge");
    if (!badge) return;
    if (unreadCount > 0 && !session.open) {
      badge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  // ── 7. HTML INJECTION ────────────────────────────────────────
  function injectHTML() {
    const root = document.createElement("div");
    root.id = "mlx-chat-root";
    root.innerHTML = `
      <button id="chat-toggle" aria-label="Otevřít chat" data-cursor="ai">
        <i class="fas fa-brain"></i>
        <span id="cb-unread-badge" class="hidden" aria-label="nepřečtené zprávy"></span>
      </button>

      <div id="botpress-container" role="dialog" aria-label="MLX Chat Bot">
        <div class="cb-header">
          <div class="cb-header-left">
            <div class="cb-avatar"><i class="fas fa-brain"></i></div>
            <div class="cb-header-text">
              <div class="cb-header-name">MLX AI</div>
              <div class="cb-header-status">
                <span class="cb-status-dot"></span>
                <span id="cb-status-label">Online – MLX Media</span>
              </div>
            </div>
          </div>
          <button class="cb-close-btn" id="cb-close" aria-label="Zavřít">✕</button>
        </div>

        <div class="chat-info">
          ⚠️ AI jen pro shrnutí – vše prosím ověřte
          <button id="info-toggle">Více info</button>
        </div>
        <div class="chat-details" id="chat-details">
          <p>AI nemůže objednávat, ale pomůže s procesem.</p>
          <p>Informace může být nepřesná – vždy ověřte.</p>
          <p>Přesné ceny vždy domluvíme osobně.</p>
        </div>

        <div id="chat-container">
          <div id="chat-log"></div>
          <div class="cb-quick-wrap" id="cb-quick"></div>
          <div class="cb-input-row">
            <input id="chat-input" placeholder="Napište dotaz..." autocomplete="off" maxlength="400" />
            <span id="cb-char-count" aria-live="polite"></span>
            <button class="cb-send-btn" id="cb-send" aria-label="Odeslat">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(root);
  }

  // ── 8. MESSAGE RENDERING (identical structure to v2.0) ──────
  function addMessage(sender, html, saveToSession = true) {
    const log = document.getElementById("chat-log");
    if (!log) return;

    const div  = document.createElement("div");
    div.className = "msg " + sender;

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.innerHTML = sender === "user"
      ? '<i class="fas fa-user"></i>'
      : '<i class="fas fa-brain"></i>';

    const text = document.createElement("div");
    text.className = "text";
    text.innerHTML = html;

    div.appendChild(icon);
    div.appendChild(text);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;

    if (saveToSession) persistMessage(sender, html);
  }

  function showTyping() {
    const log = document.getElementById("chat-log");
    // Update header status
    const statusLabel = document.getElementById("cb-status-label");
    if (statusLabel) statusLabel.textContent = "Píše\u2026";

    const div = document.createElement("div");
    div.className = "msg bot typing";
    div.id = "mlx-typing";
    div.innerHTML = `
      <span class="icon"><i class="fas fa-brain"></i></span>
      <div class="text">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  function removeTyping() {
    const t = document.getElementById("mlx-typing");
    if (t) t.remove();
    const statusLabel = document.getElementById("cb-status-label");
    if (statusLabel) statusLabel.textContent = "Online \u2013 MLX Media";
  }

  function buildQuickReplies() {
    const wrap = document.getElementById("cb-quick");
    if (!wrap) return;
    wrap.innerHTML = "";
    QUICK_REPLIES.forEach(label => {
      const btn = document.createElement("button");
      btn.className = "cb-quick";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        const query = label.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/u, "").trim();
        sendUserMessage(query);
      });
      wrap.appendChild(btn);
    });
  }

  // ── 9. SEND ─────────────────────────────────────────────────
  function sendUserMessage(text) {
    const input = document.getElementById("chat-input");
    const msg   = text || (input ? input.value.trim() : "");
    if (!msg) return;
    if (input) { input.value = ""; updateCharCounter(""); }

    const qw = document.getElementById("cb-quick");
    if (qw) qw.style.display = "none";

    addMessage("user", msg);
    const typing = showTyping();

    const delay = 400 + Math.min(msg.length * 8, 900);
    setTimeout(() => {
      removeTyping();
      const answer = getAnswer(msg) +
        "<br><small style='opacity:0.5;font-size:0.78em'>⚠️ MLX AI – vše si prosím ověřte.</small>";
      addMessage("bot", answer);
      // Increment badge if chat is closed
      if (!session.open) { unreadCount++; updateBadge(); }
    }, delay);
  }

  // ── 10. CHARACTER COUNTER ────────────────────────────────────
  const CHAR_MAX       = 400;
  const CHAR_SHOW_AT   = 0.75; // show counter when > 75% full

  function updateCharCounter(value) {
    const counter = document.getElementById("cb-char-count");
    if (!counter) return;
    const len  = value.length;
    const show = len > CHAR_MAX * CHAR_SHOW_AT;
    counter.textContent = show ? `${len}/${CHAR_MAX}` : "";
    counter.classList.toggle("visible",  show);
    counter.classList.toggle("near-max", show && len < CHAR_MAX * 0.95);
    counter.classList.toggle("at-max",   len >= CHAR_MAX * 0.95);
  }

  // ── 11. OPEN / CLOSE ─────────────────────────────────────────
  function openChat() {
    const container = document.getElementById("botpress-container");
    const toggle    = document.getElementById("chat-toggle");
    if (!container) return;

    session.open = true;
    saveSession(session);
    unreadCount = 0;
    updateBadge();

    container.style.display = "flex";
    container.classList.remove("closing");
    container.classList.add("opening");
    toggle.classList.add("is-open");
    toggle.innerHTML = '<i class="fas fa-times"></i><span id="cb-unread-badge" class="hidden"></span>';

    const log = document.getElementById("chat-log");

    if (session.messages.length > 0 && log.children.length === 0) {
      session.messages.forEach(m => addMessage(m.sender, m.text, false));
    }

    if (session.messages.length === 0) {
      addMessage("bot", WELCOME_MSG);
      buildQuickReplies();
    }

    setTimeout(() => {
      if (log) log.scrollTop = log.scrollHeight;
      const inp = document.getElementById("chat-input");
      if (inp) inp.focus();
    }, 100);
  }

  function closeChat() {
    const container = document.getElementById("botpress-container");
    const toggle    = document.getElementById("chat-toggle");
    if (!container) return;

    session.open = false;
    saveSession(session);

    container.classList.remove("opening");
    container.classList.add("closing");
    toggle.classList.remove("is-open");
    toggle.innerHTML = '<i class="fas fa-brain"></i><span id="cb-unread-badge" class="hidden"></span>';

    setTimeout(() => {
      container.style.display = "none";
      container.classList.remove("closing");
    }, 280);
  }

  // ── 12. MOUNT ────────────────────────────────────────────────
  function mount() {
    injectHTML();

    const toggle  = document.getElementById("chat-toggle");
    const cbClose = document.getElementById("cb-close");
    const infoTgl = document.getElementById("info-toggle");
    const details = document.getElementById("chat-details");
    const input   = document.getElementById("chat-input");
    const sendBtn = document.getElementById("cb-send");

    let infoOpen = false;

    toggle.addEventListener("click", () => session.open ? closeChat() : openChat());
    cbClose.addEventListener("click", closeChat);

    infoTgl.addEventListener("click", () => {
      infoOpen = !infoOpen;
      details.style.display = infoOpen ? "block" : "none";
      infoTgl.textContent   = infoOpen ? "Méně info" : "Více info";
    });

    input.addEventListener("keydown", e => {
      if (e.key !== "Enter" || e.shiftKey) return;
      e.preventDefault();
      sendUserMessage();
    });
    input.addEventListener("input", () => updateCharCounter(input.value));

    sendBtn.addEventListener("click", () => sendUserMessage());

    if (session.open) openChat();

    // Mount highlight system (will skip listeners if mlx_highlight.js already claimed them)
    HL.mount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  window.MLXChat = {
    open:  openChat,
    close: closeChat,
    send:  sendUserMessage,
  };

})();
