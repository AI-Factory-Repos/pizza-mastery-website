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

    const totalTime = (r.prep_time || 0) + (r.cook_time || 0);

    const descHtml = r.description
      ? `<p class="compare-card-desc">${r.description}</p>`
      : '';

    return `
      <div class="compare-card">
        ${imgHtml}
        <div class="compare-card-body">
          <h2 class="compare-card-title">${r.name}</h2>
          <span class="compare-style-badge">${formatStyle(r.style)}</span>
          ${descHtml}
          <table class="compare-table">
            <tbody>
              <tr>
                <td class="compare-table-label">Style</td>
                <td>${formatStyle(r.style)}</td>
              </tr>
              <tr>
                <td class="compare-table-label">Prep Time</td>
                <td>${r.prep_time ?? '?'} min</td>
              </tr>
              <tr>
                <td class="compare-table-label">Cook Time</td>
                <td>${r.cook_time ?? '?'} min</td>
              </tr>
              <tr>
                <td class="compare-table-label">Total Time</td>
                <td><strong>${totalTime} min</strong></td>
              </tr>
              <tr>
                <td class="compare-table-label">Difficulty</td>
                <td class="${difficultyClass(r.difficulty)}">${r.difficulty || '\u2014'}</td>
              </tr>
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

    // Build maps keyed by ingredient name
    const map1 = {};
    ings1.forEach(i => { map1[buildIngredientKey(i.name)] = i; });
    const map2 = {};
    ings2.forEach(i => { map2[buildIngredientKey(i.name)] = i; });

    const allKeys = Array.from(new Set([...Object.keys(map1), ...Object.keys(map2)])).sort();

    const rows = allKeys.map(key => {
      const i1 = map1[key];
      const i2 = map2[key];
      const inBoth = i1 && i2;
      const onlyIn1 = i1 && !i2;
      const onlyIn2 = !i1 && i2;

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
        const sameAmount = (i1.amount === i2.amount && i1.unit === i2.unit);
        if (!sameAmount) rowClass = 'ing-row--differs';
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
            <thead>
              <tr>
                <th>${r1.name}</th>
                <th>${r2.name}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }

  function renderTechniqueComparison(recipes) {
    if (!recipes || recipes.length < 2) return '';
    const [r1, r2] = recipes;

    const techniques = [
      {
        label: 'Crust Style',
        ny: 'Thin, hand-tossed crust with crispy edges and a chewy interior. Dough is stretched wide and folded when eating.',
        dd: 'Thick, buttery crust baked in a deep pan. Dough lines the sides of the pan forming a deep well for toppings.'
      },
      {
        label: 'Dough Handling',
        ny: 'High-gluten dough tossed and stretched by hand. Minimal oil for a lighter texture.',
        dd: 'Enriched dough pressed into an oiled pan. Often contains cornmeal or butter for a flakier base.'
      },
      {
        label: 'Topping Order',
        ny: 'Traditional layering: sauce first, then cheese, then toppings on top.',
        dd: 'Inverted layering: cheese goes directly on dough, toppings next, sauce poured over everything last.'
      },
      {
        label: 'Baking Temperature',
        ny: 'Very high heat (475–550°F / 245–285°C) for a short time (8–12 min).',
        dd: 'Moderate heat (425–450°F / 218–232°C) for a longer time (25–35 min).'
      },
      {
        label: 'Serving Style',
        ny: 'Large slices served flat, traditionally folded in half lengthwise to eat.',
        dd: 'Served directly from the pan in thick wedges — knife and fork recommended.'
      }
    ];

    const isNY = (style) => style && style.toLowerCase().includes('ny');
    const style1IsNY = isNY(r1.style);

    const rows = techniques.map(t => {
      const val1 = style1IsNY ? t.ny : t.dd;
      const val2 = style1IsNY ? t.dd : t.ny;
      return `
        <tr>
          <td class="technique-label">${t.label}</td>
          <td>${val1}</td>
          <td>${val2}</td>
        </tr>`;
    }).join('');

    return `
      <section class="compare-section">
        <h2 class="compare-section-title">Technique Variations</h2>
        <div class="compare-table-wrapper">
          <table class="compare-technique-table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>${r1.name}<br><small>${formatStyle(r1.style)}</small></th>
                <th>${r2.name}<br><small>${formatStyle(r2.style)}</small></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }

  function renderTimeComparison(recipes) {
    if (!recipes || recipes.length < 2) return '';
    const [r1, r2] = recipes;
    const prep1 = r1.prep_time || 0;
    const cook1 = r1.cook_time || 0;
    const prep2 = r2.prep_time || 0;
    const cook2 = r2.cook_time || 0;
    const total1 = prep1 + cook1;
    const total2 = prep2 + cook2;
    const maxVal = Math.max(prep1, cook1, prep2, cook2, total1, total2, 1);

    function bar(val, max) {
      const pct = Math.round((val / max) * 100);
      return `<div class="time-bar-track"><div class="time-bar-fill" style="width:${pct}%"></div><span class="time-bar-label">${val} min</span></div>`;
    }

    return `
      <section class="compare-section">
        <h2 class="compare-section-title">Cooking Time Comparison</h2>
        <div class="time-comparison-grid">
          <div class="time-col">
            <h3 class="time-col-title">${r1.name} <small>(${formatStyle(r1.style)})</small></h3>
            <div class="time-row"><span class="time-label">Prep</span>${bar(prep1, maxVal)}</div>
            <div class="time-row"><span class="time-label">Cook</span>${bar(cook1, maxVal)}</div>
            <div class="time-row time-row--total"><span class="time-label">Total</span>${bar(total1, maxVal)}</div>
          </div>
          <div class="time-col">
            <h3 class="time-col-title">${r2.name} <small>(${formatStyle(r2.style)})</small></h3>
            <div class="time-row"><span class="time-label">Prep</span>${bar(prep2, maxVal)}</div>
            <div class="time-row"><span class="time-label">Cook</span>${bar(cook2, maxVal)}</div>
            <div class="time-row time-row--total"><span class="time-label">Total</span>${bar(total2, maxVal)}</div>
          </div>
        </div>
      </section>`;
  }

  async function loadComparison() {
    const type = typeSelect.value;
    grid.innerHTML = '<div class="skeleton-card"></div><div class="skeleton-card"></div>';
    ingredientsSection.classList.add('hidden');
    ingredientsSection.innerHTML = '';
    errorMsg.classList.add('hidden');

    // Update URL without reload
    const newUrl = `compare.html?type=${encodeURIComponent(type)}`;
    window.history.replaceState(null, '', newUrl);

    try {
      // Fetch list first to get IDs
      const list = await fetchWithRetry(`/api/recipes?pizza_type=${encodeURIComponent(type)}`);
      if (!list.length) {
        grid.innerHTML = '<p class="no-results">No recipes found for this pizza type.</p>';
        return;
      }

      // Fetch full detail (with ingredients) for up to 2 recipes
      const detailPromises = list.slice(0, 2).map(r =>
        fetchWithRetry(`/api/recipes/${encodeURIComponent(r.id)}`)
      );
      const recipes = await Promise.all(detailPromises);

      grid.innerHTML = recipes.map(renderCompareCard).join('');

      ingredientsSection.innerHTML =
        renderTimeComparison(recipes) +
        renderIngredientsComparison(recipes) +
        renderTechniqueComparison(recipes);
      ingredientsSection.classList.remove('hidden');
    } catch (e) {
      grid.innerHTML = '';
      errorMsg.textContent = 'Could not load comparison. Please check your connection and try again.';
      errorMsg.classList.remove('hidden');
    }
  }

  typeSelect.addEventListener('change', loadComparison);
  loadComparison();
})();
