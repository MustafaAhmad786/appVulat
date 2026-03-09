/* ══════════════════════════════════════════════
   render.js  —  Card & UI Rendering Functions
   AppVault Flutter App Store
══════════════════════════════════════════════ */

/**
 * Star rating string generate karta hai
 * @param {number} rating - e.g. 4.5
 * @returns {string}
 */

const DB_URL = "https://appvault-flutterapp-store-web-default-rtdb.asia-southeast1.firebasedatabase.app/"

async function getDownloadCount(appName) {
  const key = appName.replace(/\s+/g, '_').toLowerCase();
  const res = await fetch(`${DB_URL}/downloads/${key}.json`);
  const val = await res.json();
  return val || 0;
}

async function incrementCount(appName) {
  const key = appName.replace(/\s+/g, '_').toLowerCase();
  const count = await getDownloadCount(appName);
  await fetch(`${DB_URL}/downloads/${key}.json`, {
    method: 'PUT',
    body: JSON.stringify(count + 1)
  });
  return count + 1;
}


function buildStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? '½' : '';
  return '★'.repeat(full) + half;
}

/**
 * Download icon SVG (Android)
 */
function androidIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.44-.62-3.05-.98-4.97-.98-1.92 0-3.53.36-4.97.98L4.65 5.67c-.19-.29-.56-.37-.85-.22-.29.15-.42.54-.26.85L5.38 9.48C3.01 10.79 1.2 13.01.04 16h23.92c-1.16-2.99-2.97-5.21-6.36-6.52zM7 13c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>`;
}

/**
 * Download icon SVG (iOS)
 */
function iosIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>`;
}

/**
 * Size icon SVG
 */
function sizeIcon() {
  return `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>`;
}

/**
 * Single app card ka HTML banata hai
 * @param {Object} app - app data object
 * @param {number} index - animation delay ke liye
 * @returns {HTMLElement}
 */
function buildAppCard(app, index) {
  const hasApk = app.apkUrl && app.apkUrl !== '';
  const hasIpa = app.ipaUrl && app.ipaUrl !== '';

  const card = document.createElement('div');
  card.className = 'app-card';
  card.style.animationDelay = (index * 0.06) + 's';

  card.innerHTML = `
    ${app.isNew ? '<span class="badge-new">New</span>' : ''}

    <div class="card-top">
      <div class="app-icon" style="background:${app.iconBg}">${app.icon}</div>
      <div class="app-info">
        <div class="app-name">${app.name}</div>
        <div class="app-dev">${app.developer}</div>
        <span class="app-cat-tag">${app.category}</span>
      </div>
    </div>

    <p class="app-desc">${app.description}</p>

    <div class="meta-row">
      <div class="meta-item">
        <span class="stars">${buildStars(app.rating)}</span>
        <span>${app.rating} (${app.reviews})</span>
      </div>
      <div class="meta-item">
        ${sizeIcon()}
        ${app.size}
      </div>
      <span class="version-pill">v${app.version}</span>
    </div>

    <div class="dl-buttons">
     <a href="${hasApk ? app.apkUrl : '#'}"
   id="btn-${app.name.replace(/\s+/g,'_')}"
   class="dl-btn dl-android ${!hasApk ? 'disabled' : ''}"
   ${hasApk ? 'download' : ''}
   onclick="handleDownload(event, '${app.name}')">
      
${androidIcon()} Android APK
<span class="dl-count" id="count-${app.name.replace(/\s+/g, '_')}">...</span>
      </a>
      <a href="${hasIpa ? app.ipaUrl : '#'}"
         class="dl-btn dl-ios ${!hasIpa ? 'disabled' : ''}"
         ${hasIpa ? 'download' : ''}
         title="${!hasIpa ? 'iOS IPA available nahi' : 'iOS IPA download karein'}">
        ${iosIcon()} iOS IPA
      </a>
    </div>
  `;

  return card;
}

/**
 * App grid render karta hai filtered list ke saath
 * @param {Array} list - filtered apps array
 */
function renderApps(list) {
  const grid = document.getElementById('appGrid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <h3>No Apps Available</h3>
        <p>Search term change karein ya doosri category select karein</p>
      </div>`;
    return;
  }

  list.forEach((app, i) => {
    grid.appendChild(buildAppCard(app, i));
  });
}


async function handleDownload(event, appName) {
  const key = appName.replace(/\s+/g, '_');
  const newCount = await incrementCount(appName);
  document.getElementById('count-' + key).textContent = newCount;
}

async function loadAllCounts() {
  for (const app of appsData) {
    const count = await getDownloadCount(app.name);
    const el = document.getElementById('count-' + app.name.replace(/\s+/g,'_'));
    if (el) el.textContent = count;
  }
}