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

  try {
    const [recipe, steps] = await Promise.all([
      fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}`),
      fetchWithRetry(`/api/recipes/${encodeURIComponent(id)}/steps`)
    ]);

    document.title = `${recipe.name} — Pizza Mastery`;

    const imgHtml = recipe.image_url
      ? `<img class="recipe-hero-img" src="${recipe.image_url}" alt="${recipe.name}">`
      : `<div style="width:100%;height:280px;background:var(--clr-smoke);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:1.5rem">🍕</div>`;

    const ingredientsHtml = (recipe.ingredients || []).length
      ? `<h2 class="section-title">Ingredients</h2>
         <ul class="ingredients-list">${recipe.ingredients.map(i =>
           `<li><strong>${i.amount || ''} ${i.unit || ''}</strong> ${i.name}</li>`).join('')}
         </ul>`
      : '';

    const stepsHtml = steps.length
      ? `<h2 class="section-title">Steps</h2>
         <ol class="steps-list">${steps.map(s => `
           <li class="step-item" data-step="${s.step_number}">
             <div class="step-number">${s.step_number}</div>
             <div class="step-content">
               <div class="step-title">${s.title} <span style="font-size:0.75rem;color:var(--clr-amber)">(click to expand)</span></div>
               <div class="step-desc">${s.description}${s.image_url ? `<img class="step-img" src="${s.image_url}" alt="Step ${s.step_number}">` : ''}</div>
             </div>
           </li>`).join('')}
         </ol>`
      : '';

    detail.innerHTML = `
      ${imgHtml}
      <h1 class="recipe-title">${recipe.name}</h1>
      <p class="recipe-description">${recipe.description || ''}</p>
      <div class="recipe-info-bar">
        <div class="info-item"><span class="info-label">Type:</span> ${recipe.pizza_type || '—'}</div>
        <div class="info-item"><span class="info-label">Style:</span> ${recipe.style || '—'}</div>
        <div class="info-item"><span class="info-label">Prep:</span> ${recipe.prep_time ?? '?'} min</div>
        <div class="info-item"><span class="info-label">Cook:</span> ${recipe.cook_time ?? '?'} min</div>
        <div class="info-item"><span class="info-label">Difficulty:</span> <span class="${diffClass(recipe.difficulty)}">${recipe.difficulty || '—'}</span></div>
      </div>
      ${ingredientsHtml}
      ${stepsHtml}`;

    detail.querySelectorAll('.step-item').forEach(item => {
      item.addEventListener('click', () => {
        const desc = item.querySelector('.step-desc');
        const img = item.querySelector('.step-img');
        const expanded = desc.classList.toggle('expanded');
        if (img) img.classList.toggle('expanded', expanded);
      });
    });

  } catch (e) {
    detail.innerHTML = '';
    errorMsg.textContent = 'Could not load recipe. Please try again.';
    errorMsg.classList.remove('hidden');
  }
})();