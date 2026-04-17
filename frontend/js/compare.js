(async () => {
  const grid = document.getElementById('compare-grid');
  const errorMsg = document.getElementById('error-msg');
  const ingredientsSection = document.getElementById('ingredients-comparison');
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
        await new Promise(r => setTimeout(r, 600 * (i + 1)));
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

  function showSkeletons() {
    grid.innerHTML = '<div class="skeleton-card"></div><div class="skeleton-card"></div>';
  }

  function showLoadingSpinner() {
    grid.innerHTML = `
      <div class="loading-spinner" style="grid-column:1/-1">
        <span class="loading-spinner__icon">🍕</span>
        <span class="loading-spinner__flame">🔥</span>
        <p class="loading-spinner__text">Comparing styles…</p>
      </div>`;
  }

  function showError(retryFn) {
    grid.innerHTML = '';
    errorMsg.innerHTML = `
      <div class="error-msg__icon">🫕</div>
      <div class="error-msg__title">Mamma mia! Something went wrong.</div>
      <p class="error-msg__text">Could not load recipes. Please check your connection and try again.</p>
      <button class="retry-btn" id="retry-btn">🔄 Retry</button>`;
    errorMsg.classList.remove('hidden');
    document.getElementById('retry-btn').addEventListener('click', () => {
      errorMsg.classList.add('hidden');
      errorMsg.innerHTML = '';
      retryFn();
    });
  }

  function renderCompareCard(r) {
    const imgHtml = r.image_url
      ? `<img class="compare-card-img" src="${r.image_url}" alt="${r.name}" loading="lazy" onerror="this.onerror=null;this.style.display='none';">`
      : `<div class="compare-card-img compare-card-img--placeholder">🍕</div>`;

    const totalTime = (r.prep_time || 0) + (r.cook_time || 0);
    const descHtml = r.description ? `<p class="compare-card-desc">${r.description}</p>` : '';

    return `
      <div class="compare-card">
        ${imgHtml}
        <div class="compare-card-body">
          <h2 class="compare-card-title">${r.name}</h2>
          <span class="compare-style-badge">${formatStyle(r.style)}</span>
          ${descHtml}
          <table class="compare-table">
            <tbody>
              <tr><td class="compare-table-label">Style</td><td>${formatStyle(r.style)}</td></tr>
              <tr><td class="compare-table-label">Prep Time</td><td>${r.prep_time ?? '?'} min</td></tr>
              <tr><td class="compare-table-label">Cook Time</td><td>${r.cook_time ?? '?'} min</td></tr>
              <tr><td class="compare-table-label">Total Time</td><td><strong>${totalTime} min</strong></td></tr>
              <tr><td class="compare-table-label">Difficulty</td><td class="${difficultyClass(r.difficulty)}">${r.difficulty || '\u2014'}</td></tr>
            </tbody>
          </table>
          <a href="recipe.html?id=${encodeURIComponent(r.id)}" class="view-recipe-link">View Full Recipe \u2192</a>
        </div>
      </div>`;
  }

  function buildIngredientKey(name) {
    return (name || '').toLowerCase().trim();
  }

  function renderIngredientsComparison(recipes) {
    if (!recipes || recipes.length < 2) return '';
    const [r1, r2] = recipes;
    const ings1 = r1.ingredients || [];
    const ings2 = r2.ingredients || [];

    const map1 = {};
    ings1.forEach(i => { map1[buildIngredientKey(i.name)] = i; });
    const map2 = {};
    ings2.forEach(i => { map2[buildIngredientKey(i.name)] = i; });

    const allKeys = Array.from(new Set([...Object.keys(map1), ...Object.keys(map2)])).sort();

    const rows = allKeys.map(key => {
      const i1 = map1[key];
      const i2 = map2[key];
      const onlyIn1 = i1 && !i2;
      const onlyIn2 = !i1 && i2;
      const inBoth = i1 && i2;

      const cell1 = i1
        ? `<span class="ing-amount">${i1.amount || ''} ${i1.unit || ''}</span> ${i1.name}`
        : `<span class="ing-missing">\u2014 not used</span>`;
      const cell2 = i2
        ? `<span class="ing-amount">${i2.amount || ''} ${i2.unit || ''}</span> ${i2.name}`
        : `<span class="ing-missing">\u2014 not used</span>`;

      let rowClass = '';
      if (onlyIn1) rowClass = 'ing-row--only-left';
      else if (onlyIn2) rowClass = 'ing-row--only-right';
      else if (inBoth) {
        if (i1.amount !== i2.amount || i1.unit !== i2.unit) rowClass = 'ing-row--differs';
      }

      return `<tr class="${rowClass}"><td>${cell1}</td><td>${cell2}</td></tr>`;
    }).join('');

    return `
      <section class="compare-section">
        <h2 class="compare-section-title">Ingredient Comparison</h2>
        <div class="compare-legend">
          <span class="legend-item legend-only-left">Only in ${formatStyle(r1.style)}</span>
          <span class="legend-item legend-only-right">Only in ${formatStyle(r2.style)}</span>
          <span class="legend-item legend-differs">Different amount</span>
        </div>
        <div class="compare-table-wrapper">
          <table class="compare-ingredients-table">
            <thead><tr><th>${r1.name}</th><th>${r2.name}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }

  function renderTechniqueComparison(recipes) {
    if (!recipes || recipes.length < 2) return '';
    const [r1, r2] = recipes;
    const rows = [
      ['Style', formatStyle(r1.style), formatStyle(r2.style)],
      ['Prep Time', `${r1.prep_time ?? '?'} min`, `${r2.prep_time ?? '?'} min`],
      ['Cook Time', `${r1.cook_time ?? '?'} min`, `${r2.cook_time ?? '?'} min`],
      ['Total Time', `${(r1.prep_time||0)+(r1.cook_time||0)} min`, `${(r2.prep_time||0)+(r2.cook_time||0)} min`],
      ['Difficulty', r1.difficulty || '\u2014', r2.difficulty || '\u2014'],
    ].map(([label, v1, v2]) => `
      <tr>
        <td class="compare-table-label">${label}</td>
        <td>${v1}</td>
        <td>${v2}</td>
      </tr>`).join('');

    return `
      <section class="compare-section">
        <h2 class="compare-section-title">Technique Comparison</h2>
        <div class="compare-table-wrapper">
          <table class="compare-ingredients-table">
            <thead><tr><th>Detail</th><th>${r1.name}</th><th>${r2.name}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }

  async function loadComparison() {
    const type = typeSelect.value;
    showSkeletons();
    ingredientsSection.classList.add('hidden');
    ingredientsSection.innerHTML = '';
    errorMsg.classList.add('hidden');
    errorMsg.innerHTML = '';

    let recipes;
    try {
      recipes = await fetchWithRetry(`/api/recipes?pizza_type=${encodeURIComponent(type)}`);
    } catch (e) {
      showError(loadComparison);
      return;
    }

    if (!recipes || recipes.length < 2) {
      grid.innerHTML = '<p class="no-results" style="grid-column:1/-1">Not enough recipes found for comparison.</p>';
      return;
    }

    // Fetch full details for ingredients
    let fullRecipes = recipes;
    try {
      fullRecipes = await Promise.all(
        recipes.slice(0, 2).map(r => fetchWithRetry(`/api/recipes/${encodeURIComponent(r.id)}`).catch(() => r))
      );
    } catch (e) {
      fullRecipes = recipes.slice(0, 2);
    }

    grid.innerHTML = fullRecipes.map(renderCompareCard).join('');

    const ingHtml = renderIngredientsComparison(fullRecipes);
    const techHtml = renderTechniqueComparison(fullRecipes);
    if (ingHtml || techHtml) {
      ingredientsSection.innerHTML = ingHtml + techHtml;
      ingredientsSection.classList.remove('hidden');
    }
  }

  typeSelect.addEventListener('change', loadComparison);
  loadComparison();
})();
