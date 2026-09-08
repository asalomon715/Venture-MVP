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

const feed = document.getElementById("feed");
const modal = document.getElementById("recipeModal");
const shareModal = document.getElementById("shareModal");
let currentMeal = null;

function getEvents() {
  return JSON.parse(localStorage.getItem("platePalEvents") || "[]");
}

function logEvent(type, detail = "") {
  const events = getEvents();
  events.push({
    type,
    detail,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem("platePalEvents", JSON.stringify(events));
}

function renderMeals(filter = "all") {
  const visibleMeals = filter === "all"
    ? meals
    : meals.filter(meal => meal.tag === filter);

  feed.innerHTML = visibleMeals.map(meal => `
    <article class="meal-card">
      <img src="${meal.image}" alt="${meal.title}" />
      <div class="meal-content">
        <div class="meal-meta">
          <span>@${meal.user}</span>
          <span>${meal.location}</span>
        </div>
        <span class="pill">${meal.tagLabel}</span>
        <h3>${meal.title}</h3>
        <p>${meal.description}</p>
        <div class="card-actions">
          <button class="primary-btn view-btn" data-id="${meal.id}">View Recipe</button>
          <button class="secondary-btn quick-save-btn" data-id="${meal.id}">Save</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => openRecipe(Number(btn.dataset.id)));
  });

  document.querySelectorAll(".quick-save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const meal = meals.find(m => m.id === Number(btn.dataset.id));
      logEvent("save_meal", meal.title);
      btn.textContent = "Saved ✓";
      btn.disabled = true;
    });
  });
}

function openRecipe(id) {
  currentMeal = meals.find(meal => meal.id === id);
  logEvent("open_recipe", currentMeal.title);

  document.getElementById("modalImage").src = currentMeal.image;
  document.getElementById("modalImage").alt = currentMeal.title;
  document.getElementById("modalTag").textContent = currentMeal.tagLabel;
  document.getElementById("modalTitle").textContent = currentMeal.title;
  document.getElementById("modalDescription").textContent = currentMeal.description;
  document.getElementById("modalIngredients").innerHTML =
    currentMeal.ingredients.map(item => `<li>${item}</li>`).join("");
  document.getElementById("modalInstructions").innerHTML =
    currentMeal.instructions.map(item => `<li>${item}</li>`).join("");

  document.getElementById("saveRecipeBtn").textContent = "Save Meal";
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

document.getElementById("closeRecipe").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("saveRecipeBtn").addEventListener("click", () => {
  if (!currentMeal) return;
  logEvent("save_meal", currentMeal.title);
  document.getElementById("saveRecipeBtn").textContent = "Saved ✓";
});

document.getElementById("groceryBtn").addEventListener("click", () => {
  if (!currentMeal) return;
  logEvent("grocery_interest", currentMeal.title);
  alert("Premium concept test: You showed interest in grocery integration.");
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMeals(btn.dataset.filter);
  });
});

document.querySelectorAll(".join-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    logEvent("join_community", btn.dataset.community);
    btn.textContent = "Joined ✓";
    btn.disabled = true;
  });
});

document.getElementById("submitMealBtn").addEventListener("click", () => {
  shareModal.classList.remove("hidden");
  shareModal.setAttribute("aria-hidden", "false");
});

document.getElementById("closeShare").addEventListener("click", () => {
  shareModal.classList.add("hidden");
});

document.getElementById("shareMealForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const mealName = document.getElementById("mealName").value.trim();
  logEvent("share_meal", mealName);
  document.getElementById("shareThanks").classList.remove("hidden");
  event.target.reset();
});

document.getElementById("feedbackForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const useCase = document.getElementById("useCase").value;
  const weeklyUse = document.getElementById("weeklyUse").value;

  logEvent("feedback", `${useCase} | ${weeklyUse}`);
  document.getElementById("feedbackThanks").classList.remove("hidden");
  event.target.reset();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const data = {
    exportedAt: new Date().toISOString(),
    events: getEvents()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "plate-pal-test-data.json";
  a.click();
  URL.revokeObjectURL(url);
});

renderMeals();
