// --- Utility functions ---
function normalizeInput(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Optional: fuzzy matching (currently unused but available)
function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) matrix[i][j] = matrix[i - 1][j - 1];
      else
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
    }
  }
  return matrix[b.length][a.length];
}

function pickResponse(value) {
  return Array.isArray(value)
    ? value[Math.floor(Math.random() * value.length)]
    : value;
}

// --- Core logic: collect ALL matches, but one response per key ---
// --- Core logic: collect ALL matches, but one response per key ---
function getAnswer(input) {
  const norm = normalizeInput(input);
  const words = norm.split(/\s+/); // Split into words for fuzzy matching
  let foundMatches = [];

  for (const [key, value] of Object.entries(knowledge)) {
    if (key === "fallback") continue;

    const synonyms = key.split(",").map(s => normalizeInput(s.trim()));
    let matched = false;

    for (const syn of synonyms) {
      // Exact substring match (keep original behavior)
      if (norm.includes(syn)) {
        matched = true;
        break;
      }

      // Fuzzy match on individual words
      for (const word of words) {
        const dist = levenshtein(word, syn);
        // Threshold: ≤2 edits, but not if distance > 30% of the longer string's length (avoids false positives)
        const maxLen = Math.max(word.length, syn.length);
        if (dist <= 2 && dist <= Math.floor(maxLen * 0.3)) {
          matched = true;
          break;
        }
      }
      if (matched) break;
    }

    if (matched) {
      foundMatches.push(pickResponse(value));
    }
  }

  if (foundMatches.length > 0) {
    if (foundMatches.length === 1) {
      return foundMatches[0];
    } else if (foundMatches.length === 2) {
      return foundMatches[0] + " A zároveň " + foundMatches[1];
    } else {
      // more than 2 → join naturally
      return (
        foundMatches.slice(0, -1).join(", ") +
        " a také " +
        foundMatches[foundMatches.length - 1]
      );
    }
  }

  // --- fallback (optional keywords) ---
  if (knowledge["fallback"]) {
    const fallbackSynonyms = "fallback".split(",").map(s => normalizeInput(s.trim()));
    for (const syn of fallbackSynonyms) {
      if (norm.includes(syn)) {
        return pickResponse(knowledge["fallback"]);
      }
    }
  }

  return "Tady si nejsem jistý. Kontaktujte nás prosím přímo!";
}


// --- UI logic ---
document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("botpress-container");
  const mobileClose = document.getElementById("mobile-close");
  const infoToggle = document.getElementById("info-toggle");
  const chatDetails = document.getElementById("chat-details");
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");

  let chatOpen = false;
  let infoOpen = false;

  function openChat() {
    chatOpen = true;
    chatContainer.style.display = "flex";
    chatToggle.innerHTML = '<i class="fas fa-times"></i>';
    if (chatLog.children.length === 0) {
      addMessage(
        "bot",
        "Dobrý den, jsem MLX Chat Bot. Mohu vám pomoci najít informace, objednat služby nebo zobrazit portfolio na této stránce."
      );
    }
  }

  function closeChat() {
    chatOpen = false;
    chatContainer.style.display = "none";
    chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
  }

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = "msg " + sender;

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.innerHTML =
      sender === "user"
        ? '<i class="fas fa-user"></i>'
        : '<i class="fas fa-robot"></i>';

    const span = document.createElement("div");
    span.className = "text";
    span.innerHTML = text;

    div.appendChild(icon);
    div.appendChild(span);
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  chatToggle.addEventListener("click", () =>
    chatOpen ? closeChat() : openChat()
  );
  mobileClose.addEventListener("click", closeChat);
  infoToggle.addEventListener("click", () => {
    infoOpen = !infoOpen;
    chatDetails.style.display = infoOpen ? "block" : "none";
    infoToggle.innerText = infoOpen ? "Méně info" : "Více info";
  });

  chatInput.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const msg = e.target.value.trim();
    if (!msg) return;
    addMessage("user", msg);
    const answer =
      getAnswer(msg) +
      " (Poznámka: MLX AI je zde jen pro shrnutí informací, vše si prosím ověřte.)";
    setTimeout(() => addMessage("bot", answer), 300);
    e.target.value = "";
  });
});

// Scroll helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
