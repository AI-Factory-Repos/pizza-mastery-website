(async () => {
  const detail = document.getElementById('recipe-detail');
  const errorMsg = document.getElementById('error-msg');
  const compareLink = document.getElementById('compare-link');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    detail.innerHTML = '';
    errorMsg.innerHTML = `
      <div class="error-msg__icon">🫕</div>
      <div class="error-msg__title">No recipe specified.</div>
      <p class="error-msg__text"><a href="index.html">← Back to recipes</a></p>`;
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
        await new Promise(r => setTimeout(r, 600 * (i + 1)));
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

  function showDetailSkeleton() {
    detail.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-detail">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="skeleton-line skeleton-line--medium"></div>
        <div class="skeleton-line skeleton-line--full"></div>
        <div class="skeleton-line skeleton-line--full"></div>
        <div class="skeleton-line skeleton-line--medium"></div>
      </div>`;
  }

  function showLoadingSpinner(container) {
    container.innerHTML = `
      <div class="loading-spinner">
        <span class="loading-spinner__icon">🍕</span>
        <span class="loading-spinner__flame">🔥</span>
        <p class="loading-spinner__text">Preparing your recipe…</p>
      </div>`;
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
        ? `<img class="step-img" src="${step.image_url}" alt="Step ${step.step_number}: ${step.title}" loading="lazy" onerror="this.onerror=null;this.style.display='none';">`
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
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
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
          stepItems.forEach(other => { if (other !== item) collapseItem(other); });
          expandItem(item);
        }
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

  function showError(message, retryFn) {
    detail.innerHTML = '';
    errorMsg.innerHTML = `
      <div class="error-msg__icon">🫕</div>
      <div class="error-msg__title">Mamma mia! Something went wrong.</div>
      <p class="error-msg__text">${message}</p>
      ${retryFn ? '<button class="retry-btn" id="retry-btn">🔄 Retry</button>' : ''}`;
    errorMsg.classList.remove('hidden');
    if (retryFn) {
      document.getElementById('retry-btn').addEventListener('click', () => {
        errorMsg.classList.add('hidden');
        errorMsg.innerHTML = '';
        retryFn();
      });
    }
  }

  async function loadRecipe() {
    showDetailSkeleton();
    errorMsg.classList.add('hidden');
    errorMsg.innerHTML = '';

    let recipe, steps;
    try {
      recipe = await fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}`);
    } catch (e) {
      showError('Could not load the recipe. Please check your connection and try again.', loadRecipe);
      return;
    }

    // Steps loading
    const stepsContainer = document.createElement('div');
    showLoadingSpinner(stepsContainer);

    try {
      steps = await fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}/steps`);
    } catch (e) {
      steps = [];
    }

    if (compareLink && recipe.pizza_type) {
      compareLink.href = `compare.html?type=${encodeURIComponent(recipe.pizza_type)}`;
      compareLink.classList.remove('hidden');
    }

    const imgHtml = recipe.image_url
      ? `<img class="recipe-hero-img" src="${recipe.image_url}" alt="${recipe.name}" onerror="this.onerror=null;this.style.display='none';">`
      : '';

    detail.innerHTML = `
      ${imgHtml}
      <div class="recipe-body">
        <h1 class="recipe-title">${recipe.name}</h1>
        <div class="recipe-meta-row">
          <span class="badge">${formatType(recipe.pizza_type)}</span>
          <span class="badge badge-style">${formatStyle(recipe.style)}</span>
        </div>
        <div class="recipe-times-row">
          <span>⏱ Prep: ${recipe.prep_time ?? '?'} min</span>
          <span>🔥 Cook: ${recipe.cook_time ?? '?'} min</span>
          <span class="${diffClass(recipe.difficulty)}">${recipe.difficulty || ''}</span>
        </div>
        ${recipe.description ? `<p class="recipe-description">${recipe.description}</p>` : ''}
        <section class="ingredients-section">
          <h2 class="section-title">Ingredients</h2>
          ${renderIngredients(recipe.ingredients)}
        </section>
        <section class="steps-section">
          <h2 class="section-title">Steps</h2>
          <div id="steps-container">${renderSteps(steps)}</div>
        </section>
      </div>`;

    const stepsEl = detail.querySelector('.steps-accordion');
    if (stepsEl) {
      initStepAccordion(detail.querySelector('.steps-section'));
    }
  }

  loadRecipe();
})();
