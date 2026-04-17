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
    if (!style) return '\u2014';
    return style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function formatType(type) {
    if (!type) return '\u2014';
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function renderIngredients(ingredients) {
    if (!ingredients || !ingredients.length) {
      return '<p class="no-ingredients">No ingredients listed.</p>';
    }
    const rows = ingredients.map(ing => `
      <li class="ingredient-item">
        <span class="ingredient-amount">${ing.amount || ''} ${ing.unit || ''}</span>
        <span class="ingredient-name">${ing.name}</span>
      </li>`).join('');
    return `<ul class="ingredients-list">${rows}</ul>`;
  }

  function renderSteps(steps) {
    if (!steps || !steps.length) {
      return '<p class="no-steps">No steps available.</p>';
    }
    const items = steps.map(step => {
      const imgHtml = step.image_url
        ? `<img class="step-img" src="${step.image_url}" alt="Step ${step.step_number}: ${step.title}" loading="lazy">`
        : '';
      return `
        <div class="step-item" data-step="${step.step_number}">
          <button class="step-header" aria-expanded="false">
            <div class="step-header-left">
              <span class="step-number">${step.step_number}</span>
              <span class="step-title">${step.title || 'Step ' + step.step_number}</span>
            </div>
            <span class="step-toggle" aria-hidden="true">&#xFF0B;</span>
          </button>
          <div class="step-body" role="region">
            <div class="step-body-inner">
              ${imgHtml}
              <p class="step-description">${step.description || ''}</p>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="steps-controls">
        <button class="steps-expand-all btn-secondary">Expand All</button>
      </div>
      <div class="steps-accordion">${items}</div>`;
  }

  function initStepAccordion(container) {
    const stepItems = container.querySelectorAll('.step-item');
    const expandAllBtn = container.querySelector('.steps-expand-all');
    let allExpanded = false;

    function expandItem(item) {
      const body = item.querySelector('.step-body');
      const toggle = item.querySelector('.step-toggle');
      const header = item.querySelector('.step-header');
      item.classList.add('expanded');
      if (toggle) toggle.innerHTML = '&#xFF0D;';
      if (header) header.setAttribute('aria-expanded', 'true');
      if (body) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    }

    function collapseItem(item) {
      const body = item.querySelector('.step-body');
      const toggle = item.querySelector('.step-toggle');
      const header = item.querySelector('.step-header');
      item.classList.remove('expanded');
      if (toggle) toggle.innerHTML = '&#xFF0B;';
      if (header) header.setAttribute('aria-expanded', 'false');
      if (body) body.style.maxHeight = '0';
    }

    // Ensure all start collapsed
    stepItems.forEach(item => {
      const body = item.querySelector('.step-body');
      if (body) body.style.maxHeight = '0';
    });

    stepItems.forEach(item => {
      const header = item.querySelector('.step-header');
      header.addEventListener('click', () => {
        const isExpanded = item.classList.contains('expanded');
        if (isExpanded) {
          collapseItem(item);
        } else {
          // Accordion: collapse others, expand clicked
          stepItems.forEach(other => { if (other !== item) collapseItem(other); });
          expandItem(item);
        }
        // Sync expand-all button label
        if (expandAllBtn) {
          allExpanded = container.querySelectorAll('.step-item.expanded').length === stepItems.length;
          expandAllBtn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
        }
      });
    });

    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        allExpanded = !allExpanded;
        if (allExpanded) {
          stepItems.forEach(item => expandItem(item));
          expandAllBtn.textContent = 'Collapse All';
        } else {
          stepItems.forEach(item => collapseItem(item));
          expandAllBtn.textContent = 'Expand All';
        }
      });
    }
  }

  try {
    // Show skeleton while loading
    detail.innerHTML = `
      <div class="skeleton-hero"></div>
      <div class="skeleton-text" style="width:60%;height:2rem;margin:1rem 0"></div>
      <div class="skeleton-text" style="width:90%;height:1rem;margin-bottom:0.5rem"></div>
      <div class="skeleton-text" style="width:80%;height:1rem;margin-bottom:1.5rem"></div>
      <div class="skeleton-text" style="width:100%;height:1rem;margin-bottom:0.4rem"></div>
      <div class="skeleton-text" style="width:100%;height:1rem;margin-bottom:0.4rem"></div>
      <div class="skeleton-text" style="width:70%;height:1rem"></div>`;

    const [recipe, steps] = await Promise.all([
      fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}`),
      fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}/steps`)
    ]);

    document.title = `${recipe.name} \u2014 Pizza Mastery`;

    const imgHtml = recipe.image_url
      ? `<img class="recipe-hero-img" src="${recipe.image_url}" alt="${recipe.name}">`
      : `<div class="recipe-hero-placeholder">\uD83C\uDF55</div>`;

    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

    const infoBar = `
      <div class="recipe-info-bar">
        <div class="info-item">
          <span class="info-icon">\uD83C\uDF55</span>
          <span class="info-label">Type</span>
          <span class="info-value">${formatType(recipe.pizza_type)}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">\uD83C\uDF7D\uFE0F</span>
          <span class="info-label">Style</span>
          <span class="info-value">${formatStyle(recipe.style)}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">\u23F1</span>
          <span class="info-label">Prep</span>
          <span class="info-value">${recipe.prep_time ?? '?'} min</span>
        </div>
        <div class="info-item">
          <span class="info-icon">\uD83D\uDD25</span>
          <span class="info-label">Cook</span>
          <span class="info-value">${recipe.cook_time ?? '?'} min</span>
        </div>
        <div class="info-item">
          <span class="info-icon">\u23F0</span>
          <span class="info-label">Total</span>
          <span class="info-value">${totalTime} min</span>
        </div>
        <div class="info-item">
          <span class="info-icon">\uD83D\uDCCA</span>
          <span class="info-label">Difficulty</span>
          <span class="info-value ${diffClass(recipe.difficulty)}">${recipe.difficulty || '\u2014'}</span>
        </div>
      </div>`;

    const compareType = recipe.pizza_type || '';
    const compareLink = compareType
      ? `<a href="compare.html?type=${encodeURIComponent(compareType)}" class="compare-link">\uD83D\uDD04 Compare ${formatType(compareType)} Styles</a>`
      : '';

    detail.innerHTML = `
      ${imgHtml}
      <div class="recipe-main-content">
        <div class="recipe-top">
          <h1 class="recipe-title">${recipe.name}</h1>
          ${compareLink}
        </div>
        ${infoBar}
        ${recipe.description ? `<p class="recipe-description">${recipe.description}</p>` : ''}

        <section class="recipe-section">
          <h2 class="section-title">Ingredients</h2>
          ${renderIngredients(recipe.ingredients)}
        </section>

        <section class="recipe-section">
          <h2 class="section-title">Instructions</h2>
          <div class="steps-container">
            ${renderSteps(steps)}
          </div>
        </section>
      </div>`;

    // Initialise accordion after DOM is updated
    initStepAccordion(detail);

  } catch (e) {
    detail.innerHTML = '';
    errorMsg.textContent = 'Could not load recipe. Please check your connection and try again.';
    errorMsg.classList.remove('hidden');
  }
})();
