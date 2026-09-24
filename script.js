const meals = [
  {
    id: 1,
    title: "Chicken, Sweet Potato & Avocado Bowl",
    user: "sophia.m",
    location: "Boston, MA",
    tag: "college",
    tagLabel: "College Meal",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    description: "Quick, filling, and easy to meal prep for busy class days.",
    ingredients: ["Chicken breast", "Sweet potato", "Avocado", "Rice", "Spinach", "Olive oil", "Salt + pepper"],
    instructions: [
      "Roast cubed sweet potato at 425°F until tender.",
      "Season and cook chicken in a skillet.",
      "Add rice and spinach to a bowl.",
      "Top with chicken, sweet potato, and avocado."
    ]
  },
  {
    id: 2,
    title: "TikTok Pasta (But Better)",
    user: "emily.c",
    location: "New York, NY",
    tag: "quick",
    tagLabel: "Quick Dinner",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    description: "A fast weeknight pasta that feels more exciting than another frozen meal.",
    ingredients: ["Pasta", "Cherry tomatoes", "Garlic", "Feta", "Olive oil", "Fresh basil", "Red pepper flakes"],
    instructions: [
      "Bake tomatoes, garlic, feta, and olive oil at 400°F.",
      "Cook pasta while the tomatoes bake.",
      "Mash the baked mixture into a sauce.",
      "Toss with pasta and finish with basil."
    ]
  },
  {
    id: 3,
    title: "Honey Garlic Chicken Bowl",
    user: "jake.l",
    location: "Columbus, OH",
    tag: "protein",
    tagLabel: "High Protein",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    description: "High-protein, simple ingredients, and easy to prep for the week.",
    ingredients: ["Chicken", "Rice", "Broccoli", "Garlic", "Honey", "Soy sauce"],
    instructions: [
      "Cook chicken in a pan until browned.",
      "Add garlic, honey, and soy sauce.",
      "Steam or roast broccoli.",
      "Serve over rice."
    ]
  }
];

meals.push(...[
  {
    "id": 4,
    "title": "Chicken & Hummus Bowl",
    "tag": "protein",
    "tags": [
      "protein",
      "quick"
    ],
    "minutes": 10,
    "tagLabel": "High Protein",
    "user": "platepal",
    "location": "Recipe inspiration",
    "image": "images/hummus.jpg",
    "description": "Ready-cooked chicken and hummus make this a protein-centered, no-cook dinner.",
    "ingredients": [
      "Cooked chicken breast",
      "Hummus",
      "Mixed greens",
      "Cucumber",
      "Lemon",
      "Whole-wheat pita"
    ],
    "instructions": [
      "Slice the cucumber and cooked chicken.",
      "Arrange greens, hummus and chicken in a bowl. Add lemon and serve with pita."
    ],
    "source": "Good Food",
    "sourceUrl": "https://www.bbcgoodfood.com/recipes/quick-chicken-hummus-bowl",
    "imageAlt": "Stock photo of hummus topped with chickpeas and herbs"
  },
  {
    "id": 5,
    "title": "Chicken & Chickpea Rice Pot",
    "tag": "protein",
    "tags": [
      "protein"
    ],
    "minutes": 35,
    "tagLabel": "High Protein",
    "user": "platepal",
    "location": "Recipe inspiration",
    "image": "images/chicken-rice.jpg",
    "description": "Chicken and chickpeas share the spotlight in a filling one-pot meal.",
    "ingredients": [
      "Chicken breast",
      "Canned chickpeas",
      "Rice",
      "Onion",
      "Chicken stock",
      "Ground cumin",
      "Olive oil"
    ],
    "instructions": [
      "Dice chicken and onion; sauté in oil.",
      "Stir in rinsed rice, drained chickpeas and cumin. Add stock using the rice package’s liquid ratio.",
      "Cover and simmer until rice is tender and chicken reaches 165°F / 74°C."
    ],
    "source": "Good Food",
    "sourceUrl": "https://www.bbcgoodfood.com/recipes/one-pot-chicken-chickpea-pilau",
    "imageAlt": "Stock photo of chicken served over rice"
  },
  {
    "id": 6,
    "title": "Lemon Tuna Pasta",
    "tag": "quick",
    "tags": [
      "quick"
    ],
    "minutes": 25,
    "tagLabel": "Quick Dinner",
    "user": "platepal",
    "location": "Recipe inspiration",
    "image": "images/tuna-pasta.jpg",
    "description": "A bright pantry pasta for a busy evening.",
    "ingredients": [
      "Pasta",
      "Canned tuna",
      "Cherry tomatoes",
      "Spinach",
      "Lemon",
      "Olive oil"
    ],
    "instructions": [
      "Boil pasta according to the package. Reserve a little cooking water before draining.",
      "Soften halved tomatoes in oil, then stir in drained tuna and spinach.",
      "Toss with pasta, lemon and a splash of cooking water. Heat through."
    ],
    "source": "Good Food",
    "sourceUrl": "https://www.bbcgoodfood.com/recipes/healthy-tuna-pasta",
    "imageAlt": "Stock photo of tuna penne with vegetables"
  },
  {
    "id": 7,
    "title": "Black Bean & Corn Quesadillas",
    "tag": "budget",
    "tags": [
      "budget",
      "quick",
      "college"
    ],
    "minutes": 20,
    "tagLabel": "Budget Friendly",
    "user": "platepal",
    "location": "Recipe inspiration",
    "image": "images/quesadilla.jpg",
    "description": "A low-fuss dinner built around canned beans and freezer staples.",
    "ingredients": [
      "Canned black beans",
      "Corn",
      "Cheddar",
      "Tortillas",
      "Taco seasoning"
    ],
    "instructions": [
      "Drain beans and corn; mix with shredded cheddar and taco seasoning.",
      "Spread over half of each tortilla and fold.",
      "Toast both sides in a skillet over medium heat until crisp and the cheese melts."
    ],
    "source": "Budget Bytes",
    "sourceUrl": "https://www.budgetbytes.com/hearty-black-bean-quesadillas/",
    "imageAlt": "Stock photo of toasted quesadilla wedges"
  },
  {
    "id": 8,
    "title": "Tomato & White Bean Skillet",
    "tag": "budget",
    "tags": [
      "budget",
      "quick"
    ],
    "minutes": 25,
    "tagLabel": "Budget Friendly",
    "user": "platepal",
    "location": "Recipe inspiration",
    "image": "images/white-beans.jpg",
    "description": "An affordable pantry-first skillet; use frozen spinach to reduce waste.",
    "ingredients": [
      "Canned white beans",
      "Canned tomatoes",
      "Spinach",
      "Garlic",
      "Olive oil",
      "Dried oregano",
      "Bread"
    ],
    "instructions": [
      "Soften chopped garlic in olive oil.",
      "Add drained beans, tomatoes and oregano; simmer until saucy.",
      "Wilt in spinach and serve with bread."
    ],
    "source": "Budget Bytes",
    "sourceUrl": "https://www.budgetbytes.com/white-bean-recipes/",
    "imageAlt": "Stock photo of bean stew"
  },
  {
    "id": 9,
    "title": "Chickpea Curry & Rice",
    "tag": "budget",
    "tags": [
      "budget",
      "college"
    ],
    "minutes": 30,
    "tagLabel": "Budget Friendly",
    "user": "platepal",
    "location": "Recipe inspiration",
    "image": "images/chickpea-curry.jpg",
    "description": "Stretch pantry staples into a comforting dinner with leftovers.",
    "ingredients": [
      "Canned chickpeas",
      "Rice",
      "Canned tomatoes",
      "Onion",
      "Curry powder",
      "Plain yogurt",
      "Olive oil"
    ],
    "instructions": [
      "Start the rice according to its package directions.",
      "Soften chopped onion in oil; stir in curry powder, drained chickpeas and tomatoes.",
      "Simmer until thick, then serve over rice with yogurt."
    ],
    "source": "Good Food",
    "sourceUrl": "https://www.bbcgoodfood.com/recipes/chole-with-cumin-rice-raita/",
    "imageAlt": "Stock photo of chickpea curry and white rice"
  }
]);

const $ = id => document.getElementById(id);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function read(key, fallback) {
  try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; } catch { return fallback; }
}
let toastTimer;
function notify(message) {
  $('toast').textContent = message;
  $('toast').classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.add('hidden'), 4000);
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { notify('Browser storage is unavailable. Changes will last until you close this page.'); return false; }
}
let saved = read('platePalSaved', []);
let joined = read('platePalJoined', []);
let groceries = read('platePalGroceries', []).filter(x => x && typeof x.name === 'string');
let shared = read('platePalMeals', []).filter(x => x && typeof x.title === 'string' && Array.isArray(x.ingredients) && Array.isArray(x.instructions));
meals.unshift(...shared);
let events = read('platePalEvents', []);
let filter = 'all';
let currentMeal = null;
const username = value => String(value || '').trim().replace(/^@+/, '').trim().toLowerCase();
let profileUser = null;
let profileReturn = null;
let compliments = read('platePalCompliments', []);
let groupCompliments = {};
const complimentBusy = new Set();
let visitorId;
try { visitorId = localStorage.getItem('platePalVisitor'); } catch {}
if (!/^[a-zA-Z0-9-]{16,100}$/.test(visitorId || '')) {
  visitorId = `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try { localStorage.setItem('platePalVisitor', visitorId); } catch {}
}
function complimentState(id) {
  return groupMode ? (groupCompliments[String(id)] || {count:0, active:false}) : {count:compliments.includes(String(id)) ? 1 : 0, active:compliments.includes(String(id))};
}
function complimentMarkup(id) {
  const state = complimentState(id);
  return `<div class="compliment-row"><button class="compliment-btn" data-compliment="${escapeHTML(id)}" aria-pressed="${state.active}" aria-label="${state.active ? 'Undo compliment' : 'Compliment the chef'}" ${complimentBusy.has(String(id)) ? 'disabled' : ''}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button><span class="compliment-count" aria-live="polite">${state.count} ${state.count === 1 ? 'compliment' : 'compliments'}</span></div>`;
}
async function toggleCompliment(id) {
  id = String(id);
  if (complimentBusy.has(id)) return;
  const active = !complimentState(id).active;
  complimentBusy.add(id);
  updateCompliments();
  try {
    if (groupMode) {
      groupCompliments[id] = await groupRequest('/api/compliments', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id, active})});
    } else {
      compliments = active ? [...compliments, id] : compliments.filter(x => x !== id);
      write('platePalCompliments', compliments);
    }
  } catch { notify('Couldn’t save your compliment. Please try again.'); }
  finally { complimentBusy.delete(id); updateCompliments(); }
}
function updateCompliments() {
  document.querySelectorAll('[data-compliment]').forEach(button => {
    const state = complimentState(button.dataset.compliment);
    button.nextElementSibling.textContent = `${state.count} ${state.count === 1 ? 'compliment' : 'compliments'}`;
    button.setAttribute('aria-pressed', state.active);
    button.setAttribute('aria-label', state.active ? 'Undo compliment' : 'Compliment the chef');
    button.disabled = complimentBusy.has(button.dataset.compliment);
  });
}
function openProfile(user) {
  if (!profileUser) profileReturn = {filter, query:$('searchMeals').value};
  profileUser = username(user);
  $('searchMeals').value = '';
  renderMeals();
  $('profileTitle').focus();
  $('profilePanel').scrollIntoView({behavior:'smooth', block:'start'});
}
$('backToFeed').onclick = () => {
  profileUser = null;
  if (profileReturn) { filter = profileReturn.filter; $('searchMeals').value = profileReturn.query; }
  renderMeals();
  $('searchMeals').focus();
};
let previousFocus = null;
function logEvent(type, detail = '') {
  events.push({type, detail, timestamp: new Date().toISOString()});
  write('platePalEvents', events);
}
logEvent('visit');
function renderMeals() {
  const query = $('searchMeals').value.trim().toLowerCase();
  const visible = meals.filter(m => (profileUser ? username(m.user) === profileUser : (filter === 'all' || (filter === 'saved' ? saved.includes(m.id) : filter === 'group' ? typeof m.id === 'string' : (m.tags || [m.tag]).includes(filter)))) && [m.title, m.description, ...m.ingredients].join(' ').toLowerCase().includes(query));
  $('profilePanel').classList.toggle('hidden', !profileUser);
  if (profileUser) {
    $('profileTitle').textContent = '@' + profileUser;
    const count = meals.filter(m => username(m.user) === profileUser).length;
    $('profileSummary').textContent = `${count} post${count === 1 ? '' : 's'} by this chef`;
  }
  $('savedCount').textContent = saved.length;
  $('resultCount').textContent = `${visible.length} meal${visible.length === 1 ? '' : 's'}${filter === 'saved' ? ' in your collection' : ' to inspire you'}`;
  $('feed').innerHTML = visible.length ? visible.map(m => `
    <article class="meal-card">
      ${m.image ? `<img src="${escapeHTML(m.image)}" alt="${escapeHTML(m.imageAlt || m.title)}" loading="lazy" />` : '<div class="meal-placeholder" aria-hidden="true">A little meal inspiration</div>'}
      <div class="meal-content"><div class="meal-meta"><span><button class="author-link" data-profile="${escapeHTML(username(m.user))}">@${escapeHTML(username(m.user))}</button>${typeof m.id === 'number' ? ' · Sample' : ''}</span><span>${escapeHTML(m.location)}</span></div>
      <span class="pill">${escapeHTML(m.tagLabel)}</span>${m.minutes ? `<span class="meal-time">About ${m.minutes} min</span>` : ''}${complimentMarkup(m.id)}<h3>${escapeHTML(m.title)}</h3><p>${escapeHTML(m.description)}</p>${macroMarkup(m)}
      <div class="card-actions"><button class="primary-btn" data-open="${escapeHTML(m.id)}">${m.instructions.length ? 'View recipe' : 'View post'}</button><button class="secondary-btn" data-save="${escapeHTML(m.id)}" aria-pressed="${saved.includes(m.id)}">${saved.includes(m.id) ? 'Saved ✓' : 'Save meal'}</button><button class="secondary-btn" data-scan="${escapeHTML(m.id)}" ${m.ingredients.length ? '' : 'disabled'}>Scan → grocery list</button></div></div>
    </article>`).join('') : `<div class="empty-state"><h3>${filter === 'saved' && !query ? 'Keep your favorites close.' : 'No meals found.'}</h3><p>${filter === 'saved' && !query ? 'Save a meal from Discover and find it here whenever you’re hungry.' : 'Try another ingredient or community.'}</p></div>`;
  document.querySelectorAll('[data-profile]').forEach(b => b.onclick = () => openProfile(b.dataset.profile));
  document.querySelectorAll('[data-compliment]').forEach(b => b.onclick = () => toggleCompliment(b.dataset.compliment));
  document.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openRecipe(b.dataset.open));
  document.querySelectorAll('[data-scan]').forEach(b => b.onclick = () => addMealIngredients(meals.find(m => String(m.id) === b.dataset.scan)));
  document.querySelectorAll('[data-save]').forEach(b => b.onclick = () => toggleSave(b.dataset.save));
}
function toggleSave(id) {
  const meal = meals.find(m => String(m.id) === String(id));
  const removing = saved.includes(meal.id);
  saved = removing ? saved.filter(x => x !== meal.id) : [...saved, meal.id];
  write('platePalSaved', saved);
  logEvent(removing ? 'unsave_meal' : 'save_meal', meal.title);
  const focusedSave = document.activeElement?.dataset.save;
  renderMeals();
  if (focusedSave) {
    const replacement = [...document.querySelectorAll('[data-save]')].find(b => b.dataset.save === focusedSave);
    (replacement || document.querySelector('[data-filter="saved"]')).focus();
  }
  if (currentMeal) updateSaveButton();
}
function updateSaveButton() {
  const active = saved.includes(currentMeal.id);
  $('saveRecipeBtn').textContent = active ? 'Saved ✓' : 'Save meal';
  $('saveRecipeBtn').setAttribute('aria-pressed', active);
}
function showModal(id) {
  previousFocus = document.activeElement;
  $(id).classList.remove('hidden');
  $(id).setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $(id).querySelector('button, input').focus();
}
function closeModal(element) {
  element.classList.add('hidden');
  element.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (previousFocus?.isConnected) previousFocus.focus();
}
function openRecipe(id) {
  currentMeal = meals.find(m => String(m.id) === String(id));
  logEvent('open_recipe', currentMeal.title);
  $('modalImage').hidden = !currentMeal.image;
  if (currentMeal.image) $('modalImage').src = currentMeal.image;
  $('modalImage').alt = currentMeal.imageAlt || currentMeal.title;
  $('modalTag').textContent = currentMeal.tagLabel;
  $('modalAuthor').textContent = '@' + username(currentMeal.user);
  $('modalAuthor').onclick = () => { closeModal($('recipeModal')); openProfile(currentMeal.user); };
  $('modalTitle').textContent = currentMeal.title;
  $('modalDescription').textContent = currentMeal.description;
  $('modalMacros').innerHTML = macroMarkup(currentMeal);
  $('modalSource').innerHTML = currentMeal.sourceUrl ? `Plate Pal adaptation · <a href="${escapeHTML(currentMeal.sourceUrl)}" target="_blank" rel="noopener noreferrer">Inspired by ${escapeHTML(currentMeal.source)}</a>. Times are estimates; follow the source for exact quantities and nutrition.` : '';
  $('modalIngredients').innerHTML = currentMeal.ingredients.length ? currentMeal.ingredients.map(x => `<li>${escapeHTML(x)}</li>`).join('') : '<li>Ingredients haven’t been added.</li>';
  $('groceryBtn').disabled = !currentMeal.ingredients.length;
  $('modalInstructions').innerHTML = currentMeal.instructions.length ? currentMeal.instructions.map(x => `<li>${escapeHTML(x)}</li>`).join('') : '<li>The cook hasn’t added recipe steps yet.</li>';
  updateSaveButton();
  showModal('recipeModal');
}
$('saveRecipeBtn').onclick = () => toggleSave(currentMeal.id);
$('closeRecipe').onclick = () => closeModal($('recipeModal'));
$('closeShare').onclick = () => closeModal($('shareModal'));
$('submitMealBtn').onclick = () => showModal('shareModal');
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal(modal);
    if (e.key !== 'Tab') return;
    const items = [...modal.querySelectorAll('button, input, textarea, select, [tabindex="0"]')].filter(x => !x.disabled && x.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
});
document.querySelectorAll('.filter').forEach(b => b.onclick = () => {
  profileUser = null;
  filter = b.dataset.filter;
  document.querySelectorAll('.filter').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
  renderMeals();
});
$('searchMeals').oninput = renderMeals;
function renderCommunities() {
  document.querySelectorAll('.join-btn').forEach(b => {
    const active = joined.includes(b.dataset.community);
    b.textContent = active ? 'Joined ✓' : 'Join community';
    b.setAttribute('aria-pressed', active);
  });
}
document.querySelectorAll('.join-btn').forEach(b => b.onclick = () => {
  const community = b.dataset.community;
  const leaving = joined.includes(community);
  joined = leaving ? joined.filter(x => x !== community) : [...joined, community];
  write('platePalJoined', joined);
  logEvent(leaving ? 'leave_community' : 'join_community', community);
  renderCommunities();
});
const macroKeys = ['calories', 'protein', 'carbs', 'fat'];
function macroMarkup(meal) {
  if (!meal.macros || !macroKeys.some(key => meal.macros[key] !== null && meal.macros[key] !== undefined)) return '';
  const labels = {calories:'kcal', protein:'g protein', carbs:'g carbs', fat:'g fat'};
  return `<div class="nutrition"><p class="nutrition-caption">Per serving${meal.serving ? ` · ${escapeHTML(meal.serving)}` : ''}</p><div class="macro-summary">${macroKeys.map(key => meal.macros[key] === null || meal.macros[key] === undefined ? '' : `<span><strong>${escapeHTML(meal.macros[key])}</strong> ${labels[key]}</span>`).join('')}</div><small>Self-reported</small></div>`;
}
let photoData = '';
let photoVersion = 0;
let photoBusy = false;
function clearPhoto() {
  photoVersion++;
  photoData = '';
  photoBusy = false;
  $('mealPhoto').value = '';
  $('photoPreview').removeAttribute('src');
  $('photoPreview').classList.add('hidden');
  $('removePhoto').classList.add('hidden');
  $('photoStatus').textContent = '';
  $('postMealBtn').disabled = false;
}
async function preparePhoto(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG, or WebP photo. Export HEIC photos as JPG first.');
  if (file.size > 15 * 1024 * 1024) throw new Error('This photo is too large. Choose one under 15 MB.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(1, 960 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const result = canvas.toDataURL('image/jpeg', .72);
    if (result.length > 900000) throw new Error('This photo is too detailed to store. Try a smaller photo.');
    return result;
  } finally { URL.revokeObjectURL(url); }
}
$('removePhoto').onclick = clearPhoto;
$('mealPhoto').onchange = async () => {
  const file = $('mealPhoto').files[0];
  clearPhoto();
  if (!file) return;
  const version = photoVersion;
  photoBusy = true;
  $('postMealBtn').disabled = true;
  $('photoStatus').textContent = 'Preparing your photo…';
  try {
    const data = await preparePhoto(file);
    if (version !== photoVersion) return;
    photoData = data;
    $('photoPreview').src = data;
    $('photoPreview').classList.remove('hidden');
    $('removePhoto').classList.remove('hidden');
    $('photoStatus').textContent = 'Photo ready to post.';
  } catch (error) {
    if (version !== photoVersion) return;
    $('photoStatus').textContent = error.message.startsWith('Choose') || error.message.startsWith('This photo') ? error.message : 'Couldn’t read this photo. Try another JPG, PNG, or WebP.';
  } finally {
    if (version === photoVersion) { photoBusy = false; $('postMealBtn').disabled = false; }
  }
};
let posting = false;
let draftPostId = `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
$('shareMealForm').onsubmit = async e => {
  e.preventDefault();
  if (photoBusy || posting || !$('shareMealForm').reportValidity()) return;
  $('postError').classList.add('hidden');
  const title = $('mealName').value.trim(), description = $('mealDescription').value.trim(), user = username($('mealAuthor').value);
  const ingredients = $('mealIngredients').value.split(',').map(x => x.trim()).filter(Boolean);
  const instructions = $('mealSteps').value.split('\n').map(x => x.trim()).filter(Boolean);
  if (!title || !description || !user) { $('postError').textContent = 'Add your name, a meal name, and a short description.'; $('postError').classList.remove('hidden'); return; }
  const macros = Object.fromEntries(macroKeys.map(key => {
    const input = $('meal' + key[0].toUpperCase() + key.slice(1));
    return [key, input.value === '' ? null : Number(input.value)];
  }));
  const tag = $('mealCommunity').value;
  const meal = {id: draftPostId, title, description, ingredients, instructions, tag, tagLabel: {college:'College Meal', protein:'High Protein', quick:'Quick Dinner'}[tag], user, location:'Our group', image:photoData, macros, serving:$('mealServing').value.trim()};
  posting = true;
  $('postMealBtn').disabled = true;
  $('postMealBtn').textContent = 'Posting…';
  try {
    if (groupMode) {
      const result = await groupRequest('/api/meals', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(meal)});
      if (!meals.some(m => m.id === result.meal.id)) meals.unshift(result.meal);
      updateGroupStatus();
    } else {
      const next = [meal, ...shared];
      try { localStorage.setItem('platePalMeals', JSON.stringify(next)); }
      catch { throw new Error('Your browser could not save this post. Your draft is still here. Try a smaller photo, or use group testing mode.'); }
      shared = next; meals.unshift(meal);
    }
    logEvent('share_meal', title);
    draftPostId = `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    e.target.reset(); $('mealAuthor').value = user; clearPhoto();
    closeModal($('shareModal'));
    $('searchMeals').value = '';
    document.querySelector('[data-filter="group"]').click();
    $('feed').scrollIntoView({behavior:'smooth', block:'start'});
    notify(groupMode ? 'Your meal has been shared with the group.' : 'Your meal and photo are saved in this browser.');
  } catch (error) {
    $('postError').textContent = error.message;
    $('postError').classList.remove('hidden');
  } finally {
    posting = false; $('postMealBtn').disabled = false; $('postMealBtn').textContent = 'Post meal';
  }
};
function renderGroceries() {
  $('groceryList').innerHTML = groceries.length ? groceries.map((x,i) => `<li><label class="grocery-item ${x.checked ? 'checked' : ''}"><input type="checkbox" data-grocery="${i}" ${x.checked ? 'checked' : ''}>${escapeHTML(x.name)}</label></li>`).join('') : '<li class="results">Your list is empty. Open a recipe to add its ingredients.</li>';
  $('clearGroceries').disabled = !groceries.some(x => x.checked);
  if (!$('shopModal').classList.contains('hidden')) renderBasket();
  document.querySelectorAll('[data-grocery]').forEach(b => b.onchange = () => {
    groceries[Number(b.dataset.grocery)].checked = b.checked;
    write('platePalGroceries', groceries);
    b.closest('label').classList.toggle('checked', b.checked);
    $('clearGroceries').disabled = !groceries.some(x => x.checked);
  });
}
function addMealIngredients(meal) {
  const before = groceries.length;
  meal.ingredients.forEach(name => { if (!groceries.some(x => x.name.toLowerCase() === name.toLowerCase())) groceries.push({name, checked:false}); });
  const persisted = write('platePalGroceries', groceries);
  logEvent('add_groceries', meal.title);
  renderGroceries();
  if (persisted) notify(groceries.length > before ? `${groceries.length - before} ingredients added to your grocery list below the feed.` : 'These ingredients are already on your list.');
}
$('groceryBtn').onclick = () => addMealIngredients(currentMeal);
$('clearGroceries').onclick = () => { groceries = groceries.filter(x => !x.checked); write('platePalGroceries', groceries); renderGroceries(); };
let groupToken = new URLSearchParams(location.hash.slice(1)).get('group') || '';
let groupMode = Boolean(groupToken) && ['http:', 'https:'].includes(location.protocol);
async function groupRequest(path, options = {}) {
  const response = await fetch(path, {...options, headers:{...options.headers, 'X-Group-Key':groupToken, 'X-Visitor-Id':visitorId}, signal:AbortSignal.timeout(15000)});
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Couldn’t reach the group feed. Your draft is still here; please try again.');
  }
  return response.json();
}
async function refreshGroup() {
  const [data, reactions] = await Promise.all([groupRequest('/api/meals'), groupRequest('/api/compliments')]);
  groupCompliments = reactions.compliments;
  // Group mode shows server posts plus sample meals, never other browsers’ local drafts.
  const samples = meals.filter(m => typeof m.id === 'number');
  meals.splice(0, meals.length, ...data.meals, ...samples);
  updateGroupStatus();
  renderMeals();
}
function updateGroupStatus() {
  const count = meals.filter(m => typeof m.id === 'string').length;
  $('groupStatus').textContent = `Group mode · ${count} shared post${count === 1 ? '' : 's'}. Everyone with your group link can see and add meals.`;
}
async function initializeGroup() {
  if (location.hostname.endsWith('.github.io')) {
    groupMode = false;
    $('groupHeading').textContent = 'Try Plate Pal';
    $('groupStatus').textContent = 'Public demo · Your posts and photos stay in this browser. This page does not sync posts between people.';
    $('shareModeNote').textContent = 'Your photo, post, and nutrition info will be saved in this browser. They won’t be visible to other visitors.';
    document.querySelector('[data-filter="group"]').textContent = 'My posts';
    return;
  }
  if (!['http:', 'https:'].includes(location.protocol)) return;
  $('postMealBtn').disabled = true;
  if (groupMode) $('shareModeNote').textContent = 'Connecting to your group. Posts will be shared with everyone who has this link.';
  try {
    const response = await fetch('/api/status', {signal:AbortSignal.timeout(3000)});
    const status = response.ok ? await response.json() : {};
    if (!status.groupServer) {
      if (groupMode) throw new Error('The group server is unavailable.');
      return;
    }
    groupMode = true;
    document.querySelector('.group-panel').classList.remove('hidden');
    $('shareModeNote').textContent = 'Your post and photo will be visible to everyone with this group link.';
    $('refreshGroup').classList.remove('hidden');
    $('copyGroupLink').classList.remove('hidden');
    $('groupHelp').classList.add('hidden');
    $('groupLink').value = `${status.groupOrigin || location.origin}/#group=${encodeURIComponent(groupToken)}`;
    $('groupLinkLabel').classList.remove('hidden');
    await refreshGroup();
  } catch (error) {
    if (groupMode) $('groupStatus').textContent = 'Open the full group link from your host to connect. ' + error.message;
  } finally { $('postMealBtn').disabled = photoBusy || posting; }
}
$('refreshGroup').onclick = async () => {
  $('refreshGroup').disabled = true;
  try { await refreshGroup(); } catch { $('groupStatus').textContent = 'Couldn’t refresh. Check that the host’s server is running, then try again.'; }
  finally { $('refreshGroup').disabled = false; }
};
$('copyGroupLink').onclick = async () => {
  try { await navigator.clipboard.writeText($('groupLink').value); notify('Group link copied. Send it to your testers.'); }
  catch { $('groupLink').focus(); $('groupLink').select(); notify('Copy the selected group link and send it to your testers.'); }
};
renderMeals(); renderCommunities(); renderGroceries();
initializeGroup();
document.querySelectorAll('.filter').forEach(b => b.setAttribute('aria-pressed', b.dataset.filter === filter));

const interestEndpoint = window.PLATE_PAL_CONFIG?.interestEndpoint || '';
$('interestNote').textContent = interestEndpoint ? 'Your name, email and selected interest are sent privately to Plate Pal through our form provider.' : 'In the local group demo, interest is saved privately on the host computer. Public signup is not connected yet.';
let interestBusy = false;
$('interestForm').onsubmit = async e => {
  e.preventDefault();
  if (interestBusy || !$('interestForm').reportValidity()) return;
  if (!interestEndpoint && !groupMode) {
    $('interestStatus').textContent = 'Online signup is not available yet. Your details have not been sent. Please try again once signup opens.';
    return;
  }
  const payload = {name:$('interestName').value.trim(), email:$('interestEmail').value.trim(), plan:$('interestPlan').value, consent:true, source:location.origin + location.pathname, campaign:(new URLSearchParams(location.search).get('ref') || 'direct').slice(0,100)};
  if (!payload.name) { $('interestStatus').textContent = 'Please enter your name.'; return; }
  interestBusy = true; $('interestSubmit').disabled = true;
  $('interestStatus').textContent = 'Saving your interest…';
  try {
    if (interestEndpoint) {
      const endpoint = new URL(interestEndpoint);
      if (endpoint.protocol !== 'https:') throw new Error('Invalid endpoint');
      const response = await fetch(endpoint.href, {method:'POST', headers:{'Content-Type':'application/json', Accept:'application/json'}, body:JSON.stringify(payload), signal:AbortSignal.timeout(15000)});
      if (!response.ok) throw new Error('Submission failed');
    } else {
      await groupRequest('/api/interest', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
    }
    $('interestStatus').textContent = 'You’re on the interest list! No payment or subscription has started.';
    logEvent('interest_submitted', payload.plan);
    $('interestForm').reset();
  } catch {
    $('interestStatus').textContent = 'We couldn’t confirm your signup. Your details are still here; please try again.';
  } finally { interestBusy = false; $('interestSubmit').disabled = false; }
};

// The premium shopping flow is intentionally a local, interactive mock.
let selectedStore = 'ALDI';
const demoStores = ['ALDI', 'Kroger', 'Target', 'Whole Foods'];
function renderBasket() {
  const remaining = groceries.map((item, index) => ({...item, index})).filter(item => !item.checked);
  $('storeChoices').innerHTML = demoStores.map(store => `<button class="store-choice ${store === selectedStore ? 'selected' : ''}" aria-pressed="${store === selectedStore}" data-store="${store}">${store}<small>${store === selectedStore ? 'Selected ✓' : 'Choose store'}</small></button>`).join('');
  document.querySelectorAll('[data-store]').forEach(button => button.onclick = () => {
    selectedStore = button.dataset.store; renderBasket();
    [...document.querySelectorAll('[data-store]')].find(b => b.dataset.store === selectedStore).focus();
    logEvent('demo_store_selected', selectedStore);
  });
  $('basketSummary').textContent = `${remaining.length} ingredient${remaining.length === 1 ? '' : 's'} to shop at ${selectedStore}`;
  $('basketItems').innerHTML = remaining.length ? remaining.map(item => `<li><span>${escapeHTML(item.name)}</span><button class="text-btn" data-basket-remove="${item.index}" aria-label="Remove ${escapeHTML(item.name)} from grocery list">Remove</button></li>`).join('') : '<li>Your list is ready for inspiration. Add ingredients from a meal first.</li>';
  document.querySelectorAll('[data-basket-remove]').forEach(button => button.onclick = () => {
    const position = [...document.querySelectorAll('[data-basket-remove]')].indexOf(button);
    groceries.splice(Number(button.dataset.basketRemove), 1); write('platePalGroceries', groceries); renderGroceries();
    const next = document.querySelectorAll('[data-basket-remove]');
    (next[Math.min(position, next.length - 1)] || $('closeShop')).focus();
  });
  $('previewBasket').disabled = !remaining.length;
  $('previewBasket').textContent = `Preview ${selectedStore} basket →`;
  $('basketConfirmation').classList.add('hidden');
}
function openShopping() { renderBasket(); showModal('shopModal'); logEvent('open_premium_shopping'); }
$('myGroceriesBtn').onclick = () => { $('groceries').scrollIntoView({behavior:'smooth', block:'start'}); $('groceries').focus({preventScroll:true}); };
$('shopGroceriesBtn').onclick = openShopping;
$('closeShop').onclick = () => closeModal($('shopModal'));
$('previewBasket').onclick = () => {
  const count = groceries.filter(item => !item.checked).length;
  if (!count) return;
  $('basketConfirmation').textContent = `Your ${selectedStore} basket preview is ready with ${count} ingredient${count === 1 ? '' : 's'}. In a connected account, you would continue to Instacart to select products, confirm quantities, and choose delivery or pickup. This demo has not placed an order.`;
  $('basketConfirmation').classList.remove('hidden');
  logEvent('demo_basket_preview', selectedStore);
};
$('featuredRecipe').onclick = () => openRecipe(4);
$('featuredSave').onclick = () => {
  if (!saved.includes(4)) toggleSave(4);
  $('featuredStatus').textContent = 'Featured meal saved to your collection.';
  logEvent('sponsored_meal_saved', 'Harvest Table demo');
};
$('featuredShop').onclick = () => { addMealIngredients(meals.find(meal => meal.id === 4)); openShopping(); };
$('featuredVideo').addEventListener('play', () => logEvent('sponsored_video_play', 'Harvest Table demo'));
