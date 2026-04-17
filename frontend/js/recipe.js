(async () => {
  const detail = document.getElementById('recipe-detail');
  const errorMsg = document.getElementById('error-msg');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    detail.innerHTML = '';
    errorMsg.textContent = 'No recipe specified.';
    errorMsg.classList.remove('hidden');
    return;
  }

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

  function diffClass(d) {
    if (!d) return '';
    const l = d.toLowerCase();
    if (l === 'easy') return 'difficulty-easy';
    if (l === 'hard') return 'difficulty-hard';
    return 'difficulty-medium';
  }

  function formatStyle(style) {
    if (!style) return '—';
    return style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function formatType(type) {
    if (!type) return '—';
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  try {
    const [recipe, steps] = await Promise.all([
      fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}`),
      fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}/steps`)
    ]);

    document.title = `${recipe.name} — Pizza Mastery`;

    const imgHtml = recipe.image_url
      ? `<img class="recipe-hero-img" src="${recipe.image_url}" alt="${recipe.name}">`
      : `<div class="recipe-hero-placeholder">🍕</div>`;

    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

    const infoBar = `
      <div class="recipe-info-bar">
        <div class="info-item">
          <span class="info-icon">🍕</span>
          <span class="info-label">Type</span>
          <span class="info-value">${formatType(recipe.pizza_type)}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🍽️</span>
          <span class="info-label">Style</span>
          <span class="info-value">${formatStyle(recipe.style)}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⏱</span>
          <span class="info-label">Prep</span>
          <span class="info-value">${recipe.prep_time ?? '?'} min</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🔥</span>
          <span class="info-label">Cook</span>
          <span class="info-value">${recipe.cook_time ?? '?'} min</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⏰</span>
          <span class="info-label">Total</span>
          <span class="info-value">${totalTime} min</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📊</span>
          <span class="info-label">Difficulty</span>
          <span class="info-value ${diffClass(recipe.difficulty)}">${recipe.difficulty || '—'}</span>
        </div>
      </div>`;

    const ingredientsHtml = (recipe.ingredients || []).length
      ? `<section class="recipe-section">
          <h2 class="section-title">Ingredients</h2>
          <ul class="ingredients-list">
            ${recipe.ingredients.map(ing => `
              <li class="ingredient-item">
                <span class="ingredient-amount">${[ing.amount, ing.unit].filter(Boolean).join(' ')}</span>
                <span class="ingredient-name">${ing.name}</span>
              </li>`).join('')}
          </ul>
        </section>`
      : '';

    const stepsHtml = steps.length
      ? `<section class="recipe-section">
          <h2 class="section-title">Step-by-Step Instructions</h2>
          <p class="steps-hint">Tap each step to expand details</p>
          <ol class="steps-list">
            ${steps.map(s => `
              <li class="step-item" data-step="${s.step_number}">
                <div class="step-header">
                  <div class="step-number">${s.step_number}</div>
                  <div class="step-title">${s.title}</div>
                  <div class="step-toggle">＋</div>
                </div>
                <div class="step-body">
                  <p class="step-desc">${s.description}</p>
                  ${s.image_url ? `<img class="step-img" src="${s.image_url}" alt="Step ${s.step_number}: ${s.title}" loading="lazy">` : ''}
                </div>
              </li>`).join('')}
          </ol>
        </section>`
      : `<section class="recipe-section">
          <h2 class="section-title">Step-by-Step Instructions</h2>
          <p class="steps-empty">Steps coming soon.</p>
        </section>`;

    detail.innerHTML = `
      <div class="recipe-header">
        ${imgHtml}
        <div class="recipe-header-body">
          <div class="recipe-badges">
            <span class="badge">${formatType(recipe.pizza_type)}</span>
            <span class="badge badge-style">${formatStyle(recipe.style)}</span>
          </div>
          <h1 class="recipe-title">${recipe.name}</h1>
          <p class="recipe-description">${recipe.description || ''}</p>
          ${infoBar}
        </div>
      </div>
      ${ingredientsHtml}
      ${stepsHtml}`;

    detail.querySelectorAll('.step-item').forEach(item => {
      const body = item.querySelector('.step-body');
      const toggle = item.querySelector('.step-toggle');
      item.querySelector('.step-header').addEventListener('click', () => {
        const expanded = item.classList.toggle('expanded');
        toggle.textContent = expanded ? '－' : '＋';
      });
    });

  } catch (e) {
    detail.innerHTML = '';
    errorMsg.textContent = 'Could not load recipe. Please try again.';
    errorMsg.classList.remove('hidden');
  }
})();