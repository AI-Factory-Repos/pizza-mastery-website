(async () => {
  const grid = document.getElementById('recipes-grid');
  const errorMsg = document.getElementById('error-msg');
  let currentType = '';
  let currentStyle = '';

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

  function buildQueryString() {
    const params = new URLSearchParams();
    if (currentType) params.set('pizza_type', currentType);
    if (currentStyle) params.set('style', currentStyle);
    const qs = params.toString();
    return qs ? `?${qs}` : '';
  }

  function difficultyClass(d) {
    if (!d) return '';
    const l = d.toLowerCase();
    if (l === 'easy') return 'difficulty-easy';
    if (l === 'hard') return 'difficulty-hard';
    return 'difficulty-medium';
  }

  function renderCard(r) {
    const imgHtml = r.image_url
      ? `<img class="recipe-card-img" src="${r.image_url}" alt="${r.name}" loading="lazy">`
      : `<div class="recipe-card-img-placeholder">🍕</div>`;
    return `
      <a class="recipe-card" href="recipe.html?id=${encodeURIComponent(r.id)}">
        ${imgHtml}
        <div class="recipe-card-body">
          <h2 class="recipe-card-title">${r.name}</h2>
          <div class="recipe-meta">
            <span class="badge">${r.pizza_type || ''}</span>
            <span class="badge badge-style">${r.style || ''}</span>
          </div>
          <div class="recipe-times">
            <span>⏱ Prep: ${r.prep_time ?? '?'} min</span>
            <span>🔥 Cook: ${r.cook_time ?? '?'} min</span>
            <span class="${difficultyClass(r.difficulty)}">${r.difficulty || ''}</span>
          </div>
        </div>
      </a>`;
  }

  async function loadRecipes() {
    grid.innerHTML = Array(6).fill('<div class="skeleton-card"></div>').join('');
    errorMsg.classList.add('hidden');
    try {
      const recipes = await fetchWithRetry(`/api/recipes${buildQueryString()}`);
      if (!recipes.length) {
        grid.innerHTML = '<p style="color:var(--clr-ash);grid-column:1/-1;text-align:center;padding:2rem">No recipes found.</p>';
        return;
      }
      grid.innerHTML = recipes.map(renderCard).join('');
    } catch (e) {
      grid.innerHTML = '';
      errorMsg.textContent = 'Could not load recipes. Please try again.';
      errorMsg.classList.remove('hidden');
    }
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
      loadRecipes();
    });
  });

  document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStyle = btn.dataset.style;
      loadRecipes();
    });
  });

  loadRecipes();
})();
