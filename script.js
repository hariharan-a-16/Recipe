 // Load recipes from localStorage or set defaults
let recipes = JSON.parse(localStorage.getItem("recipes"));
if (!recipes) {
  recipes = [
    {
      name: "Dal Pakoda",
      image:
        "https://img.freepik.com/free-photo/crispy-fried-onion-bhajis-pakora-served-bowl_123827-20450.jpg",
      ingredients: ["¼ cup moong dal", "1 cup besan", "Spices", "Salt", "Oil for frying"],
      method:
        "Soak dal, grind, mix with besan and spices, drop spoonfuls into hot oil, and fry until golden.",
      reviews: []
    },
    {
      name: "Onion Bhaji",
      image:
        "https://img.freepik.com/free-photo/indian-onion-pakora-fritters_23-2148731377.jpg",
      ingredients: ["2 onions", "1 cup besan", "Spices", "Salt", "Oil"],
      method: "Slice onions, mix with besan and spices, shape and fry till crisp.",
      reviews: []
    }
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
          <div class="mb-2">Rating: ${starsHtml} (${recipe.reviews.length} review${recipe.reviews.length!==1?'s':''})</div>
          <button class="btn btn-outline-info mb-2 view-details" data-idx="${idx}">View Details</button>
          <button class="btn btn-outline-secondary mt-auto review-btn" data-idx="${idx}">Reviews & Rate</button>
        </div>
      </div>
    `;
    row.appendChild(card);
  });
}

function showModal(recipe) {
  const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
  document.querySelector("#recipeModal .modal-title").textContent = recipe.name;
  document.querySelector("#recipeModal .modal-body").innerHTML = `
    <img src="${recipe.image}" class="img-fluid rounded mb-2" alt="${recipe.name}">
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
              `<div class="mb-2"><strong>${renderStars(rev.rating)}</strong><br>${rev.text}</div>`
          )
          .join("");
  document.querySelector("#reviewModal .modal-title").textContent = `Reviews for ${recipe.name}`;
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
  recipes[idx].reviews.push({ rating, text });
  saveRecipes();
  loadRecipes();
  const modal = bootstrap.Modal.getInstance(document.getElementById("reviewModal"));
  modal.hide();
}

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