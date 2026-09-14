document.addEventListener('DOMContentLoaded', () => {
  loadRemoteVersion();
  initLanguagePreference();
});

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
          ? `v${data.android.versionName} · Android 7.0 or higher`
          : `v${data.android.versionName} · Android 7.0 o superior`;
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
