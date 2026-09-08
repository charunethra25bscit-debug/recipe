```javascript
const API_URL =
    "https://www.themealdb.com/api/json/v1/1/";


// ==============================
// LOAD POPULAR RECIPES
// ==============================

window.onload = function () {

    loadPopularRecipes();

};


// ==============================
// POPULAR RECIPES
// ==============================

async function loadPopularRecipes() {

    const container =
        document.getElementById("recipeContainer");

    container.innerHTML =
        `<p class="loading">Loading recipes...</p>`;

    try {

        const response = await fetch(
            API_URL + "search.php?s=chicken"
        );

        const data = await response.json();

        displayRecipes(data.meals);

    }

    catch (error) {

        container.innerHTML =
            `<p class="loading">
                ❌ Unable to load recipes.
            </p>`;

    }

}


// ==============================
// SEARCH RECIPES
// ==============================

async function searchRecipes() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .trim();

    if (search === "") {

        alert("Please enter a recipe name.");

        return;
    }

    document.getElementById("sectionTitle")
        .innerText =
        "Search Results";

    const container =
        document.getElementById("recipeContainer");

    container.innerHTML =
        `<p class="loading">
            🔍 Searching...
        </p>`;

    try {

        const response = await fetch(
            API_URL +
            "search.php?s=" +
            encodeURIComponent(search)
        );

        const data = await response.json();

        if (!data.meals) {

            container.innerHTML =
                `<p class="loading">
                    😔 No recipes found.
                </p>`;

            return;
        }

        displayRecipes(data.meals);

    }

    catch (error) {

        container.innerHTML =
            `<p class="loading">
                ❌ Something went wrong.
            </p>`;

    }

}


// ==============================
// CATEGORY SEARCH
// ==============================

async function searchByCategory(category) {

    document.getElementById("sectionTitle")
        .innerText =
        category + " Recipes";

    const container =
        document.getElementById("recipeContainer");

    container.innerHTML =
        `<p class="loading">
            🔍 Loading ${category} recipes...
        </p>`;

    try {

        const response = await fetch(
            API_URL +
            "filter.php?c=" +
            encodeURIComponent(category)
        );

        const data = await response.json();

        if (!data.meals) {

            container.innerHTML =
                `<p class="loading">
                    No recipes found.
                </p>`;

            return;
        }

        displayRecipes(data.meals);

    }

    catch (error) {

        container.innerHTML =
            `<p class="loading">
                ❌ Unable to load recipes.
            </p>`;

    }

}


// ==============================
// DISPLAY RECIPES
// ==============================

function displayRecipes(meals) {

    const container =
        document.getElementById("recipeContainer");

    container.innerHTML = "";

    meals.forEach(meal => {

        const card =
            document.createElement("div");

        card.className =
            "recipe-card";

        card.innerHTML = `

            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
            >

            <div class="card-content">

                <h3>
                    ${meal.strMeal}
                </h3>

                <p>
                    🍽 ${meal.strCategory || "Recipe"}
                </p>

                <div class="card-buttons">

                    <button
                        class="view-btn"
                        onclick="getRecipeDetails('${meal.idMeal}')">

                        View Recipe

                    </button>

                    <button
                        class="favorite-btn"
                        onclick="saveFavorite('${meal.idMeal}')">

                        ❤️

                    </button>

                </div>

            </div>

        `;

        container.appendChild(card);

    });

}


// ==============================
// RECIPE DETAILS
// ==============================

async function getRecipeDetails(id) {

    try {

        const response = await fetch(
            API_URL +
            "lookup.php?i=" +
            id
        );

        const data =
            await response.json();

        const meal =
            data.meals[0];

        showRecipeDetails(meal);

    }

    catch (error) {

        alert(
            "Unable to load recipe details."
        );

    }

}


// ==============================
// SHOW DETAILS
// ==============================

function showRecipeDetails(meal) {

    let ingredients = [];

    for (let i = 1; i <= 20; i++) {

        const ingredient =
            meal["strIngredient" + i];

        const measure =
            meal["strMeasure" + i];

        if (
            ingredient &&
            ingredient.trim() !== ""
        ) {

            ingredients.push(
                `<li>
                    ${measure || ""}
                    ${ingredient}
                </li>`
            );

        }

    }


    const modal =
        document.getElementById("recipeModal");

    const details =
        document.getElementById("recipeDetails");


    details.innerHTML = `

        <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
        >

        <h2>
            ${meal.strMeal}
        </h2>

        <p>
            <strong>Category:</strong>
            ${meal.strCategory || "Not available"}
        </p>

        <p>
            <strong>Area:</strong>
            ${meal.strArea || "Not available"}
        </p>

        <h3>
            🥕 Ingredients
        </h3>

        <ul>
            ${ingredients.join("")}
        </ul>

        <h3>
            👨‍🍳 Instructions
        </h3>

        <p class="instructions">
            ${meal.strInstructions}
        </p>

        ${
            meal.strYoutube
            ?
            `
            <h3>
                🎥 Video Tutorial
            </h3>

            <a
                href="${meal.strYoutube}"
                target="_blank">

                Watch on YouTube

            </a>
            `
            :
            ""
        }

        <br><br>

        <button
            class="view-btn"
            onclick="shareRecipe('${meal.strMeal}')">

            🔗 Share Recipe

        </button>

    `;


    modal.style.display =
        "block";

}


// ==============================
// CLOSE MODAL
// ==============================

function closeModal() {

    document.getElementById(
        "recipeModal"
    ).style.display = "none";

}


// Close when clicking outside

window.onclick = function(event) {

    const modal =
        document.getElementById(
            "recipeModal"
        );

    if (event.target === modal) {

        modal.style.display =
            "none";

    }

};


// ==============================
// FAVORITES
// ==============================

function saveFavorite(id) {

    let favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];


    if (!favorites.includes(id)) {

        favorites.push(id);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        alert(
            "❤️ Recipe saved to Favorites!"
        );

    }

    else {

        alert(
            "Recipe is already in Favorites."
        );

    }

}


// ==============================
// SHOW FAVORITES
// ==============================

async function showFavorites() {

    document.getElementById(
        "sectionTitle"
    ).innerText =
        "❤️ My Favorite Recipes";


    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];


    const container =
        document.getElementById(
            "recipeContainer"
        );


    if (favorites.length === 0) {

        container.innerHTML =
            `
            <p class="loading">
                You haven't saved any recipes yet ❤️
            </p>
            `;

        return;

    }


    container.innerHTML =
        `<p class="loading">
            Loading favorites...
        </p>`;


    let meals = [];


    for (const id of favorites) {

        try {

            const response =
                await fetch(
                    API_URL +
                    "lookup.php?i=" +
                    id
                );

            const data =
                await response.json();

            if (data.meals) {

                meals.push(
                    data.meals[0]
                );

            }

        }

        catch (error) {

            console.log(error);

        }

    }


    displayRecipes(meals);

}


// ==============================
// HOME
// ==============================

function showHome() {

    document.getElementById(
        "sectionTitle"
    ).innerText =
        "Popular Recipes";

    loadPopularRecipes();

}


// ==============================
// SHARE
// ==============================

async function shareRecipe(name) {

    const shareData = {

        title: name,

        text:
            "Check out this delicious recipe: " +
            name,

        url:
            window.location.href

    };


    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );

        }

        catch (error) {

            console.log(error);

        }

    }

    else {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert(
                "🔗 Recipe link copied!"
            );

        }

        catch (error) {

            alert(
                "Copy the website URL to share this recipe."
            );

        }

    }

}
```
