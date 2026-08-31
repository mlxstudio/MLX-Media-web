(function () {
  if (window.__mlxSettingsInitialized) return;
  window.__mlxSettingsInitialized = true;

  const SETTINGS_KEY = 'mlx-settings-state-v1';
  const MUSIC_PROGRESS_KEY = 'mlx-music-progress-v1';
  const FLOATING_WIDGET_POSITION_KEY = 'mlx-floating-panel-position-v1';
  const DEFAULT_SETTINGS = {
    theme: 'automatic',
    darkStart: '22:00',
    darkEnd: '05:00',
    soundOn: true,
    sfxVolume: 70,
    primaryColor: 'default',
    secondaryColor: '#FF8A00',
    floatingSoundPanel: false,
    desktopHamburger: false,
    cleanMode: false,
    cleanModeItems: {
      theme: true,
      sound: true,
      language: true,
      ai: true,
      audio: true,
      nav: true
    },
    game: false,
    musicTrack: 'Song-1',
    musicVolume: 50,
    musicEnabled: false,
    resetToDefault: false
  };

  const MLX_STATS = {
    startDate: new Date(2021, 7, 17),
    birthDate: new Date(2010, 7, 17),
    projects: 45,
    recommendation: 95,
    rawResolution: '6K',
    getYearsExperience() {
      const now = new Date();
      const msPerYear = 1000 * 60 * 60 * 24 * 365.2425;
      const years = Math.max(5, Math.floor((now.getTime() - this.startDate.getTime()) / msPerYear));
      return `${years}+`;
    },
    getAge() {
      const now = new Date();
      let age = now.getFullYear() - this.birthDate.getFullYear();
      const monthDiff = now.getMonth() - this.birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < this.birthDate.getDate())) {
        age -= 1;
      }
      return age;
    }
  };

  window.__mlxPersonalInfo = {
    birthDate: MLX_STATS.birthDate,
    getAge: () => MLX_STATS.getAge()
  };

  function applySharedStats() {
    const years = MLX_STATS.getYearsExperience();
    const statValues = [MLX_STATS.projects, 6, parseInt(years, 10), MLX_STATS.recommendation];
    const statSuffixes = ['+', 'K', '+', '%'];

    document.querySelectorAll('.js-count').forEach((node, index) => {
      if (!statValues[index]) return;
      const prefix = statValues[index];
      const suffix = statSuffixes[index] || '';
      node.dataset.target = String(prefix);
      node.innerHTML = `${prefix}<span>${suffix}</span>`;
    });

    document.querySelectorAll('.f-stat-number').forEach((node, index) => {
      if (index >= statValues.length) return;
      const prefix = statValues[index];
      const suffix = statSuffixes[index] || '';
      node.dataset.target = String(prefix);
      node.innerHTML = `${prefix}<span>${suffix}</span>`;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySharedStats, { once: true });
  } else {
    applySharedStats();
  }

  function normalizeCleanModeItems(value) {
    const defaults = { ...DEFAULT_SETTINGS.cleanModeItems };
    const source = value && typeof value === 'object' ? value : {};
    return Object.fromEntries(Object.keys(defaults).map((key) => [key, Boolean(source[key] ?? defaults[key])]))
  }

  function safeParse(json, fallback) {
    try {
      return JSON.parse(json) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getSettings() {
    const saved = safeParse(localStorage.getItem(SETTINGS_KEY), {});
    return { ...DEFAULT_SETTINGS, ...saved };
  }

  function saveSettings(nextSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
  }

  function saveMusicProgress(player) {
    const state = getSettings();
    const trackName = state.musicTrack || 'Song-1';
    const currentTime = Number.isFinite(player?.currentTime) ? Number(player.currentTime) : 0;
    localStorage.setItem(MUSIC_PROGRESS_KEY, JSON.stringify({
      track: trackName,
      currentTime: Math.max(0, currentTime),
      isPlaying: Boolean(state.musicEnabled && state.soundOn && trackName && trackName !== 'off')
    }));
  }

  function getSavedMusicProgress() {
    const saved = safeParse(localStorage.getItem(MUSIC_PROGRESS_KEY), null);
    if (!saved || typeof saved !== 'object') return null;
    const currentTime = Number(saved.currentTime);
    return {
      track: String(saved.track || 'Song-1'),
      currentTime: Number.isFinite(currentTime) ? Math.max(0, currentTime) : 0,
      isPlaying: Boolean(saved.isPlaying)
    };
  }

  function saveFloatingWidgetPosition(widget) {
    if (!widget) return;
    const left = Number.parseFloat(widget.style.left || '') || 0;
    const top = Number.parseFloat(widget.style.top || '') || 0;
    const safeLeft = Number.isFinite(left) ? Math.max(16, Math.min(window.innerWidth - 200, left)) : 20;
    const safeTop = Number.isFinite(top) ? Math.max(16, Math.min(window.innerHeight - 140, top)) : 20;
    localStorage.setItem(FLOATING_WIDGET_POSITION_KEY, JSON.stringify({ left: safeLeft, top: safeTop }));
  }

  function restoreFloatingWidgetPosition(widget) {
    if (!widget) return;
    const saved = safeParse(localStorage.getItem(FLOATING_WIDGET_POSITION_KEY), null);
    if (!saved || typeof saved !== 'object') {
      widget.style.left = 'auto';
      widget.style.right = '20px';
      widget.style.top = 'auto';
      widget.style.bottom = '20px';
      return;
    }
    const left = Number(saved.left);
    const top = Number(saved.top);
    if (!Number.isFinite(left) || !Number.isFinite(top)) {
      widget.style.left = 'auto';
      widget.style.right = '20px';
      widget.style.top = 'auto';
      widget.style.bottom = '20px';
      return;
    }
    widget.style.left = `${Math.min(Math.max(left, 16), Math.max(16, window.innerWidth - 220))}px`;
    widget.style.top = `${Math.min(Math.max(top, 16), Math.max(16, window.innerHeight - 180))}px`;
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
  }

  function formatTrackDisplayName(trackName) {
    const normalized = String(trackName || 'Song-1')
      .replace(/\$1/gi, '1')
      .replace(/\$2/gi, '2')
      .replace(/\$3/gi, '3')
      .replace(/^Song-(\d+)$/i, 'Song $1')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return normalized || 'Song 1';
  }

  function applyStoredSoundState(state) {
    localStorage.setItem('mlx-sound', state.soundOn ? 'on' : 'off');
    localStorage.setItem('mlx-sfx-volume', String(state.sfxVolume));
    if (typeof window !== 'undefined') {
      window.soundEnabled = !!state.soundOn;
      window.sfxVolume = Number(state.sfxVolume) || 0;
    }
    if (typeof soundEnabled !== 'undefined') {
      soundEnabled = !!state.soundOn;
    }
    if (typeof sfxVolume !== 'undefined') {
      sfxVolume = Number(state.sfxVolume) || 0;
    }
  }

  function reorderPrimaryNav() {
    const desired = [
      'index.html',
      'O-mně.html',
      'Portfolio.html',
      'Nabídka.html',
      'Aspekty.html',
      'Ceník.html',
      'Objednávka.html',
      'Objednávkový-formulář.html',
      'GameHub.html',
      'Hry.html'
    ];

    const normalizeHref = (value = '') => decodeURIComponent(String(value).trim()).replace(/\\/g, '/').toLowerCase();

    const reorderMenu = (menu) => {
      if (!menu) return;
      const items = [...menu.children].filter((child) => child.matches('li, a'));
      const byHref = new Map();

      items.forEach((node) => {
        const anchor = node.matches('a') ? node : node.querySelector('a');
        if (!anchor) return;
        const href = normalizeHref(anchor.getAttribute('href'));
        if (!href) return;
        byHref.set(href, node);
      });

      const orderedNodes = desired
        .map((href) => byHref.get(normalizeHref(href)))
        .filter(Boolean);

      if (!orderedNodes.length) return;

      const fragment = document.createDocumentFragment();
      orderedNodes.forEach((node) => fragment.appendChild(node));
      menu.innerHTML = '';
      menu.appendChild(fragment);
    };

    reorderMenu(document.querySelector('.nav-links'));
    reorderMenu(document.getElementById('mobileMenu'));
  }

  function syncGameNavState() {
    const state = getSettings();
    const enabled = !!state.game;
    const selectors = ['.nav-links a[href="Hry.html"]', '.nav-links a[href="GameHub.html"]', '.nav-mobile a[href="Hry.html"]', '.nav-mobile a[href="GameHub.html"]'];
    const links = [...document.querySelectorAll(selectors.join(', '))];

    links.forEach((link) => {
      const listItem = link.closest('li');
      if (listItem) listItem.style.display = enabled ? '' : 'none';
      link.style.display = enabled ? '' : 'none';
    });

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      const existing = navLinks.querySelector('a[href="Hry.html"], a[href="GameHub.html"]');
      if (!existing && enabled) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = 'GameHub.html';
        link.textContent = 'Hry';
        link.setAttribute('data-i18n', 'nav-games');
        link.setAttribute('data-cursor', 'nextpage');
        listItem.appendChild(link);

        const anchorAfter = navLinks.querySelector('a[href="Objednávka.html"], a[href="Objednavka.html"], a[href="Objednávkový-formulář.html"]');
        if (anchorAfter && anchorAfter.closest('li')) {
          anchorAfter.closest('li').after(listItem);
        } else {
          navLinks.appendChild(listItem);
        }
      }
    }

    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      const mobileLink = mobileMenu.querySelector('a[href="Hry.html"], a[href="GameHub.html"]');
      if (!mobileLink && enabled) {
        const link = document.createElement('a');
        link.href = 'GameHub.html';
        link.textContent = 'Hry';
        link.setAttribute('data-i18n', 'nav-games');
        link.setAttribute('data-cursor', 'nextpage');
        const anchorAfter = mobileMenu.querySelector('a[href="Objednávka.html"], a[href="Objednavka.html"], a[href="Objednávkový-formulář.html"]');
        if (anchorAfter) {
          anchorAfter.after(link);
        } else {
          mobileMenu.appendChild(link);
        }
      }
    }

    reorderPrimaryNav();
  }
  window.syncGameNavState = syncGameNavState;

  function parseTimeToMinutes(value) {
    const [hours, minutes] = String(value || '22:00').split(':').map(Number);
    return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0);
  }

  function isDarkBySchedule(start, end) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = parseTimeToMinutes(start);
    const endMinutes = parseTimeToMinutes(end);

    if (startMinutes === endMinutes) return true;

    if (startMinutes < endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    }

    return !(currentMinutes >= endMinutes && currentMinutes < startMinutes);
  }

  function resolveTheme(themeName, darkStart, darkEnd) {
    if (themeName === 'light') return 'light';
    if (themeName === 'dark') return 'dark';
    return isDarkBySchedule(darkStart, darkEnd) ? 'dark' : 'light';
  }

  function applyThemeFromSettings() {
    const state = getSettings();
    const nextTheme = resolveTheme(state.theme, state.darkStart, state.darkEnd);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.setAttribute('data-theme-mode', state.theme);
    localStorage.setItem('mlx-theme', nextTheme);
    localStorage.setItem('mlx-theme-mode', state.theme);
    applyAccentColors();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.classList.toggle('active', nextTheme === 'light');
    }
  }

  function resolveDefaultAccentForMode(mode) {
    return mode === 'dark' ? '#FF8A00' : '#00BFA6';
  }

  function resolveColorToken(value, fallback) {
    const trimmed = String(value || '').trim();
    if (!trimmed || trimmed.toLowerCase() === 'default') return fallback;
    return trimmed.startsWith('#') ? trimmed : fallback;
  }

  function normalizeHexColor(value, fallback) {
    const candidate = String(value || '').trim();
    if (!candidate) return fallback;
    const normalized = candidate.startsWith('#') ? candidate : `#${candidate}`;
    if (/^#[0-9a-fA-F]{6}$/.test(normalized)) return normalized.toUpperCase();
    return fallback;
  }

  function applyAccentColors() {
    const state = getSettings();
    const root = document.documentElement;
    const currentTheme = document.documentElement.getAttribute('data-theme') || resolveTheme(state.theme, state.darkStart, state.darkEnd);
    const defaultLight = resolveDefaultAccentForMode('light');
    const defaultDark = resolveDefaultAccentForMode('dark');
    const lightAccent = resolveColorToken(state.primaryColor, currentTheme === 'dark' ? defaultDark : defaultLight);
    const darkOverride = String(state.secondaryColor || '').trim();
    const darkAccent = darkOverride ? resolveColorToken(darkOverride, lightAccent) : lightAccent;
    const activeAccent = currentTheme === 'dark' ? darkAccent : lightAccent;

    root.style.setProperty('--accent', activeAccent);
    root.style.setProperty('--accent-soft', hexToRgba(activeAccent, 0.12));
    root.style.setProperty('--accent-glow', hexToRgba(activeAccent, 0.24));
    root.style.setProperty('--secondary-accent', darkAccent);
    root.style.setProperty('--accent-strong', lightAccent);
    root.style.setProperty('--theme-accent-dark', darkAccent);
    root.style.setProperty('--stripe', `linear-gradient(90deg, transparent, color-mix(in srgb, ${activeAccent} 80%, transparent), color-mix(in srgb, ${activeAccent} 100%, white 15%), transparent)`);
    root.style.setProperty('--grid-line', hexToRgba(activeAccent, 0.06));
    root.style.setProperty('--shadow-warm', hexToRgba(activeAccent, 0.16));
    root.style.setProperty('--glow-color', hexToRgba(activeAccent, 0.32));
    root.style.setProperty('--card-shadow-glow', hexToRgba(activeAccent, 0.18));
    root.style.setProperty('--header-tint', `color-mix(in srgb, var(--bg) 86%, ${activeAccent} 14%)`);
    root.style.setProperty('--tape-color', hexToRgba(activeAccent, 0.2));
    root.style.setProperty('--tape-border', hexToRgba(activeAccent, 0.2));

    document.querySelectorAll('[data-color-preview]').forEach((preview) => {
      const target = String(preview.dataset.colorPreview || 'primary').toLowerCase();
      const value = target === 'secondary' ? (darkOverride ? darkAccent : lightAccent) : lightAccent;
      preview.style.background = value;
    });
    document.querySelectorAll('[data-color-hex]').forEach((input) => {
      const target = String(input.dataset.colorHex || 'primary').toLowerCase();
      const value = target === 'secondary' ? (darkOverride ? darkAccent : lightAccent) : lightAccent;
      input.value = value;
    });

    const swatches = document.querySelectorAll('[data-setting-color]');
    swatches.forEach((swatch) => {
      const value = String(swatch.dataset.settingColor || '').trim();
      const target = String(swatch.dataset.settingTarget || 'primary').toLowerCase();
      const isDefault = value.toLowerCase() === 'default';
      const isEmpty = value === '';
      const currentValue = target === 'secondary' ? (darkOverride || '') : (state.primaryColor || 'default');
      const matches = isEmpty
        ? currentValue === ''
        : isDefault
          ? currentValue.toLowerCase() === 'default'
          : value.toLowerCase() === String(currentValue || '').trim().toLowerCase();
      swatch.classList.toggle('active', matches);
    });
  }

  function hexToRgba(hex, alpha) {
    const color = hex.replace('#', '');
    const value = color.length === 3
      ? color.split('').map((char) => char + char).join('')
      : color;
    const int = Number.parseInt(value, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function applyRangeFill(slider) {
    if (!slider) return;
    const value = Math.min(100, Math.max(0, Number(slider.value) || 0));
    slider.style.setProperty('--range-fill', `${value}%`);
  }

  function syncVolumeUI() {
    const state = getSettings();
    const slider = document.getElementById('mlx-sfx-slider');
    const label = document.getElementById('mlx-sfx-value');
    if (slider) {
      slider.value = String(state.sfxVolume);
      applyRangeFill(slider);
    }
    if (label) label.textContent = state.soundOn ? `${state.sfxVolume}%` : 'Muted';

    const muteButton = document.getElementById('mlx-sfx-mute');
    if (muteButton) {
      muteButton.classList.toggle('active', state.soundOn);
      muteButton.setAttribute('aria-pressed', String(state.soundOn));
    }

    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
      soundToggle.classList.toggle('active', state.soundOn);
      soundToggle.setAttribute('aria-label', state.soundOn ? 'Zvuk zapnutý' : 'Zvuk vypnutý');
    }
  }

  function syncMusicUI() {
    const state = getSettings();
    const slider = document.getElementById('mlx-music-slider');
    const floatingSlider = document.getElementById('mlx-floating-music-slider');
    const label = document.getElementById('mlx-music-value');
    const trackTitle = document.getElementById('mlx-music-title');
    const floatingTitle = document.getElementById('mlx-floating-music-title');
    const playToggle = document.getElementById('mlx-music-play');
    const floatingPlayToggle = document.getElementById('mlx-floating-music-play');
    const trackButtons = document.querySelectorAll('.mlx-track-item');
    const trackName = state.musicTrack || 'Song-1';
    const formattedTrack = formatTrackDisplayName(trackName);

    if (slider) {
      slider.value = String(state.musicVolume);
      applyRangeFill(slider);
    }
    if (floatingSlider) {
      floatingSlider.value = String(state.musicVolume);
      applyRangeFill(floatingSlider);
    }
    if (label) label.textContent = `${state.musicVolume}%`;
    if (trackTitle) trackTitle.textContent = formattedTrack;
    if (floatingTitle) floatingTitle.textContent = formattedTrack;
    trackButtons.forEach((button) => {
      const isActive = button.dataset.track === trackName;
      button.classList.toggle('is-active', isActive);
    });
    [playToggle, floatingPlayToggle].forEach((toggle) => {
      if (!toggle) return;
      const playing = Boolean(state.musicEnabled && state.soundOn);
      toggle.classList.toggle('is-playing', playing);
      toggle.setAttribute('aria-pressed', String(playing));
      toggle.innerHTML = playing
        ? '<svg class="mlx-player-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1.5"></rect><rect x="14" y="4" width="5" height="16" rx="1.5"></rect></svg>'
        : '<svg class="mlx-player-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5z"></path></svg>';
    });
  }

  function applyInterfaceVisibilityState() {
    const state = getSettings();
    const body = document.body;
    const shouldForceHamburger = !!state.desktopHamburger;
    const shouldCleanMode = !!state.cleanMode;
    const cleanModeItems = normalizeCleanModeItems(state.cleanModeItems);

    body.classList.toggle('mlx-force-hamburger', shouldForceHamburger);
    body.classList.toggle('mlx-clean-mode', shouldCleanMode);

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('is-hidden-by-force', shouldForceHamburger);
      navLinks.style.display = shouldForceHamburger ? 'none' : '';
    }

    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
      hamburger.classList.toggle('is-visible', shouldForceHamburger);
      hamburger.style.display = shouldForceHamburger ? 'flex' : '';
    }

    const visibilityMap = {
      theme: ['themeToggle'],
      sound: ['soundToggle'],
      language: ['langToggle'],
      ai: ['chat-toggle', 'mlx-chat-root'],
      audio: ['mlx-floating-music-widget'],
      nav: ['.nav-links', '.nav-hamburger']
    };

    Object.entries(visibilityMap).forEach(([key, selectors]) => {
      const shouldHide = shouldCleanMode && cleanModeItems[key];

      selectors.forEach((selector) => {
        if (!selector) return;

        if (selector.startsWith('.')) {
          const nodes = document.querySelectorAll(selector);
          nodes.forEach((node) => {
            node.style.display = shouldHide ? 'none' : '';
          });
          return;
        }

        const node = document.getElementById(selector);
        if (node) {
          node.style.display = shouldHide ? 'none' : '';
        }
      });
    });

    if (!shouldCleanMode) {
      ['themeToggle', 'soundToggle', 'langToggle', 'chat-toggle', 'mlx-chat-root'].forEach((id) => {
        const node = document.getElementById(id);
        if (node) node.style.display = '';
      });
      document.querySelectorAll('.nav-links, .nav-hamburger').forEach((node) => {
        node.style.display = '';
      });
      const floatingWidget = document.getElementById('mlx-floating-music-widget');
      if (floatingWidget) floatingWidget.style.display = '';
    }

    window.applyInterfaceVisibilityState = applyInterfaceVisibilityState;
    window.__mlxApplyInterfaceVisibilityState = applyInterfaceVisibilityState;
  }

  function ensureSettingsButton() {
    const nav = document.getElementById('mainNav');
    if (!nav || document.getElementById('mlx-settings-toggle')) return;

    const button = document.createElement('button');
    button.id = 'mlx-settings-toggle';
    button.type = 'button';
    button.className = 'settings-btn';
    button.setAttribute('aria-label', 'Nastavení');
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>';

    const controlWrap = nav.querySelector('div[style*="display:flex"]') || nav.lastElementChild;
    if (controlWrap && controlWrap.appendChild) {
      controlWrap.appendChild(button);
    } else {
      nav.appendChild(button);
    }

    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !document.getElementById('mlx-mobile-settings-button')) {
      const mobileButton = document.createElement('button');
      mobileButton.type = 'button';
      mobileButton.id = 'mlx-mobile-settings-button';
      mobileButton.className = 'mlx-mobile-settings-link';
      mobileButton.textContent = 'Settings';
      mobileMenu.appendChild(mobileButton);
    }
  }

  function ensureGlobalAudioPlayer() {
    let audio = document.getElementById('mlx-global-music-player');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'mlx-global-music-player';
      audio.setAttribute('preload', 'auto');
      audio.loop = true;
      audio.addEventListener('timeupdate', () => {
        if (document.visibilityState === 'hidden') {
          saveMusicProgress(audio);
        }
      });
      audio.addEventListener('ended', () => {
        saveMusicProgress(audio);
      });
      document.body.appendChild(audio);
    }
    return audio;
  }

  function updateMusicPlayback() {
    const state = getSettings();
    const player = ensureGlobalAudioPlayer();
    const trackName = state.musicTrack || 'Song-1';
    const src = `Audio/Music/${trackName}.mp3`;
    const shouldPlay = Boolean(state.musicEnabled && state.soundOn && trackName && trackName !== 'off');
    const savedProgress = getSavedMusicProgress();
    const shouldRestoreTime = savedProgress && savedProgress.track === trackName && savedProgress.currentTime > 0;

    if (player.getAttribute('src') !== src) {
      player.src = src;
      player.load();
    }

    player.volume = Math.max(0, Math.min(1, Number(state.musicVolume) / 100));
    player.muted = !state.soundOn;

    const restorePlaybackPosition = () => {
      if (!shouldRestoreTime || !Number.isFinite(player.duration) || player.duration <= 0) return;
      const restoreTime = Math.min(savedProgress.currentTime, player.duration - 0.5);
      if (restoreTime > 0 && !Number.isNaN(restoreTime)) {
        player.currentTime = restoreTime;
      }
    };

    if (player.dataset.restoreListenerAttached !== 'true') {
      player.addEventListener('loadedmetadata', restorePlaybackPosition, { once: true });
      player.dataset.restoreListenerAttached = 'true';
    }

    if (shouldPlay) {
      player.play().catch(() => {});
    } else {
      player.pause();
    }

    const title = document.getElementById('mlx-music-title');
    if (title) {
      title.textContent = formatTrackDisplayName(trackName);
    }
  }

  function handleMusicAction(action) {
    const nextState = getSettings();
    const tracks = ['Song-1', 'Song-2', 'Song-3'];
    const currentIndex = tracks.indexOf(nextState.musicTrack || 'Song-1');

    if (action === 'next') {
      nextState.musicTrack = tracks[(currentIndex + 1) % tracks.length];
      nextState.musicEnabled = true;
      if (!nextState.soundOn) {
        nextState.soundOn = true;
        localStorage.setItem('mlx-sound', 'on');
        if (typeof soundEnabled !== 'undefined') soundEnabled = true;
      }
    }
    if (action === 'prev') {
      nextState.musicTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
      nextState.musicEnabled = true;
      if (!nextState.soundOn) {
        nextState.soundOn = true;
        localStorage.setItem('mlx-sound', 'on');
        if (typeof soundEnabled !== 'undefined') soundEnabled = true;
      }
    }
    if (action === 'stop') {
      nextState.musicEnabled = false;
    }
    if (action === 'toggle') {
      if (!nextState.soundOn) {
        nextState.soundOn = true;
        localStorage.setItem('mlx-sound', 'on');
        if (typeof soundEnabled !== 'undefined') soundEnabled = true;
      }
      nextState.musicEnabled = !nextState.musicEnabled;
    }
    if (nextState.musicEnabled && (!nextState.musicTrack || nextState.musicTrack === 'off')) {
      nextState.musicTrack = 'Song-1';
    }
    saveSettings(nextState);
    applyStoredSoundState(nextState);
    syncVolumeUI();
    updateMusicPlayback();
    syncMusicUI();
  }

  function createFloatingMusicWidget() {
    if (document.getElementById('mlx-floating-music-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'mlx-floating-music-widget';
    widget.className = 'mlx-floating-music-widget';
    widget.setAttribute('aria-label', 'Plovoucí přehrávač');
    widget.innerHTML = `
      <div class="mlx-floating-music-topbar">
        <button type="button" class="mlx-floating-music-close" data-floating-close="true" aria-label="Skrýt přehrávač">×</button>
      </div>
      <div class="mlx-floating-music-title" id="mlx-floating-music-title">Song 1</div>
      <div class="mlx-floating-music-body">
        <button type="button" class="mlx-player-button is-ghost" data-player-action="prev" aria-label="Předchozí skladba">
          <svg class="mlx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 6v12"></path>
            <path d="M18 7l-9 5 9 5V7z"></path>
          </svg>
        </button>
        <button type="button" class="mlx-player-button is-main" data-player-action="toggle" id="mlx-floating-music-play" aria-label="Přehrát nebo pozastavit hudbu">
          <svg class="mlx-player-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5z"></path></svg>
        </button>
        <button type="button" class="mlx-player-button is-ghost" data-player-action="next" aria-label="Další skladba">
          <svg class="mlx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6v12"></path>
            <path d="M6 7l9 5-9 5V7z"></path>
          </svg>
        </button>
      </div>
      <div class="mlx-floating-music-volume">
        <input id="mlx-floating-music-slider" type="range" min="0" max="100" value="50" aria-label="Hlasitost hudby" />
      </div>
    `;

    const closeButton = widget.querySelector('[data-floating-close]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const nextState = getSettings();
        nextState.floatingSoundPanel = false;
        saveSettings(nextState);
        const toggle = document.getElementById('mlx-floating-panel-toggle');
        if (toggle) toggle.checked = false;
        syncFloatingMusicWidget();
      });
    }

    const floatingSlider = widget.querySelector('#mlx-floating-music-slider');
    if (floatingSlider) {
      const updateRangeFill = (value) => {
        const pct = Math.min(100, Math.max(0, Number(value) || 0));
        floatingSlider.style.setProperty('--range-fill', `${pct}%`);
      };
      updateRangeFill(floatingSlider.value);
      floatingSlider.addEventListener('input', (event) => {
        const nextState = getSettings();
        nextState.musicVolume = Number(event.target.value);
        saveSettings(nextState);
        updateRangeFill(event.target.value);
        updateMusicPlayback();
        syncMusicUI();
      });
    }

    widget.querySelectorAll('[data-player-action]').forEach((button) => {
      button.addEventListener('click', () => handleMusicAction(button.dataset.playerAction));
    });

    widget.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      if (event.target.closest('button') || event.target.closest('input')) return;
      const rect = widget.getBoundingClientRect();
      widget.dataset.dragOffsetX = String(event.clientX - rect.left);
      widget.dataset.dragOffsetY = String(event.clientY - rect.top);
      widget.setPointerCapture?.(event.pointerId);
      widget.classList.add('is-dragging');
    });
    widget.addEventListener('pointermove', (event) => {
      if (!widget.dataset.dragOffsetX || !widget.classList.contains('is-dragging')) return;
      const offsetX = Number(widget.dataset.dragOffsetX || 0);
      const offsetY = Number(widget.dataset.dragOffsetY || 0);
      const nextLeft = Math.min(window.innerWidth - widget.offsetWidth - 16, Math.max(16, event.clientX - offsetX));
      const nextTop = Math.min(window.innerHeight - widget.offsetHeight - 16, Math.max(16, event.clientY - offsetY));
      widget.style.left = `${nextLeft}px`;
      widget.style.top = `${nextTop}px`;
      widget.style.right = 'auto';
      widget.style.bottom = 'auto';
      saveFloatingWidgetPosition(widget);
    });
    widget.addEventListener('pointerup', () => {
      widget.classList.remove('is-dragging');
      delete widget.dataset.dragOffsetX;
      delete widget.dataset.dragOffsetY;
      saveFloatingWidgetPosition(widget);
    });
    widget.addEventListener('pointercancel', () => {
      widget.classList.remove('is-dragging');
      delete widget.dataset.dragOffsetX;
      delete widget.dataset.dragOffsetY;
      saveFloatingWidgetPosition(widget);
    });

    document.body.appendChild(widget);
    restoreFloatingWidgetPosition(widget);
    saveFloatingWidgetPosition(widget);
    syncFloatingMusicWidget();
  }

  function syncFloatingMusicWidget() {
    const widget = document.getElementById('mlx-floating-music-widget');
    if (!widget) return;
    const state = getSettings();
    widget.classList.toggle('is-visible', Boolean(state.floatingSoundPanel));
    const playToggle = document.getElementById('mlx-floating-music-play');
    if (playToggle) {
      const playing = Boolean(state.musicEnabled && state.soundOn);
      playToggle.classList.toggle('is-playing', playing);
      playToggle.setAttribute('aria-pressed', String(playing));
      playToggle.innerHTML = playing
        ? '<svg class="mlx-player-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1.5"></rect><rect x="14" y="4" width="5" height="16" rx="1.5"></rect></svg>'
        : '<svg class="mlx-player-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5z"></path></svg>';
    }
    const floatingSlider = document.getElementById('mlx-floating-music-slider');
    if (floatingSlider) {
      floatingSlider.value = String(state.musicVolume);
      const pct = Math.min(100, Math.max(0, Number(state.musicVolume) || 0));
      floatingSlider.style.setProperty('--range-fill', `${pct}%`);
    }
    const floatingTitle = document.getElementById('mlx-floating-music-title');
    if (floatingTitle) floatingTitle.textContent = formatTrackDisplayName(state.musicTrack || 'Song-1');
  }

  function buildSettingsMarkup() {
    if (document.getElementById('mlx-settings-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'mlx-settings-overlay';
    overlay.className = 'mlx-settings-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
      <aside class="mlx-settings-panel" id="mlx-settings-panel" role="dialog" aria-modal="true" aria-label="Nastavení">
        <div class="mlx-settings-head">
          <div class="mlx-settings-head-left">
            <button type="button" class="mlx-settings-nav-btn" id="mlx-settings-nav-button" aria-label="Otevřít rozšířené nastavení">
              <svg class="mlx-nav-advanced-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <svg class="mlx-nav-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="mlx-settings-title">NASTAVE<span>NÍ</span></div>
          </div>
          <button type="button" class="mlx-settings-close" id="mlx-settings-close" aria-label="Zavřít">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="mlx-settings-body">
          <section class="mlx-settings-page is-active" data-page="basic">
            <div class="mlx-setting-block">
              <div class="mlx-setting-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <span>Vzhled</span>
              </div>
              <div class="mlx-pill-row">
                <button type="button" class="mlx-pill" data-theme-option="automatic" data-i18n="settings-theme-automatic">Dynamicky</button>
                <button type="button" class="mlx-pill" data-theme-option="light" data-i18n="settings-theme-light">Světlý</button>
                <button type="button" class="mlx-pill" data-theme-option="dark" data-i18n="settings-theme-dark">Tmavý</button>
              </div>
            </div>

            <div class="mlx-setting-block">
              <div class="mlx-setting-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 010 7.07"></path><path d="M19.07 4.93a10 10 0 010 14.14"></path></svg>
                <span>Zvuk rozhraní</span>
              </div>
              <div class="mlx-sound-row">
                <button type="button" class="mlx-toggle" id="mlx-sfx-mute" aria-label="Zapnout zvuk">
                  <svg class="mlx-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 010 7.07"></path><path d="M19.07 4.93a10 10 0 010 14.14"></path></svg>
                </button>
                <input id="mlx-sfx-slider" type="range" min="0" max="100" value="70" />
                <span class="mlx-slider-value" id="mlx-sfx-value">70%</span>
              </div>
            </div>

            <div class="mlx-setting-block">
              <div class="mlx-setting-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.4-4-8-10-8z"></path></svg>
                <span>Barva zvýraznění</span>
              </div>
              <div class="mlx-color-swatch-row">
                <button type="button" data-setting-color="#00BFA6" class="mlx-color-swatch" style="background:#00BFA6"></button>
                <button type="button" data-setting-color="#FF8A00" class="mlx-color-swatch" style="background:#FF8A00"></button>
                <button type="button" data-setting-color="#3B82F6" class="mlx-color-swatch" style="background:#3B82F6"></button>
                <button type="button" data-setting-color="#FB7185" class="mlx-color-swatch" style="background:#FB7185"></button>
                <button type="button" data-setting-color="#A78BFA" class="mlx-color-swatch" style="background:#A78BFA"></button>
                <button type="button" data-setting-color="default" class="mlx-color-swatch is-default" aria-label="Výchozí barva" data-i18n="settings-default">Výchozí</button>
                <div class="mlx-custom-color-picker" title="Vlastní barva" data-color-picker="primary" data-color-mode="basic">
                  <input type="color" class="mlx-hidden-color-input" aria-label="Vyber barvu" data-color-native="primary" value="#00BFA6" />
                  <button type="button" class="mlx-color-preview" aria-label="Náhled vlastní barvy" data-color-preview="primary" data-color-mode="basic"></button>
                  <input id="mlx-primary-color-hex" class="mlx-color-hex" type="text" value="#00BFA6" maxlength="7" aria-label="Hex kód barvy" data-color-hex="primary" data-color-mode="basic" />
                </div>
              </div>
            </div>
          </section>

          <section class="mlx-settings-page" data-page="advanced">
            <div class="mlx-advanced-subnav" role="tablist" aria-label="Rozšířené nastavení">
              <button type="button" class="mlx-advanced-tab is-active" data-advanced-page="music" role="tab" aria-selected="true">Hudba</button>
              <button type="button" class="mlx-advanced-tab" data-advanced-page="auto" role="tab" aria-selected="false">Dynamický</button>
              <button type="button" class="mlx-advanced-tab" data-advanced-page="ui" role="tab" aria-selected="false">Rozhraní</button>
            </div>

            <div class="mlx-advanced-page is-active" data-advanced-page="music">
              <div class="mlx-setting-block">
                <div class="mlx-setting-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                  <span>Hudba na pozadí</span>
                </div>
                <div class="mlx-player" aria-label="Hudební přehrávač">
                  <div class="mlx-player-controls">
                    <button type="button" class="mlx-player-button is-ghost" data-player-action="prev" aria-label="Předchozí skladba">
                      <svg class="mlx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M6 6v12"></path>
                        <path d="M18 7l-9 5 9 5V7z"></path>
                      </svg>
                    </button>
                    <button type="button" class="mlx-player-button is-main" data-player-action="toggle" id="mlx-music-play" aria-label="Přehrát nebo pozastavit hudbu">
                      <svg class="mlx-player-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5z"></path></svg>
                    </button>
                    <button type="button" class="mlx-player-button is-ghost" data-player-action="next" aria-label="Další skladba">
                      <svg class="mlx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M18 6v12"></path>
                        <path d="M6 7l9 5-9 5V7z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="mlx-player-title" id="mlx-music-title">Song 1</div>
                  <div class="mlx-player-list" id="mlx-music-tracks" aria-label="Seznam skladeb">
                    <button type="button" class="mlx-track-item is-active" data-track="Song-1">Song 1</button>
                    <button type="button" class="mlx-track-item" data-track="Song-2">Song 2</button>
                    <button type="button" class="mlx-track-item" data-track="Song-3">Song 3</button>
                  </div>
                </div>
                <div class="mlx-sound-row compact">
                  <input id="mlx-music-slider" type="range" min="0" max="100" value="50" />
                  <span class="mlx-slider-value" id="mlx-music-value">50%</span>
                </div>
              </div>

              <div class="mlx-setting-block">
                <div class="mlx-setting-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a4 4 0 018 0v2"></path></svg>
                  <span>Plovoucí panel</span>
                </div>
                <div class="mlx-toggle-stack">
                  <label class="mlx-switch-line">
                    <span>Plovoucí panel</span>
                    <button type="button" class="mlx-switch" data-setting-toggle="floatingPanel" aria-pressed="false">
                      <span class="mlx-switch-knob"></span>
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <div class="mlx-advanced-page" data-advanced-page="auto">
              <div class="mlx-setting-block">
                <div class="mlx-setting-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path></svg>
                  <span>Dynamický</span>
                </div>
                <div class="mlx-time-row">
                  <label>
                    <span>Tmavý od</span>
                    <input id="mlx-dark-start" type="time" value="22:00" />
                  </label>
                  <label>
                    <span>Tmavý do</span>
                    <input id="mlx-dark-end" type="time" value="05:00" />
                  </label>
                </div>
              </div>

              <div class="mlx-setting-block">
                <div class="mlx-setting-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 000 7H14.5a3.5 3.5 0 010 7H6"></path></svg>
                  <span>Barvy režimů</span>
                </div>
                <div class="mlx-theme-mode-stack">
                  <div class="mlx-theme-mode-block">
                    <div class="mlx-theme-mode-label" data-i18n="settings-light-mode">Světlý režim</div>
                    <div class="mlx-color-swatch-row">
                      <button type="button" data-setting-color="#00BFA6" data-setting-target="primary" class="mlx-color-swatch" style="background:#00BFA6"></button>
                      <button type="button" data-setting-color="#FF8A00" data-setting-target="primary" class="mlx-color-swatch" style="background:#FF8A00"></button>
                      <button type="button" data-setting-color="#3B82F6" data-setting-target="primary" class="mlx-color-swatch" style="background:#3B82F6"></button>
                      <button type="button" data-setting-color="#FB7185" data-setting-target="primary" class="mlx-color-swatch" style="background:#FB7185"></button>
                      <button type="button" data-setting-color="#A78BFA" data-setting-target="primary" class="mlx-color-swatch" style="background:#A78BFA"></button>
                      <button type="button" data-setting-color="default" data-setting-target="primary" class="mlx-color-swatch is-default" aria-label="Výchozí barva" data-i18n="settings-default">Výchozí</button>
                    </div>
                    <div class="mlx-custom-color-wrap">
                      <div class="mlx-custom-color-picker" title="Vlastní barva světlého režimu" data-color-picker="primary" data-color-mode="advanced-light">
                        <input type="color" class="mlx-hidden-color-input" aria-label="Vyber barvu světlého režimu" data-color-native="primary" value="#00BFA6" />
                        <button type="button" class="mlx-color-preview" aria-label="Náhled barvy světlého režimu" data-color-preview="primary" data-color-mode="advanced-light"></button>
                        <input id="mlx-primary-color-hex-advanced" class="mlx-color-hex" type="text" value="#00BFA6" maxlength="7" aria-label="Hex kód barvy světlého režimu" data-color-hex="primary" data-color-mode="advanced-light" />
                      </div>
                    </div>
                  </div>
                  <div class="mlx-theme-mode-block">
                    <div class="mlx-theme-mode-label" data-i18n="settings-dark-mode">Tmavý režim</div>
                    <div class="mlx-color-swatch-row">
                      <button type="button" data-setting-color="#00BFA6" data-setting-target="secondary" class="mlx-color-swatch" style="background:#00BFA6"></button>
                      <button type="button" data-setting-color="#FF8A00" data-setting-target="secondary" class="mlx-color-swatch" style="background:#FF8A00"></button>
                      <button type="button" data-setting-color="#3B82F6" data-setting-target="secondary" class="mlx-color-swatch" style="background:#3B82F6"></button>
                      <button type="button" data-setting-color="#FB7185" data-setting-target="secondary" class="mlx-color-swatch" style="background:#FB7185"></button>
                      <button type="button" data-setting-color="#A78BFA" data-setting-target="secondary" class="mlx-color-swatch" style="background:#A78BFA"></button>
                      <button type="button" data-setting-color="" data-setting-target="secondary" class="mlx-color-swatch is-default" aria-label="Použít stejnou barvu jako světlý režim" data-i18n="settings-empty">Prázdné</button>
                    </div>
                    <div class="mlx-dark-color-picker-wrap">
                      <label class="mlx-dark-color-picker">
                        <span>Vlastní tmavý režim</span>
                        <div class="mlx-custom-color-picker" title="Vlastní tmavý režim" data-color-picker="secondary" data-color-mode="advanced-dark">
                          <input type="color" class="mlx-hidden-color-input" aria-label="Vyber barvu tmavého režimu" data-color-native="secondary" value="#FF8A00" />
                          <button type="button" class="mlx-color-preview" aria-label="Náhled tmavého režimu" data-color-preview="secondary" data-color-mode="advanced-dark"></button>
                          <input id="mlx-dark-color-hex" class="mlx-color-hex" type="text" value="#FF8A00" maxlength="7" aria-label="Hex kód tmavého režimu" data-color-hex="secondary" data-color-mode="advanced-dark" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mlx-advanced-page" data-advanced-page="ui">
              <div class="mlx-setting-block">
                <div class="mlx-setting-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a4 4 0 018 0v2"></path></svg>
                  <span>Rozhraní</span>
                </div>
                <div class="mlx-toggle-stack">
                  <label class="mlx-switch-line">
                    <span>Vynutit menu na desktopu</span>
                    <button type="button" class="mlx-switch" data-setting-toggle="desktopHamburger" aria-pressed="false">
                      <span class="mlx-switch-knob"></span>
                    </button>
                  </label>
                  <div class="mlx-clean-row">
                    <label class="mlx-switch-line is-compact">
                      <span>Čistý režim</span>
                      <button type="button" class="mlx-switch" data-setting-toggle="cleanMode" aria-pressed="false">
                        <span class="mlx-switch-knob"></span>
                      </button>
                    </label>
                    <button type="button" class="mlx-clean-edit-btn" data-open-clean-page="true" aria-label="Upravit čistý režim">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <label class="mlx-switch-line">
                    <span>Hra</span>
                    <button type="button" class="mlx-switch" data-setting-toggle="game" aria-pressed="false">
                      <span class="mlx-switch-knob"></span>
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section class="mlx-settings-page" data-page="clean">
            <div class="mlx-setting-block">
              <div class="mlx-setting-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20"></path><path d="M2 12h20"></path></svg>
                <span>Upravit čistý režim</span>
              </div>
              <div class="mlx-toggle-stack">
                <label class="mlx-switch-line">
                  <span>Téma</span>
                  <button type="button" class="mlx-switch" data-clean-toggle="theme" aria-pressed="true">
                    <span class="mlx-switch-knob"></span>
                  </button>
                </label>
                <label class="mlx-switch-line">
                  <span>Zvuk</span>
                  <button type="button" class="mlx-switch" data-clean-toggle="sound" aria-pressed="true">
                    <span class="mlx-switch-knob"></span>
                  </button>
                </label>
                <label class="mlx-switch-line">
                  <span>Jazyk</span>
                  <button type="button" class="mlx-switch" data-clean-toggle="language" aria-pressed="true">
                    <span class="mlx-switch-knob"></span>
                  </button>
                </label>
                <label class="mlx-switch-line">
                  <span>AI</span>
                  <button type="button" class="mlx-switch" data-clean-toggle="ai" aria-pressed="true">
                    <span class="mlx-switch-knob"></span>
                  </button>
                </label>
                <label class="mlx-switch-line">
                  <span>Hudba / audio</span>
                  <button type="button" class="mlx-switch" data-clean-toggle="audio" aria-pressed="true">
                    <span class="mlx-switch-knob"></span>
                  </button>
                </label>
                <label class="mlx-switch-line">
                  <span>Navigace</span>
                  <button type="button" class="mlx-switch" data-clean-toggle="nav" aria-pressed="true">
                    <span class="mlx-switch-knob"></span>
                  </button>
                </label>
              </div>
            </div>
          </section>
        </div>

        <div class="mlx-action-row">
          <button type="button" class="mlx-reset-button" id="mlx-reset-settings">Výchozí nastavení</button>
        </div>

        <div class="mlx-confirm-backdrop" id="mlx-reset-confirm-backdrop" hidden>
          <div class="mlx-confirm-dialog" role="dialog" aria-modal="true" aria-label="Potvrzení resetu nastavení">
            <div class="mlx-confirm-title">Vrátit výchozí nastavení?</div>
            <div class="mlx-confirm-text">Tím se obnoví výchozí režim, barvy a nastavení zvuku.</div>
            <div class="mlx-confirm-actions">
              <button type="button" class="mlx-confirm-button secondary" id="mlx-reset-cancel">Zrušit</button>
              <button type="button" class="mlx-confirm-button primary" id="mlx-reset-confirm">Potvrdit</button>
            </div>
          </div>
        </div>
      </aside>
    `;

    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.id = 'mlx-settings-style';
    style.textContent = `
      body.mlx-force-hamburger .nav-links {
        display: none !important;
      }
      body.mlx-force-hamburger .nav-hamburger {
        display: flex !important;
      }
      body.mlx-clean-mode #themeToggle,
      body.mlx-clean-mode #soundToggle,
      body.mlx-clean-mode #langToggle,
      body.mlx-clean-mode #mlx-chat-root,
      body.mlx-clean-mode #chat-toggle {
        display: none !important;
      }
      .settings-btn, #mlx-settings-toggle {
        width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card);
        border: 1px solid var(--border); color: var(--text-dim); cursor: pointer;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: background var(--trans), border-color var(--trans), color 0.2s, transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 0 0 rgba(0,0,0,0); padding: 0; margin: 0;
      }
      .settings-btn:hover, #mlx-settings-toggle:hover {
        transform: translateY(-1px) rotate(28deg);
        border-color: var(--accent); color: var(--accent);
        box-shadow: 0 0 16px var(--accent-glow);
      }
      .settings-btn svg, #mlx-settings-toggle svg {
        width: 18px; height: 18px; display: block;
      }
      .mlx-settings-overlay {
        position: fixed; inset: 0; z-index: 10050;
        background: transparent;
        opacity: 0; visibility: hidden; pointer-events: none;
        transition: opacity 0.4s var(--ease-out), visibility 0.4s, background 0.4s var(--ease-out), backdrop-filter 0.4s var(--ease-out);
      }
      .mlx-settings-overlay.is-open {
        opacity: 1; visibility: visible; pointer-events: auto;
        background: color-mix(in srgb, var(--bg) 34%, transparent);
        backdrop-filter: blur(9px);
        -webkit-backdrop-filter: blur(9px);
      }
      .mlx-settings-panel {
        position: fixed; top: 0; left: 0; height: 100%;
        width: min(392px, 90vw);
        background: var(--bg-surface);
        border-right: 1px solid var(--border);
        z-index: 10051; display: flex; flex-direction: column;
        transform: translateX(-100%);
        transition: transform 0.5s var(--ease-out), background var(--trans), border-color var(--trans);
        box-shadow: 0 0 60px rgba(0, 0, 0, 0.25);
      }
      .mlx-settings-overlay.is-open .mlx-settings-panel { transform: translateX(0); }
      .mlx-settings-head {
        display: flex; align-items: center; justify-content: space-between; gap: 12px;
        padding: 22px 24px; border-bottom: 1px solid var(--border); flex-shrink: 0;
      }
      .mlx-settings-head-left {
        display: flex; align-items: center; gap: 10px; min-width: 0;
      }
      .mlx-settings-title {
        font-family: var(--font-display, 'Bebas Neue', sans-serif);
        font-size: 1.1rem; letter-spacing: 0.18em; color: var(--text);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .mlx-settings-nav-btn,
      .mlx-settings-close {
        width: 34px; height: 34px; border-radius: 50%; background: none; border: 1px solid var(--border);
        color: var(--text-dim); cursor: pointer; display: grid; place-items: center;
        transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
        padding: 0; flex-shrink: 0;
      }
      .mlx-settings-nav-btn:hover,
      .mlx-settings-close:hover {
        border-color: var(--accent); color: var(--accent); transform: translateY(-1px);
        background: color-mix(in srgb, var(--accent-soft) 85%, transparent);
      }
      .mlx-settings-nav-btn svg,
      .mlx-settings-close svg {
        width: 15px; height: 15px; display: block;
      }
      .mlx-settings-nav-btn .mlx-nav-back-icon { display: none; }
      .mlx-settings-nav-btn.is-back .mlx-nav-advanced-icon { display: none; }
      .mlx-settings-nav-btn.is-back .mlx-nav-back-icon { display: block; }
      .mlx-advanced-subnav {
        display: flex; gap: 8px; margin: 16px 0 10px; padding: 5px; border: 1px solid var(--border);
        border-radius: 999px; background: color-mix(in srgb, var(--bg-card) 80%, var(--bg-surface));
      }
      .mlx-advanced-tab {
        flex: 1 1 0; border: 1px solid transparent; border-radius: 999px; background: transparent; color: var(--text-dim); padding: 9px 10px; cursor: pointer;
        font-size: 0.7rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s ease;
      }
      .mlx-advanced-tab:hover {
        color: var(--text); border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
      }
      .mlx-advanced-tab.is-active {
        border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--text);
        background: linear-gradient(180deg, var(--accent-soft), color-mix(in srgb, var(--bg-card) 88%, transparent));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      }
      .mlx-advanced-page { display: none; }
      .mlx-advanced-page.is-active { display: block; }
      .mlx-settings-body { flex: 1; overflow-y: auto; padding: 8px 24px 32px; scrollbar-width: thin; }
      .mlx-settings-body::-webkit-scrollbar { width: 5px; }
      .mlx-settings-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
      .mlx-settings-page { display: none; }
      .mlx-settings-page.is-active { display: block; }
      .mlx-setting-block { padding: 22px 0; border-bottom: 1px solid var(--border); }
      .mlx-setting-block:last-child { border-bottom: none; }
      .mlx-setting-label {
        font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--text-muted); margin-bottom: 14px;
        display: flex; align-items: center; gap: 8px;
      }
      .mlx-setting-label svg {
        width: 14px; height: 14px; flex-shrink: 0; display: block;
      }
      .mlx-pill-row, .mlx-color-swatch-row, .mlx-player-buttons, .mlx-dual-color-row, .mlx-time-row { display: flex; flex-wrap: wrap; gap: 10px; }
      .mlx-pill-row {
        display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; width: 100%;
      }
      .mlx-theme-mode-stack {
        display: flex; flex-direction: column; gap: 18px;
      }
      .mlx-theme-mode-block {
        display: flex; flex-direction: column; gap: 10px;
      }
      .mlx-theme-mode-label {
        color: var(--text-dim); font-weight: 700; font-size: 0.8rem; letter-spacing: 0.04em;
      }
      .mlx-custom-color-wrap {
        display: flex; justify-content: flex-start;
      }
      .mlx-dark-color-picker-wrap {
        display: flex; justify-content: flex-start;
      }
      .mlx-dark-color-picker {
        display: flex; flex-direction: column; gap: 8px; color: var(--text-dim); font-size: 0.74rem; min-width: 180px;
      }
      .mlx-custom-color-picker {
        display: flex; align-items: center; gap: 8px; width: 100%; min-width: 180px; position: relative;
      }
      .mlx-hidden-color-input {
        position: absolute; inset: 0 auto auto 0; width: 1px; height: 1px; opacity: 0; pointer-events: none;
      }
      .mlx-color-preview {
        width: 42px; height: 42px; border: 1px solid var(--border); background: var(--accent); border-radius: 12px; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12); flex-shrink: 0; padding: 0; cursor: pointer;
      }
      .mlx-color-preview:focus-visible {
        outline: 2px solid color-mix(in srgb, var(--accent) 70%, transparent);
        outline-offset: 2px;
      }
      .mlx-custom-color-picker input[type="text"], .mlx-color-hex {
        flex: 1; min-width: 0; height: 42px; border: 1px solid var(--border); background: var(--bg-card); border-radius: 10px; padding: 0 10px; color: var(--text); font: inherit; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; outline: none;
      }
      .mlx-pill {
        width: 100%; min-height: 42px; padding: 11px 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        color: var(--text-dim); font-size: 0.74rem; font-weight: 500; letter-spacing: 0.02em; cursor: pointer; text-transform: none;
        text-align: center; transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s ease, box-shadow 0.2s ease;
      }
      .mlx-pill:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        color: var(--text);
      }
      .mlx-pill.is-active {
        border-color: var(--accent); color: var(--accent); background: var(--accent-soft); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 24%, transparent);
      }
      .mlx-sound-row { display: flex; align-items: center; gap: 14px; }
      .mlx-sound-row.compact { margin-top: 12px; }
      .mlx-toggle {
        width: 34px; height: 34px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border);
        color: var(--text-dim); cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: border-color 0.2s, color 0.2s, background 0.2s;
      }
      .mlx-toggle.active {
        color: var(--accent); border-color: var(--accent); background: var(--accent-soft);
      }
      .mlx-toggle-icon {
        width: 18px; height: 18px; display: block;
      }
      .mlx-sound-row input[type="range"], .mlx-sound-row.compact input[type="range"],
      .mlx-floating-music-volume input[type="range"] {
        --range-fill: 50%;
        flex: 1; height: 4px; accent-color: var(--accent);
        -webkit-appearance: none;
        appearance: none;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--accent) 0%, var(--accent) var(--range-fill), rgba(255,255,255,0.12) var(--range-fill), rgba(255,255,255,0.12) 100%);
      }
      .mlx-sound-row input[type="range"]::-webkit-slider-thumb,
      .mlx-sound-row.compact input[type="range"]::-webkit-slider-thumb,
      .mlx-floating-music-volume input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.92); border: 2px solid var(--accent); box-shadow: 0 0 0 2px rgba(255,255,255,0.1), 0 0 16px color-mix(in srgb, var(--accent) 70%, transparent);
      }
      .mlx-sound-row input[type="range"]::-moz-range-thumb,
      .mlx-sound-row.compact input[type="range"]::-moz-range-thumb,
      .mlx-floating-music-volume input[type="range"]::-moz-range-thumb {
        width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.92); border: 2px solid var(--accent); box-shadow: 0 0 0 2px rgba(255,255,255,0.1), 0 0 16px color-mix(in srgb, var(--accent) 70%, transparent);
      }
      .mlx-slider-value {
        min-width: 34px; text-align: right; color: var(--text-muted); font-size: 0.72rem; font-variant-numeric: tabular-nums;
      }
      .mlx-color-swatch {
        width: 32px; height: 32px; border-radius: 50%; cursor: pointer; position: relative; flex-shrink: 0;
        background: var(--sw); border: 2px solid transparent; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
        transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s ease;
      }
      .mlx-color-swatch:hover { transform: scale(1.08); }
      .mlx-color-swatch.active {
        border-color: var(--text);
      }
      .mlx-color-swatch.active::after {
        content: ''; position: absolute; inset: 0; border-radius: 50%;
        box-shadow: 0 0 0 2px var(--bg-surface), 0 0 0 4px var(--text);
      }
      .mlx-color-swatch.is-default {
        width: 56px; min-width: 56px; height: 32px; border-radius: 8px; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-dim); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.02em; display: inline-flex; align-items: center; justify-content: center; box-shadow: none; transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease; text-transform: none;
      }
      .mlx-color-swatch.is-default:hover {
        transform: translateY(-1px);
        border-color: var(--accent);
        color: var(--text);
      }
      .mlx-color-swatch.is-default.active {
        background: var(--accent-soft); border-color: var(--accent); color: var(--text);
      }
      .mlx-color-swatch.is-default.active::after { display: none; }
      .mlx-custom-color {
        width: 32px; height: 32px; border-radius: 50%; cursor: pointer; position: relative; flex-shrink: 0;
        background: conic-gradient(from 180deg,#ff5f6d,#ffc371,#4ade80,#38bdf8,#a78bfa,#ff5f6d);
        display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid transparent; transition: transform 0.2s;
      }
      .mlx-custom-color:hover { transform: scale(1.1); }
      .mlx-custom-color input[type="color"] {
        position: absolute; inset: -4px; width: calc(100% + 8px); height: calc(100% + 8px);
        opacity: 0; cursor: pointer; border: none; padding: 0;
      }
      .mlx-player {
        border: 1px solid var(--border);
        background: linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 85%, transparent), transparent);
        border-radius: 18px;
        padding: 14px 14px 12px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 24px rgba(0,0,0,0.05);
      }
      .mlx-player-controls {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 12px;
        margin-bottom: 14px;
      }
      .mlx-player-button {
        width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--border); background: rgba(255,255,255,0.02); color: var(--text); cursor: pointer; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center; transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        margin-inline: auto; padding: 0; position: relative; overflow: hidden;
      }
      .mlx-player-button svg {
        display: block; width: 18px; height: 18px; pointer-events: none;
      }
      .mlx-player-button.is-ghost {
        color: var(--text-dim);
      }
      .mlx-player-button.is-ghost:hover,
      .mlx-player-button.is-main:hover {
        transform: translateY(-1px) scale(1.02);
        border-color: var(--accent);
        color: var(--accent);
      }
      .mlx-player-button.is-ghost:hover .mlx-nav-icon {
        transform: translateX(0) scale(1.06);
      }
      .mlx-player-button.is-main {
        width: 54px; height: 54px; background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, white)); border-color: transparent; color: var(--bg-surface); box-shadow: 0 10px 20px color-mix(in srgb, var(--accent) 30%, transparent);
      }
      .mlx-player-button.is-main.is-playing {
        box-shadow: 0 12px 24px color-mix(in srgb, var(--accent) 36%, transparent);
      }
      .mlx-player-button.is-main .mlx-player-icon {
        width: 18px; height: 18px; transition: transform 0.2s ease;
      }
      .mlx-player-button.is-main:hover .mlx-player-icon {
        transform: scale(1.08);
      }
      .mlx-nav-icon {
        transition: transform 0.25s ease, color 0.25s ease;
      }
      .mlx-floating-music-widget {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: min(190px, calc(100vw - 20px));
        z-index: 10045;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: color-mix(in srgb, var(--bg-surface) 86%, transparent);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 14px 28px rgba(0,0,0,0.12);
        padding: 8px 10px 10px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(8px) scale(0.98);
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
        cursor: grab;
      }
      .mlx-floating-music-widget.is-visible {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }
      .mlx-floating-music-widget.is-dragging {
        cursor: grabbing;
        user-select: none;
      }
      .mlx-floating-music-topbar {
        display: flex;
        justify-content: flex-end;
        min-height: 12px;
      }
      .mlx-floating-music-close {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: transparent;
        color: var(--text-dim);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        line-height: 1;
        padding: 0;
        margin-left: auto;
        font-weight: 700;
      }
      .mlx-floating-music-body {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 8px;
        margin: 2px 0 8px;
      }
      .mlx-floating-music-title {
        color: var(--text);
        font-size: 0.8rem;
        font-weight: 700;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 0.02em;
        margin: 0 0 8px;
      }
      .mlx-floating-music-volume {
        margin-top: 2px;
      }
      .mlx-floating-music-volume input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 4px;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--accent) 0%, var(--accent) var(--range-fill, 50%), rgba(255,255,255,0.14) var(--range-fill, 50%), rgba(255,255,255,0.14) 100%);
        outline: none;
        cursor: pointer;
      }
      .mlx-floating-music-volume input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255,255,255,0.92);
        border: 2px solid var(--accent);
        box-shadow: 0 0 0 2px rgba(255,255,255,0.14), 0 0 14px color-mix(in srgb, var(--accent) 70%, transparent);
      }
      .mlx-floating-music-volume input[type="range"]::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255,255,255,0.92);
        border: 2px solid var(--accent);
        box-shadow: 0 0 0 2px rgba(255,255,255,0.14), 0 0 14px color-mix(in srgb, var(--accent) 70%, transparent);
      }
      .mlx-floating-music-volume input[type="range"]::-moz-range-track {
        height: 4px;
        border-radius: 999px;
        background: rgba(255,255,255,0.14);
      }
      .mlx-floating-music-widget .mlx-player-button {
        width: 32px;
        height: 32px;
      }
      .mlx-floating-music-widget .mlx-player-button.is-main {
        width: 38px;
        height: 38px;
      }
      .mlx-floating-music-widget .mlx-player-button svg {
        width: 14px;
        height: 14px;
      }
      .mlx-player-title {
        text-align: center;
        font-weight: 700;
        color: var(--text);
        min-height: 22px;
        margin-bottom: 12px;
        letter-spacing: 0.03em;
      }
      .mlx-player-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 170px;
        overflow-y: auto;
        padding-right: 4px;
      }
      .mlx-player-list::-webkit-scrollbar { width: 5px; }
      .mlx-player-list::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--accent) 35%, var(--border));
        border-radius: 999px;
      }
      .mlx-track-item {
        border: 1px solid var(--border); background: transparent; color: var(--text-dim); border-radius: 12px; padding: 9px 10px; cursor: pointer; font-size: 0.74rem; text-align: left; transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      }
      .mlx-track-item:hover {
        transform: translateX(2px);
        border-color: var(--accent);
        color: var(--text);
      }
      .mlx-track-item.is-active {
        background: linear-gradient(90deg, var(--accent-soft), transparent);
        border-color: color-mix(in srgb, var(--accent) 70%, var(--border));
        color: var(--text);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
      }
      .mlx-action-row {
        margin-top: auto; padding: 0 24px 20px;
      }
      .mlx-reset-button {
        width: 100%; border: 1px solid var(--border); background: var(--bg-card); color: var(--text); padding: 11px 12px; border-radius: 12px; cursor: pointer; font-size: 0.8rem; position: relative; overflow: hidden; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .mlx-reset-button::before {
        content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 0%, color-mix(in srgb, var(--accent) 18%, transparent) 40%, transparent 100%); transform: translateX(-120%); transition: transform 0.55s ease;
      }
      .mlx-reset-button:hover {
        transform: translateY(-1px); border-color: var(--accent); box-shadow: 0 10px 18px rgba(0,0,0,0.08);
      }
      .mlx-reset-button:hover::before {
        transform: translateX(120%);
      }
      .mlx-confirm-backdrop {
        position: fixed !important; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.26); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        z-index: 10060; padding: 24px;
      }
      .mlx-confirm-backdrop[hidden] {
        display: none !important;
      }
      .mlx-confirm-dialog {
        width: min(300px, calc(100% - 32px)); background: var(--bg-surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px; box-shadow: 0 16px 35px rgba(0,0,0,0.2);
        margin: 0; position: relative; left: auto; top: auto; transform: none;
      }
      .mlx-confirm-title {
        font-weight: 700; font-size: 1.05rem; margin-bottom: 8px; color: var(--text);
      }
      .mlx-confirm-text {
        color: var(--text-dim); font-size: 0.85rem; line-height: 1.5; margin-bottom: 16px;
      }
      .mlx-confirm-actions {
        display: flex; gap: 10px; justify-content: flex-end;
      }
      .mlx-confirm-button {
        border-radius: 10px; padding: 9px 14px; cursor: pointer; border: 1px solid var(--border); background: var(--bg-card); color: var(--text); font-weight: 600;
      }
      .mlx-confirm-button.primary {
        background: var(--accent-soft); border-color: var(--accent); color: var(--text);
      }
      .mlx-dual-color-row label,
      .mlx-time-row label {
        display: flex; flex-direction: column; gap: 8px; color: var(--text-dim); font-size: 0.8rem; min-width: 120px;
      }
      .mlx-dual-color-row input[type="color"], .mlx-time-row input[type="time"] {
        width: 100%; height: 42px; border: 1px solid var(--border); background: var(--bg-card); border-radius: 10px; padding: 4px 8px; color: var(--text);
      }
      .mlx-toggle-stack { display: flex; flex-direction: column; gap: 10px; }
      .mlx-clean-row {
        display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; align-items: center;
      }
      .mlx-switch-line {
        display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--text); font-size: 0.9rem; border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; background: linear-gradient(180deg, var(--bg-card), color-mix(in srgb, var(--bg-card) 76%, transparent));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      }
      .mlx-switch-line.is-compact { padding-block: 8px; }
      .mlx-switch {
        position: relative; display: inline-flex; align-items: center; width: 52px; height: 30px; border-radius: 999px; border: 1px solid var(--border); background: color-mix(in srgb, var(--bg) 72%, var(--bg-card)); cursor: pointer; transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; padding: 0; overflow: hidden;
      }
      .mlx-switch:focus-visible {
        outline: 2px solid color-mix(in srgb, var(--accent) 65%, transparent);
        outline-offset: 2px;
      }
      .mlx-switch::before {
        content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,0.08), transparent); pointer-events: none;
      }
      .mlx-switch[aria-pressed="true"] {
        background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #fff)); border-color: color-mix(in srgb, var(--accent) 75%, var(--border)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent);
      }
      .mlx-switch-knob {
        position: absolute; top: 3px; left: 4px; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.7)); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 4px 10px rgba(0,0,0,0.13); transition: transform 0.25s ease, background 0.25s ease;
      }
      .mlx-switch[aria-pressed="true"] .mlx-switch-knob {
        transform: translateX(22px); background: linear-gradient(180deg, #fff, rgba(255,255,255,0.82));
      }
      .mlx-toggle-line input { accent-color: var(--accent); }
      .mlx-clean-edit-btn {
        width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-card); color: var(--text-dim); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, background 0.2s ease;
      }
      .mlx-clean-edit-btn:hover {
        border-color: var(--accent); color: var(--accent); transform: translateY(-1px); background: var(--accent-soft);
      }
      .mlx-clean-edit-btn svg {
        width: 15px; height: 15px; display: block;
      }
      .mlx-mobile-settings-link {
        display: block; width: 100%; border: none; background: none; color: var(--text-dim); text-align: left; padding: 12px 0; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid var(--border); font-family: inherit;
      }
      @media (max-width: 768px) {
        .mlx-settings-panel { width: 100vw; }
      }
    `;
    document.head.appendChild(style);
  }

  function wireSettingsPanel() {
    buildSettingsMarkup();
    const overlay = document.getElementById('mlx-settings-overlay');
    const panel = document.getElementById('mlx-settings-panel');
    const closeButton = document.getElementById('mlx-settings-close');
    const openButton = document.getElementById('mlx-settings-toggle');
    const mobileOpenButton = document.getElementById('mlx-mobile-settings-button');

    if (!overlay || !panel) return;

    const openPanel = () => {
      closeResetConfirm();
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closePanel = () => {
      closeResetConfirm();
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (openButton) openButton.addEventListener('click', openPanel);
    if (mobileOpenButton) mobileOpenButton.addEventListener('click', openPanel);
    if (closeButton) closeButton.addEventListener('click', closePanel);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closePanel();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
        closePanel();
      }
    });

    const state = getSettings();

    const syncSwitchButton = (button, active) => {
      if (!button) return;
      button.setAttribute('aria-pressed', String(Boolean(active)));
    };

    const syncPanelSwitches = () => {
      const floatingPanelToggle = document.getElementById('mlx-floating-panel-toggle');
      const desktopHamburgerToggle = document.getElementById('mlx-desktop-hamburger-toggle');
      const cleanModeToggle = document.getElementById('mlx-clean-mode-toggle');
      const gameToggle = document.getElementById('mlx-game-toggle');
      const current = getSettings();

      if (floatingPanelToggle) floatingPanelToggle.checked = !!current.floatingSoundPanel;
      if (desktopHamburgerToggle) desktopHamburgerToggle.checked = !!current.desktopHamburger;
      if (cleanModeToggle) cleanModeToggle.checked = !!current.cleanMode;
      if (gameToggle) gameToggle.checked = !!current.game;
      syncGameNavState();

      document.querySelectorAll('[data-setting-toggle]').forEach((button) => {
        const key = button.dataset.settingToggle;
        const value = key === 'floatingPanel' ? !!current.floatingSoundPanel : key === 'desktopHamburger' ? !!current.desktopHamburger : key === 'cleanMode' ? !!current.cleanMode : !!current.game;
        syncSwitchButton(button, value);
      });

      document.querySelectorAll('[data-clean-toggle]').forEach((button) => {
        const key = button.dataset.cleanToggle;
        const value = normalizeCleanModeItems(current.cleanModeItems)[key];
        syncSwitchButton(button, value);
      });
    };
    syncPanelSwitches();

    const themeButtons = document.querySelectorAll('[data-theme-option]');
    themeButtons.forEach((button) => {
      const selected = button.dataset.themeOption === state.theme;
      button.classList.toggle('is-active', selected);
      button.addEventListener('click', () => {
        const nextState = getSettings();
        nextState.theme = button.dataset.themeOption;
        saveSettings(nextState);
        applyStoredSoundState(nextState);
        applyThemeFromSettings();
        syncVolumeUI();
        themeButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      });
    });

    const colorButtons = document.querySelectorAll('[data-setting-color]');
    colorButtons.forEach((button) => {
      const target = String(button.dataset.settingTarget || 'primary').toLowerCase();
      const colorValue = String(button.dataset.settingColor || '').trim();
      const currentValue = target === 'secondary' ? String(state.secondaryColor || '').trim() : String(state.primaryColor || '').trim();
      const isDefaultSelected = currentValue.toLowerCase() === 'default';
      const isBlankSelected = currentValue === '';
      button.classList.toggle('active', colorValue === ''
        ? isBlankSelected
        : colorValue.toLowerCase() === 'default'
          ? isDefaultSelected
          : colorValue.toLowerCase() === currentValue.toLowerCase());
      button.addEventListener('click', () => {
        const nextState = getSettings();
        const targetValue = String(button.dataset.settingTarget || 'primary').toLowerCase();
        const assigned = String(button.dataset.settingColor || '').trim();
        if (targetValue === 'secondary') {
          nextState.secondaryColor = assigned;
        } else {
          nextState.primaryColor = assigned;
        }
        saveSettings(nextState);
        applyAccentColors();
      });
    });

    const sfxSlider = document.getElementById('mlx-sfx-slider');
    const sfxValue = document.getElementById('mlx-sfx-value');
    const sfxToggle = document.getElementById('mlx-sfx-mute');
    if (sfxSlider) {
      sfxSlider.addEventListener('input', (event) => {
        const nextState = getSettings();
        const value = Number(event.target.value);
        nextState.sfxVolume = value;
        nextState.soundOn = value > 0;
        applyRangeFill(event.target);
        if (typeof sfxVolume !== 'undefined') sfxVolume = value;
        if (typeof soundEnabled !== 'undefined') soundEnabled = nextState.soundOn;
        saveSettings(nextState);
        applyStoredSoundState(nextState);
        syncVolumeUI();
        if (sfxValue) sfxValue.textContent = nextState.soundOn ? `${value}%` : 'Muted';
      });
    }
    if (sfxToggle) {
      sfxToggle.addEventListener('click', () => {
        const nextState = getSettings();
        if (nextState.soundOn && nextState.sfxVolume > 0) {
          nextState.soundOn = false;
        } else {
          nextState.soundOn = true;
          if (nextState.sfxVolume === 0) {
            nextState.sfxVolume = 50;
          }
        }
        if (typeof soundEnabled !== 'undefined') soundEnabled = nextState.soundOn;
        if (typeof sfxVolume !== 'undefined') sfxVolume = nextState.sfxVolume;
        saveSettings(nextState);
        applyStoredSoundState(nextState);
        syncVolumeUI();
      });
    }

    const resetButton = document.getElementById('mlx-reset-settings');
    const resetConfirmBackdrop = document.getElementById('mlx-reset-confirm-backdrop');
    const resetConfirmCancel = document.getElementById('mlx-reset-cancel');
    const resetConfirmAction = document.getElementById('mlx-reset-confirm');

    const closeResetConfirm = () => {
      if (resetConfirmBackdrop) {
        resetConfirmBackdrop.setAttribute('hidden', 'hidden');
      }
    };
    closeResetConfirm();

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        if (resetConfirmBackdrop) resetConfirmBackdrop.removeAttribute('hidden');
      });
    }
    if (resetConfirmCancel) {
      resetConfirmCancel.addEventListener('click', closeResetConfirm);
    }
    if (resetConfirmAction) {
      resetConfirmAction.addEventListener('click', () => {
        const defaults = { ...DEFAULT_SETTINGS };
        saveSettings(defaults);
        applyStoredSoundState(defaults);
        applyThemeFromSettings();
        applyAccentColors();
        syncVolumeUI();
        syncMusicUI();
        updateMusicPlayback();
        closeResetConfirm();
      });
    }
    if (resetConfirmBackdrop) {
      resetConfirmBackdrop.addEventListener('click', (event) => {
        if (event.target === resetConfirmBackdrop) closeResetConfirm();
      });
    }

    const musicSlider = document.getElementById('mlx-music-slider');
    if (musicSlider) {
      musicSlider.addEventListener('input', (event) => {
        const nextState = getSettings();
        nextState.musicVolume = Number(event.target.value);
        applyRangeFill(event.target);
        saveSettings(nextState);
        updateMusicPlayback();
        syncMusicUI();
      });
    }

    document.querySelectorAll('[data-player-action]').forEach((button) => {
      button.addEventListener('click', () => handleMusicAction(button.dataset.playerAction));
    });

    document.querySelectorAll('.mlx-track-item').forEach((button) => {
      button.addEventListener('click', () => {
        const nextState = getSettings();
        nextState.musicTrack = button.dataset.track || 'Song-1';
        nextState.musicEnabled = Boolean(nextState.soundOn);
        saveSettings(nextState);
        applyStoredSoundState(nextState);
        syncVolumeUI();
        updateMusicPlayback();
        syncMusicUI();
      });
    });

    const syncColorTarget = (target, value) => {
      const nextState = getSettings();
      if (String(target).toLowerCase() === 'secondary') {
        nextState.secondaryColor = value;
      } else {
        nextState.primaryColor = value;
      }
      saveSettings(nextState);
      applyAccentColors();
    };

    const primaryColorHexInputs = [...document.querySelectorAll('[data-color-hex="primary"]')];
    const darkColorHexInputs = [...document.querySelectorAll('[data-color-hex="secondary"]')];
    const nativeColorInputs = [...document.querySelectorAll('[data-color-native]')];
    const darkStartInput = document.getElementById('mlx-dark-start');
    const darkEndInput = document.getElementById('mlx-dark-end');
    const floatingPanelToggle = document.getElementById('mlx-floating-panel-toggle');
    const desktopHamburgerToggle = document.getElementById('mlx-desktop-hamburger-toggle');
    const cleanModeToggle = document.getElementById('mlx-clean-mode-toggle');
    const gameToggle = document.getElementById('mlx-game-toggle');

    primaryColorHexInputs.forEach((input) => {
      const syncPrimaryInput = (value) => {
        const normalizedValue = normalizeHexColor(value, state.primaryColor || '#00BFA6');
        syncColorTarget('primary', normalizedValue);
        primaryColorHexInputs.forEach((node) => {
          if (node !== input) node.value = normalizedValue;
        });
      };
      input.addEventListener('input', (event) => {
        syncPrimaryInput(event.target.value);
      });
      input.addEventListener('change', (event) => {
        syncPrimaryInput(event.target.value);
      });
    });

    darkColorHexInputs.forEach((input) => {
      const syncSecondaryInput = (value) => {
        const normalizedValue = normalizeHexColor(value, state.secondaryColor || '#FF8A00');
        syncColorTarget('secondary', normalizedValue);
        darkColorHexInputs.forEach((node) => {
          if (node !== input) node.value = normalizedValue;
        });
      };
      input.addEventListener('input', (event) => {
        syncSecondaryInput(event.target.value);
      });
      input.addEventListener('change', (event) => {
        syncSecondaryInput(event.target.value);
      });
    });

    nativeColorInputs.forEach((input) => {
      const target = String(input.dataset.colorNative || 'primary').toLowerCase();
      const preview = input.parentElement && input.parentElement.querySelector('.mlx-color-preview');
      if (preview) {
        preview.addEventListener('click', () => input.click());
      }
      input.addEventListener('input', (event) => {
        const value = normalizeHexColor(event.target.value, target === 'secondary' ? (state.secondaryColor || '#FF8A00') : (state.primaryColor || '#00BFA6'));
        syncColorTarget(target, value);
        const targets = target === 'secondary' ? darkColorHexInputs : primaryColorHexInputs;
        targets.forEach((node) => {
          node.value = value;
        });
      });
    });
    if (darkStartInput) {
      darkStartInput.value = state.darkStart;
      darkStartInput.addEventListener('change', (event) => {
        const nextState = getSettings();
        nextState.darkStart = event.target.value;
        saveSettings(nextState);
        applyThemeFromSettings();
      });
    }
    if (darkEndInput) {
      darkEndInput.value = state.darkEnd;
      darkEndInput.addEventListener('change', (event) => {
        const nextState = getSettings();
        nextState.darkEnd = event.target.value;
        saveSettings(nextState);
        applyThemeFromSettings();
      });
    }
    if (floatingPanelToggle) {
      floatingPanelToggle.checked = !!state.floatingSoundPanel;
      floatingPanelToggle.addEventListener('change', (event) => {
        const nextState = getSettings();
        nextState.floatingSoundPanel = event.target.checked;
        saveSettings(nextState);
        syncFloatingMusicWidget();
      });
    }
    if (desktopHamburgerToggle) {
      desktopHamburgerToggle.checked = !!state.desktopHamburger;
      desktopHamburgerToggle.addEventListener('change', (event) => {
        const nextState = getSettings();
        nextState.desktopHamburger = event.target.checked;
        saveSettings(nextState);
        applyInterfaceVisibilityState();
      });
    }
    if (cleanModeToggle) {
      cleanModeToggle.checked = !!state.cleanMode;
      cleanModeToggle.addEventListener('change', (event) => {
        const nextState = getSettings();
        nextState.cleanMode = event.target.checked;
        saveSettings(nextState);
        applyInterfaceVisibilityState();
      });
    }
    if (gameToggle) {
      gameToggle.checked = !!state.game;
      gameToggle.addEventListener('change', (event) => {
        const nextState = getSettings();
        nextState.game = event.target.checked;
        saveSettings(nextState);
        syncGameNavState();
      });
    }

    document.querySelectorAll('[data-setting-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.settingToggle;
        const next = getSettings();
        if (key === 'floatingPanel') next.floatingSoundPanel = !next.floatingSoundPanel;
        if (key === 'desktopHamburger') next.desktopHamburger = !next.desktopHamburger;
        if (key === 'cleanMode') next.cleanMode = !next.cleanMode;
        if (key === 'game') next.game = !next.game;
        saveSettings(next);
        syncPanelSwitches();
        syncGameNavState();
        applyInterfaceVisibilityState();
        syncFloatingMusicWidget();
      });
    });

    document.querySelectorAll('[data-clean-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.cleanToggle;
        const next = getSettings();
        const items = normalizeCleanModeItems(next.cleanModeItems);
        items[key] = !items[key];
        next.cleanModeItems = items;
        next.cleanMode = next.cleanMode || Object.values(items).some(Boolean);
        saveSettings(next);
        syncPanelSwitches();
        applyInterfaceVisibilityState();
      });
    });

    const advancedTabs = document.querySelectorAll('.mlx-advanced-tab');
    const settingsNavButton = document.getElementById('mlx-settings-nav-button');

    const updateSettingsNavButton = (page) => {
      if (!settingsNavButton) return;
      const isAdvanced = page === 'advanced';
      settingsNavButton.classList.toggle('is-back', isAdvanced);
      settingsNavButton.setAttribute('aria-label', isAdvanced ? 'Zpět na základní nastavení' : 'Otevřít rozšířené nastavení');
    };

    const setActiveAdvancedPage = (page) => {
      advancedTabs.forEach((item) => {
        const active = item.dataset.advancedPage === page;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('.mlx-advanced-page').forEach((section) => {
        section.classList.toggle('is-active', section.dataset.advancedPage === page);
      });
    };

    const setActiveSettingsPage = (page) => {
      document.querySelectorAll('.mlx-settings-page').forEach((section) => {
        section.classList.toggle('is-active', section.dataset.page === page);
      });
      updateSettingsNavButton(page);
      if (page === 'advanced') {
        setActiveAdvancedPage('music');
      }
    };

    if (settingsNavButton) {
      settingsNavButton.addEventListener('click', () => {
        const activePage = document.querySelector('.mlx-settings-page.is-active')?.dataset.page || 'basic';
        setActiveSettingsPage(activePage === 'advanced' ? 'basic' : 'advanced');
      });
    }

    advancedTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setActiveAdvancedPage(tab.dataset.advancedPage);
      });
    });

    document.querySelectorAll('[data-open-clean-page]').forEach((button) => {
      button.addEventListener('click', () => {
        setActiveSettingsPage('clean');
      });
    });

    setActiveSettingsPage('basic');
    syncVolumeUI();
    applyAccentColors();
    syncMusicUI();
    updateMusicPlayback();
    applyInterfaceVisibilityState();
  }

  function init() {
    const state = getSettings();
    applyStoredSoundState(state);
    applyThemeFromSettings();
    applyInterfaceVisibilityState();
    ensureSettingsButton();
    wireSettingsPanel();
    syncGameNavState();
    if (typeof applyTranslations === 'function') {
      const lang = localStorage.getItem('mlx-lang') || 'cz';
      applyTranslations(lang);
    }
    createFloatingMusicWidget();
    syncFloatingMusicWidget();

    const existingThemeToggle = document.getElementById('themeToggle');
    if (existingThemeToggle) {
      existingThemeToggle.addEventListener('click', () => {
        const current = getSettings();
        const nextTheme = current.theme === 'light' ? 'dark' : 'light';
        const saved = getSettings();
        saved.theme = nextTheme;
        saveSettings(saved);
        applyThemeFromSettings();
      });
    }

    const existingSoundToggle = document.getElementById('soundToggle');
    if (existingSoundToggle) {
      existingSoundToggle.addEventListener('click', () => {
        const saved = getSettings();
        saved.soundOn = !saved.soundOn;
        if (!saved.soundOn && saved.sfxVolume === 0) {
          saved.sfxVolume = 70;
        }
        saveSettings(saved);
        applyStoredSoundState(saved);
        syncVolumeUI();
        syncMusicUI();
        updateMusicPlayback();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
