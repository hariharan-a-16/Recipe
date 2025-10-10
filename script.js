// Load recipes from localStorage or set defaults
let recipes = JSON.parse(localStorage.getItem("recipes"));
if (!recipes) {
  recipes = [
    {
      name: "Adai",
      image:
        "images/adai -tamilnadu.jpeg",
      prepTime: "2 hrs soaking + 20 mins cooking",
      ingredients: ["Raw rice 1 cup", "Toor dal ½ cup", "Chana dal  ¼ cup", "Urad dal  ¼ cup", "Dried red chilies 4 to 5", , "Curry leaves (few)", "Hing (asafoetida)  1 pinch", "Salt  to taste", "Oil – for cooking"],
      method:
        "Soak rice and dals with red chilies 2 hrs. Grind coarsely with little water. Add salt, hing, curry leaves. Heat tawa, pour batter like thick dosa, drizzle oil, cook both sides till golden.",
      reviews: [],
    },
    {
      name: "Gongura Pachidi",
      prepTime: "15 mins cooking",
      image:
        "images/gongura pachidi -AP.jpeg",
      ingredients: ["6 cups Gongura leaves (sorrel leaves)", "¼ cup oil (sesame or sunflower oil)", "½ teaspoon salt", "2 tablespoons oil (for tempering)", "1 teaspoon mustard seeds", "½ teaspoon fenugreek seeds", "½ teaspoon asafoetida (hing)", "7 to 8 dried Kashmiri red chilies", "2 sprigs curry leaves", "¼ teaspoon turmeric powder", "4 cloves garlic", "Salt to taste"],
      method: "Wash and dry the Gongura leaves, then sauté in hot oil on low-medium heat until wilted and cooked, about 10-12 minutes. Cool and grind roughly with salt and garlic. Heat oil separately and temper with mustard seeds, fenugreek seeds, asafoetida, dried red chilies, curry leaves, and turmeric powder, then mix well with the ground Gongura. Serve with hot rice and ghee..",
      reviews: [],
    },
    {
      name: "Grilled Corn",
      prepTime: "10 mins cooking",
      image:
        "images/Grilled Corn -HP.jpeg",
      ingredients: ["Fresh corn ears", "Butter", "Salt", "Black pepper", "Garlic", "Ground cumin", "White sugar", "Lime juice", "Hot pepper sauce", "Cooking spray"],
      method: "Preheat grill to medium-high heat. Prepare garlic butter by heating butter with minced garlic. Mix sugar, salt, black pepper, ground cumin in butter along with lime juice and hot pepper sauce. Brush corn with garlic butter mixture. Place corn on grill, turning every 3-5 minutes, grill for 10-15 minutes until tender and lightly charred. Serve with extra butter and seasoning as desired.",
      reviews: [],
    },
    {
      name: "Chilli Bonda",
      prepTime: "12 mins cooking",
      image:
        "images/chilli bonda.jpeg",
      ingredients: ["Green chilies (large)", "Gram flour (besan)", "Rice flour", "Red chili powder", "Turmeric powder", "Asafoetida (hing)", "Carom seeds (ajwain)", "Baking soda", "Salt", "Water", "Oil for deep frying", "Cumin powder", "Lemon juice", "Chopped onions", "Chopped coriander leaves", "Chaat masala powder"],
      method: "Slit and deseed green chilies. Mix gram flour, rice flour, red chili powder, turmeric,  carom seeds, baking soda, salt, and water to form thick batter. Stuff chilies with a mixture of cumin powder, lemon juice, and salt. Dip stuffed chilies in batter and deep fry until golden and crisp. Optionally, stuff fried bajjis with a spiced onion and coriander mixture. Serve hot with chutney or sauce.",
      reviews: [],
    },
    {
      name: "Chikken 65",
      prepTime: "Marination 2hr + 7 mins cooking",
      image:
        "images/chilli chikken.jpg",
      ingredients: ["boneless chicken", "ginger garlic paste", "salt", "Kashmiri red chili powder", "turmeric", "garam masala", "curry leaves", "curd (plain yogurt)", "lemon juice", "cornstarch", "rice flour", "egg white", "oil for deep frying", "green chilies", "garlic", "sugar", "black pepper"],
      method: "Marinate chicken with ginger garlic paste, salt, chili powder, turmeric, garam masala, curry leaves, curd, lemon juice, cornstarch, rice flour, and egg white for at least 1 hour. Heat oil, deep fry marinated chicken pieces until golden and crispy. Fry curry leaves, green chilies, and garlic separately, then toss with fried chicken. Serve hot with lemon wedges and raw onion slices.",
      reviews: [],
    },
    {
      name: "Pazham Pori",
      prepTime: "25 mins cooking",
      image:
        "images/PAZHAM PORI _ ETHAKKA APPAM _ Kurryleaves.jpeg",
      ingredients: ["Ripe bananas (sliced)", "All-purpose flour (maida)", "Rice flour", "Sugar", "Baking soda or baking powder", "Water (to make batter)", "Oil (for deep frying)"],
      method: "Mix all-purpose flour, rice flour, sugar, and baking soda with water to make a smooth batter. Dip banana slices into the batter and deep fry them in hot oil until golden and crisp. Drain on paper towels and serve warm..",
      reviews: [],
    },
    {
      name: "Oatmeal vada",
      prepTime: "Soak 15min + 10 mins cooking",
      image:
        "images/Account Suspended.jpeg",
      ingredients: ["Rolled oats", "Onions (finely chopped)", "Green chilies (finely chopped)", "Ginger (grated)", "Curry leaves (chopped)", "Coriander leaves (chopped)", "Cumin seeds", "Salt", "Water (for batter consistency)", "Oil (for deep frying)","Rolled oats", "Onions (finely chopped)", "Green chilies (finely chopped)", "Ginger (grated)", "Curry leaves (chopped)", "Coriander leaves (chopped)", "Cumin seeds", "Salt", "Water (for batter consistency)", "Oil (for deep frying)"],
      method: "Soak oats for about 15 minutes. Grind soaked oats with little water to a coarse batter. Mix in onions, green chilies, ginger, curry leaves, coriander leaves, cumin seeds, and salt. Heat oil in a pan. Drop spoon full of batter into the hot oil and deep fry till golden and crisp. Drain on paper towels and serve hot.",
      reviews: [],
    },
  ];
}

function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function loadRecipes() {
  const row = document.querySelector("#recipes .row");
  row.innerHTML = "";
  recipes.forEach((recipe, idx) => {
    const avgRating = getAverageRating(recipe.reviews);
    const starsHtml = renderStars(avgRating);
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${recipe.name}</h5>
            ${recipe.prepTime ? `<p class="text-muted mb-1"><small>Prep: ${recipe.prepTime}</small></p>` : ""}
            <div class="mb-2">Rating: ${starsHtml} (${recipe.reviews.length} review${recipe.reviews.length !== 1 ? 's' : ''})</div>
            <button class="btn btn-outline-info mb-2 view-details" data-idx="${idx}">View Details</button>
            <button class="btn btn-outline-secondary mt-auto review-btn" data-idx="${idx}">Reviews & Rate</button>
          </div>
        </div>
    `;

    row.appendChild(card);
  });
}
const addRecipeSection = document.getElementById("addRecipeSection");
const showAddRecipeBtn = document.getElementById("showAddRecipeBtn");

showAddRecipeBtn.addEventListener("click", () => {
  if (addRecipeSection.style.display === "none" || addRecipeSection.style.display === "") {
    addRecipeSection.style.display = "block";
    showAddRecipeBtn.textContent = "Hide Add Recipe";
  } else {
    addRecipeSection.style.display = "none";
    showAddRecipeBtn.textContent = "Add Recipe";
  }
});

function showModal(recipe) {
  const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
  document.querySelector("#recipeModal .modal-title").textContent = recipe.name;
  document.querySelector("#recipeModal .modal-body").innerHTML = `
  
    <h6>Ingredients:</h6>
    <ul>${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
    <h6>Method:</h6>
    <p>${recipe.method}</p>
    `;
  modal.show();
}

function getAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

function renderStars(rating) {
  // rating is 0 to 5
  let fullStars = Math.floor(rating);
  let halfStar = rating - fullStars >= 0.5;
  let starsHtml = "";
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<span class="text-warning">&#9733;</span>'; // full star
    } else if (i === fullStars && halfStar) {
      starsHtml += '<span class="text-warning">&#9734;</span>'; // half star (can customize)
    } else {
      starsHtml += '<span class="text-secondary">&#9734;</span>'; // empty star
    }
  }
  return starsHtml;
}

function showReviewModal(idx) {
  const recipe = recipes[idx];
  const modal = new bootstrap.Modal(document.getElementById("reviewModal"));
  // Build review list HTML
  const reviewsHtml =
    recipe.reviews.length === 0
      ? "<p>No reviews yet.</p>"
      : recipe.reviews
          .map(
            (rev) =>
              `<div class="mb-2" ><strong>${renderStars(rev.rating)}</strong><br>${rev.text}</div>`
          )
          .join("");
  document.querySelector("#reviewModal .modal-title").textContent = `Reviews for ${ recipe.name }`;
  document.querySelector("#reviewModal .reviews-list").innerHTML = reviewsHtml;
  document.querySelector("#reviewModal #reviewText").value = "";
  document.querySelectorAll("#reviewModal .star-input").forEach((star) => {
    star.checked = false;
  });
  document.querySelector("#reviewModal").setAttribute("data-idx", idx);
  modal.show();
}

function addReview() {
  const idx = Number(document.querySelector("#reviewModal").getAttribute("data-idx"));
  const rating = Number(
    document.querySelector('#reviewModal input[name="rating"]:checked')?.value || 0
  );
  const text = document.querySelector("#reviewModal #reviewText").value.trim();

  if (rating === 0) {
    alert("Please select a star rating.");
    return;
  }
  if (!text) {
    alert("Please write a review.");
    return;
  }

  // Save review locally
  recipes[idx].reviews.push({ rating, text });
  saveRecipes();   // update localStorage
  loadRecipes();   // refresh cards

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("reviewModal"));
  modal.hide();
  alert("Review added!");
}

// Attach submit handler
document.getElementById("reviewForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addReview();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-details")) {
    const idx = e.target.getAttribute("data-idx");
    showModal(recipes[idx]);
  }
  if (e.target.classList.contains("review-btn")) {
    const idx = e.target.getAttribute("data-idx");
    showReviewModal(idx);
  }
});

const form = document.getElementById("recipeForm");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("recipeName").value.trim();
    const ing = document.getElementById("recipeIngredients").value.trim();
    const method = document.getElementById("recipeMethod").value.trim();
    const imageInput = document.getElementById("recipeImage");
    const file = imageInput.files[0];
    if (name && ing && method && file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        recipes.push({
          name: name,
          image: e.target.result,
          ingredients: ing.split(",").map((i) => i.trim()),
          method: method,
          reviews: []
        });
        saveRecipes();
        loadRecipes();
        form.reset();
        alert("Recipe added! Thank you.");
      };
      reader.readAsDataURL(file);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRecipes();
});
