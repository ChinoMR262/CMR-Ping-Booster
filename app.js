document.addEventListener('DOMContentLoaded', () => {
  initLiveTelemetry();
  loadRemoteVersion();
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
    const currentJitter = (0.8 + Math.random() * 0.9).toFixed(1);

    pingEl.textContent = currentPing;
    jitterEl.textContent = currentJitter;

    const stripParts = games.map(g => {
      const gPing = g.base + Math.floor(Math.random() * 4) - 1;
      return `${g.name}: ${gPing}ms`;
    });
    radarStrip.textContent = stripParts.join('   •   ');
  }, 2200);
}

async function loadRemoteVersion() {
  try {
    const res = await fetch('./version.json');
    if (!res.ok) return;
    const data = await res.json();

    if (data.android) {
      const androidBadge = document.getElementById('android-version-badge');
      if (androidBadge) androidBadge.textContent = `v${data.android.versionName} APK · Directo sin desinstalar`;
    }

    if (data.pc) {
      const pcBadge = document.getElementById('pc-version-badge');
      if (pcBadge) pcBadge.textContent = `v${data.pc.version} EXE · Portable de 64-bit`;
    }
  } catch (err) {
  }
}
