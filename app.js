document.addEventListener('DOMContentLoaded', () => {
  initLiveTelemetry();
  loadRemoteVersion();
  initLanguagePreference();
});

function initLiveTelemetry() {
  const pingEl = document.getElementById('live-ping-val');
  const jitterEl = document.getElementById('live-jitter-val');
  const radarStrip = document.getElementById('radar-live-text');

  if (!pingEl || !jitterEl || !radarStrip) return;

  const games = [
    { name: 'CS2 Relay AR', base: 18 },
    { name: 'Valorant LAS', base: 22 },
    { name: 'LoL Cono Sur', base: 19 },
    { name: 'Fortnite BR', base: 28 },
    { name: 'Roblox Edge', base: 31 }
  ];

  setInterval(() => {
    const pingFluctuation = Math.floor(Math.random() * 5) - 2;
    const currentPing = Math.max(14, 21 + pingFluctuation);
    const currentJitter = (0.8 + Math.random() * 0.8).toFixed(1);

    pingEl.textContent = currentPing;
    jitterEl.textContent = currentJitter;

    const stripParts = games.map(g => {
      const gPing = g.base + Math.floor(Math.random() * 4) - 1;
      return `${g.name}: ${gPing}ms`;
    });
    radarStrip.textContent = stripParts.join('   •   ');
  }, 2400);
}

async function loadRemoteVersion() {
  const isEnglish = window.location.pathname.includes('/en/');
  const versionManifestPath = isEnglish ? '../version.json' : './version.json';

  try {
    const res = await fetch(versionManifestPath);
    if (!res.ok) return;
    const data = await res.json();

    if (data.android) {
      const androidBadge = document.getElementById('android-version-badge');
      if (androidBadge) {
        androidBadge.textContent = isEnglish
          ? `v${data.android.versionName} · Package ${data.android.packageId || 'com.cmr.pingbooster'}`
          : `v${data.android.versionName} · Paquete ${data.android.packageId || 'com.cmr.pingbooster'}`;
      }
    }

    if (data.pc) {
      const pcBadge = document.getElementById('pc-version-badge');
      if (pcBadge) {
        pcBadge.textContent = isEnglish
          ? `v${data.pc.version} EXE · Standalone Portable Binary`
          : `v${data.pc.version} EXE · Binario Autónomo Portable`;
      }
    }
  } catch (err) {
    // Modo de fallo silencioso para entornos sin conexión o previsualización local
  }
}

function initLanguagePreference() {
  const langOptions = document.querySelectorAll('.lang-option');
  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const targetLang = opt.textContent.trim().toUpperCase();
      try {
        localStorage.setItem('cmr_preferred_lang', targetLang);
      } catch (e) {
      }
    });
  });
}
