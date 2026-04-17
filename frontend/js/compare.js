(async () => {
  const grid = document.getElementById('compare-grid');
  const errorMsg = document.getElementById('error-msg');
  const typeSelect = document.getElementById('type-select');
  const params = new URLSearchParams(window.location.search);
  const urlType = params.get('type');
  if (urlType) typeSelect.value = urlType;

  async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (e) {
        if (i === retries - 1) throw e;
        await new Promise(r => setTimeout(r, 500 * (i + 1)));
      }
    }
  }

  function formatStyle(style) {
    if (!style) return '\u2014';
    return style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function difficultyClass(d) {
    if (!d) return '';
    const l = d.toLowerCase();
    if (l === 'easy') return 'difficulty-easy';
    if (l === 'hard') return 'difficulty-hard';
    return 'difficulty-medium';
  }

  function renderCompareCard(r) {
    const imgHtml = r.image_url
      ? `<img class="compare-card-img" src="${r.image_url}" alt="${r.name}" loading="lazy">`
      : `<div class="compare-card-img compare-card-img--placeholder">\uD83C\uDF55</div>`;
    return `
      <div class="compare-card">
        ${imgHtml}
        <div class="compare-card-body">
          <h2 class="compare-card-title">${r.name}</h2>
          <table class="compare-table">
            <tbody>
              <tr><td>Style</td><td>${formatStyle(r.style)}</td></tr>
              <tr><td>Prep Time</td><td>${r.prep_time ?? '?'} min</td></tr>
              <tr><td>Cook Time</td><td>${r.cook_time ?? '?'} min</td></tr>
              <tr><td>Difficulty</td><td class="${difficultyClass(r.difficulty)}">${r.difficulty || '\u2014'}</td></tr>
            </tbody>
          </table>
          <a href="recipe.html?id=${encodeURIComponent(r.id)}" class="view-recipe-link">View Full Recipe \u2192</a>
        </div>
      </div>`;
  }

  async function loadComparison() {
    const type = typeSelect.value;
    grid.innerHTML = '<div class="skeleton-card"></div><div class="skeleton-card"></div>';
    errorMsg.classList.add('hidden');
    try {
      const recipes = await fetchWithRetry(`/api/recipes?pizza_type=${encodeURIComponent(type)}`);
      if (!recipes.length) {
        grid.innerHTML = '<p class="no-results">No recipes found for this pizza type.</p>';
        return;
      }
      grid.innerHTML = recipes.slice(0, 2).map(renderCompareCard).join('');
    } catch (e) {
      grid.innerHTML = '';
      errorMsg.textContent = 'Could not load comparison. Please check your connection and try again.';
      errorMsg.classList.remove('hidden');
    }
  }

  typeSelect.addEventListener('change', loadComparison);
  loadComparison();
})();
