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

  function renderCompareCard(r) {
    const imgHtml = r.image_url
      ? `<img class="compare-card-img" src="${r.image_url}" alt="${r.name}" loading="lazy">`
      : `<div class="compare-card-img" style="display:flex;align-items:center;justify-content:center;font-size:4rem;background:var(--clr-smoke)">🍕</div>`;
    return `
      <div class="compare-card">
        ${imgHtml}
        <div class="compare-card-body">
          <h2 class="compare-card-title">${r.name}</h2>
          <table class="compare-table">
            <tr><td>Style</td><td>${r.style || '—'}</td></tr>
            <tr><td>Prep Time</td><td>${r.prep_time ?? '?'} min</td></tr>
            <tr><td>Cook Time</td><td>${r.cook_time ?? '?'} min</td></tr>
            <tr><td>Difficulty</td><td>${r.difficulty || '—'}</td></tr>
          </table>
          <a href="recipe.html?id=${encodeURIComponent(r.id)}" class="view-recipe-link">View Recipe →</a>
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
        grid.innerHTML = '<p style="color:var(--clr-ash);grid-column:1/-1;text-align:center;padding:2rem">No recipes found for this type.</p>';
        return;
      }
      grid.innerHTML = recipes.slice(0, 2).map(renderCompareCard).join('');
    } catch (e) {
      grid.innerHTML = '';
      errorMsg.textContent = 'Could not load comparison. Please try again.';
      errorMsg.classList.remove('hidden');
    }
  }

  typeSelect.addEventListener('change', loadComparison);
  loadComparison();
})();