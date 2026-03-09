/* ══════════════════════════════════════════════
   main.js  —  App Logic & Event Listeners
   AppVault Flutter App Store
══════════════════════════════════════════════ */

// Current active category
let currentCategory = 'all';

/**
 * Search aur category ke basis par apps filter karta hai
 * @returns {Array} filtered apps
 */
function getFilteredApps() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();

  return appsData.filter(app => {
    const matchesCategory = currentCategory === 'all' || app.category === currentCategory;
    const matchesSearch   = !query
      || app.name.toLowerCase().includes(query)
      || app.description.toLowerCase().includes(query)
      || app.developer.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

/**
 * Filter apply karke grid re-render karta hai
 */
function applyFilters() {
  renderApps(getFilteredApps());
}

/**
 * Category change event handler
 * @param {string} cat - category key
 * @param {HTMLElement} clickedBtn - clicked button element
 */
function setCategory(cat, clickedBtn) {
  currentCategory = cat;

  // Active class update
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  applyFilters();
}

/**
 * Page initialize karta hai
 */
function init() {
  // Total apps count
  document.getElementById('totalApps').textContent = appsData.length;

  // Category buttons ko event listeners attach karo
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCategory(btn.dataset.cat, btn);
    });
  });

  // Search input listener
  document.getElementById('searchInput').addEventListener('input', applyFilters);

  // Initial render
  renderApps(appsData);
}

// DOM ready hone par init chalao
document.addEventListener('DOMContentLoaded', init);

loadAllCounts();