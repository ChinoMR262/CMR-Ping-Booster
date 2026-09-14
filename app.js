document.addEventListener('DOMContentLoaded', () => {
  loadRemoteVersion();
  initLanguagePreference();
});

async function loadRemoteVersion() {
  const isEnglish = window.location.pathname.includes('/en/');
  const androidReleasePath = isEnglish ? '../android-release.json' : './android-release.json';
  const versionManifestPath = isEnglish ? '../version.json' : './version.json';

  try {
    const [androidResponse, versionResponse] = await Promise.all([
      fetch(androidReleasePath, { cache: 'no-store' }),
      fetch(versionManifestPath, { cache: 'no-store' })
    ]);
    if (!androidResponse.ok || !versionResponse.ok) return;
    const data = await androidResponse.json();
    const versionManifest = await versionResponse.json();

    if (data.versionName && data.versionCode) {
      const androidBadge = document.getElementById('android-version-badge');
      if (androidBadge) {
        androidBadge.textContent = isEnglish
          ? `v${data.versionName} (${data.versionCode}) · Android 7.0 or higher`
          : `v${data.versionName} (${data.versionCode}) · Android 7.0 o superior`;
      }
    }

    if (versionManifest.pc) {
      const pcBadge = document.getElementById('pc-version-badge');
      if (pcBadge) {
        pcBadge.textContent = isEnglish
          ? `v${versionManifest.pc.version} EXE · Standalone Portable Binary`
          : `v${versionManifest.pc.version} EXE · Binario Autónomo Portable`;
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
