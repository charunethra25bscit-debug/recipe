```javascript
/* =========================================================
   RECIPE FINDER
   Main JavaScript file
   ========================================================= */


/* ================= API CONFIGURATION ================= */

const API_BASE =
    "https://www.themealdb.com/api/json/v1/1";


/* ================= DOM ELEMENTS ================= */

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const clearBtn =
    document.getElementById("clearBtn");

const recipeContainer =
    document.getElementById("recipeContainer");

const categoryList =
    document.getElementById("categoryList");

const resultsTitle =
    document.getElementById("resultsTitle");

const resultsCount =
    document.getElementById("resultsCount");

const loading =
    document.getElementById("loading");

const emptyMessage =
    document.getElementById("emptyMessage");

const errorMessage =
    document.getElementById("errorMessage");

const errorText =
    document.getElementById("errorText");

const recipeModal =
    document.getElementById("recipeModal");

const recipeDetails =
    document.getElementById("recipeDetails");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.getElementById("modalOverlay");

const homeBtn =
    document.getElementById("homeBtn");

const favoritesBtn =
    document.getElementById("favoritesBtn");

const randomBtn =
    document.getElementById("randomBtn");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const toastIcon =
    document.getElementById("toastIcon");


/* ================= APPLICATION STATE ================= */

let currentMeals = [];

let currentCategory = "All";

let favoriteIds =
    JSON.parse(
        localStorage.getItem("recipeFavorites")
    ) || [];


/* ================= INITIALIZATION ================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


async function initializeApp() {

    setupEventListeners();

    await loadCategories();

    await loadPopularRecipes();

}


/* ================= EVENT LISTENERS ================= */

function setupEventListeners() {

    /* Search */

    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            searchRecipes();

        }
    );


    /* Search input */

    searchInput.addEventListener(
        "input",
        function () {

            clearBtn.style.display =
                searchInput.value
                    ? "block"
                    : "none";

        }
    );


    /* Clear search */

    clearBtn.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            clearBtn.style.display =
                "none";

            searchInput.focus();

        }
    );


    /* Home */

    homeBtn.addEventListener(
        "click",
        showHome
    );


    /* Favorites */

    favoritesBtn.addEventListener(
        "click",
        showFavorites
    );


    /* Random */

    randomBtn.addEventListener(
        "click",
        loadRandomRecipe
    );


    /* Modal close */

    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalOverlay.addEventListener(
        "click",
        closeModal
    );


    /* Escape key */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   API HELPER
   ========================================================= */

async function fetchAPI(endpoint) {

    const response =
        await fetch(
            `${API_BASE}/${endpoint}`
        );


    if (!response.ok) {

        throw new Error(
            "API request failed."
        );

    }


    return await response.json();

}


/* =========================================================
   CATEGORIES
   ========================================================= */

async function loadCategories() {

    try {

        const data =
            await fetchAPI(
                "categories.php"
            );


        if (
            !data.categories
        ) {

            return;

        }


        data.categories
            .forEach(category => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type = "button";

                button.className =
                    "category-btn";

                button.dataset.category =
                    category.strCategory;

                button.textContent =
                    `${getCategoryEmoji(
                        category.strCategory
                    )} ${category.strCategory}`;


                button.addEventListener(
                    "click",
                    function () {

                        selectCategory(
                            category.strCategory,
                            button
                        );

                    }
                );


                categoryList.appendChild(
                    button
                );

            });

    }

    catch (error) {

        console.error(
            "Category loading error:",
            error
        );

    }

}


/* ================= CATEGORY SELECT ================= */

async function selectCategory(
    category,
    clickedButton
) {

    currentCategory =
        category;


    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    clickedButton.classList.add(
        "active"
    );


    if (category === "All") {

        await loadPopularRecipes();

        return;

    }


    resultsTitle.textContent =
        `${category} Recipes`;


    showLoading();


    try {

        const data =
            await fetchAPI(
                `filter.php?c=${encodeURIComponent(
                    category
                )}`
            );


        if (!data.meals) {

            showEmpty();

            return;

        }


        currentMeals =
            data.meals;


        displayRecipes(
            data.meals
        );

    }

    catch (error) {

        showError(
            "Unable to load category recipes."
        );

    }

}


/* =========================================================
   POPULAR RECIPES
   ========================================================= */

async function loadPopularRecipes() {

    currentCategory =
        "All";


    setActiveCategory(
        "All"
    );


    resultsTitle.textContent =
        "Popular Recipes";


    showLoading();


    try {

        /*
         * The free API does not provide a
         * general "popular" endpoint in V1.
         *
         * We use chicken as the initial
         * discovery collection.
         */

        const data =
            await fetchAPI(
                "filter.php?c=Chicken"
            );


        if (!data.meals) {

            showEmpty();

            return;

        }


        currentMeals =
            data.meals;


        displayRecipes(
            data.meals
        );

    }

    catch (error) {

        showError(
            "Unable to load recipes. Please check your internet connection."
        );

    }

}


/* =========================================================
   SEARCH
   ========================================================= */

async function searchRecipes() {

    const query =
        searchInput.value.trim();


    if (!query) {

        showToast(
            "Please enter a recipe name.",
            "⚠️"
        );

        searchInput.focus();

        return;

    }


    resultsTitle.textContent =
        `Search Results for "${query}"`;


    showLoading();


    try {

        const data =
            await fetchAPI(
                `search.php?s=${encodeURIComponent(
                    query
                )}`
            );


        if (!data.meals) {

            currentMeals = [];

            showEmpty();

            return;

        }


        currentMeals =
            data.meals;


        displayRecipes(
            data.meals
        );

    }

    catch (error) {

        showError(
            "Search failed. Please try again."
        );

    }

}


/* =========================================================
   DISPLAY RECIPES
   ========================================================= */

function displayRecipes(
    meals
) {

    hideAllMessages();


    recipeContainer.innerHTML =
        "";


    if (
        !meals ||
        meals.length === 0
    ) {

        showEmpty();

        return;

    }


    resultsCount.textContent =
        `${meals.length} recipe${
            meals.length === 1
                ? ""
                : "s"
        }`;


    meals.forEach(
        meal => {

            const card =
                createRecipeCard(
                    meal
                );


            recipeContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CREATE RECIPE CARD
   ========================================================= */

function createRecipeCard(
    meal
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "recipe-card";


    const saved =
        favoriteIds.includes(
            meal.idMeal
        );


    const category =
        meal.strCategory ||
        "Recipe";


    const area =
        meal.strArea ||
        "International";


    card.innerHTML = `

        <div class="recipe-image-wrapper">

            <img
                class="recipe-image"
                src="${escapeHTML(
                    meal.strMealThumb
                )}"
                alt="${escapeHTML(
                    meal.strMeal
                )}"
                loading="lazy"
            >

            <button
                type="button"
                class="favorite-icon ${
                    saved
                        ? "saved"
                        : ""
                }"
                aria-label="Save favorite"
                data-favorite-id="${
                    meal.idMeal
                }">

                ${
                    saved
                        ? "♥"
                        : "♡"
                }

            </button>

        </div>


        <div class="card-content">

            <p class="card-category">
                ${escapeHTML(
                    category
                )}
            </p>

            <h3 class="card-title">
                ${escapeHTML(
                    meal.strMeal
                )}
            </h3>

            <p class="card-area">
                🌍 ${escapeHTML(
                    area
                )}
            </p>

            <button
                type="button"
                class="view-recipe-btn"
                data-recipe-id="${
                    meal.idMeal
                }">

                View Recipe →

            </button>

        </div>

    `;


    /* Favorite button */

    const favoriteButton =
        card.querySelector(
            ".favorite-icon"
        );


    favoriteButton.addEventListener(
        "click",
        function () {

            toggleFavorite(
                meal.idMeal,
                favoriteButton
            );

        }
    );


    /* Details button */

    const detailsButton =
        card.querySelector(
            ".view-recipe-btn"
        );


    detailsButton.addEventListener(
        "click",
        function () {

            openRecipeDetails(
                meal.idMeal
            );

        }
    );


    return card;

}


/* =========================================================
   RECIPE DETAILS
   ========================================================= */

async function openRecipeDetails(
    mealId
) {

    showModalLoading();


    try {

        const data =
            await fetchAPI(
                `lookup.php?i=${encodeURIComponent(
                    mealId
                )}`
            );


        if (
            !data.meals ||
            !data.meals[0]
        ) {

            showModalError();

            return;

        }


        const meal =
            data.meals[0];


        renderRecipeDetails(
            meal
        );

    }

    catch (error) {

        console.error(
            error
        );

        showModalError();

    }

}


/* =========================================================
   RENDER DETAILS
   ========================================================= */

function renderRecipeDetails(
    meal
) {

    const ingredients =
        getIngredients(
            meal
        );


    const isSaved =
        favoriteIds.includes(
            meal.idMeal
        );


    recipeDetails.innerHTML = `

        <img
            class="details-image"
            src="${escapeHTML(
                meal.strMealThumb
            )}"
            alt="${escapeHTML(
                meal.strMeal
            )}"
        >


        <div class="details-content">

            <p class="small-title">
                RECIPE DETAILS
            </p>


            <h2>
                ${escapeHTML(
                    meal.strMeal
                )}
            </h2>


            <div class="details-meta">

                <span class="meta-tag">
                    🍽️ ${
                        escapeHTML(
                            meal.strCategory ||
                            "Recipe"
                        )
                    }
                </span>

                <span class="meta-tag">
                    🌍 ${
                        escapeHTML(
                            meal.strArea ||
                            "International"
                        )
                    }
                </span>

                ${
                    meal.strTags
                    ?
                    `
                    <span class="meta-tag">
                        🏷️ ${
                            escapeHTML(
                                meal.strTags
                            )
                        }
                    </span>
                    `
                    :
                    ""
                }

            </div>


            <h3>
                🥕 Ingredients
            </h3>


            <ul class="ingredients-list">

                ${
                    ingredients
                        .map(
                            item =>
                                `<li>
                                    ${escapeHTML(
                                        item
                                    )}
                                </li>`
                        )
                        .join("")
                }

            </ul>


            <h3>
                👨‍🍳 Cooking Instructions
            </h3>


            <p class="instructions">
                ${escapeHTML(
                    meal.strInstructions ||
                    "Instructions are not available."
                )}
            </p>


            <div class="details-actions">

                <button
                    type="button"
                    class="action-btn"
                    id="detailFavoriteBtn">

                    ${
                        isSaved
                            ? "♥ Remove Favorite"
                            : "♡ Save Favorite"
                    }

                </button>


                <button
                    type="button"
                    class="action-btn secondary"
                    id="shareBtn">

                    🔗 Share Recipe

                </button>


                ${
                    meal.strYoutube
                    ?
                    `
                    <a
                        class="action-btn secondary"
                        href="${escapeHTML(
                            meal.strYoutube
                        )}"
                        target="_blank"
                        rel="noopener noreferrer">

                        🎥 Watch Video

                    </a>
                    `
                    :
                    ""
                }

            </div>

        </div>

    `;


    /* Favorite */

    document
        .getElementById(
            "detailFavoriteBtn"
        )
        .addEventListener(
            "click",
            function () {

                toggleFavorite(
                    meal.idMeal,
                    null
                );


                renderRecipeDetails(
                    meal
                );

            }
        );


    /* Share */

    document
        .getElementById(
            "shareBtn"
        )
        .addEventListener(
            "click",
            function () {

                shareRecipe(
                    meal
                );

            }
        );

}


/* =========================================================
   INGREDIENT EXTRACTION
   ========================================================= */

function getIngredients(
    meal
) {

    const ingredients = [];


    for (
        let i = 1;
        i <= 20;
        i++
    ) {

        const ingredient =
            meal[
                `strIngredient${i}`
            ];


        const measure =
            meal[
                `strMeasure${i}`
            ];


        if (
            ingredient &&
            ingredient.trim()
        ) {

            const cleanIngredient =
                ingredient.trim();


            const cleanMeasure =
                measure
                    ? measure.trim()
                    : "";


            ingredients.push(
                cleanMeasure
                    ?
                    `${cleanMeasure} — ${cleanIngredient}`
                    :
                    cleanIngredient
            );

        }

    }


    return ingredients;

}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(
    mealId,
    button
) {

    const index =
        favoriteIds.indexOf(
            mealId
        );


    if (index === -1) {

        favoriteIds.push(
            mealId
        );


        showToast(
            "Recipe saved to Favorites ❤️",
            "♥"
        );

    }

    else {

        favoriteIds.splice(
            index,
            1
        );


        showToast(
            "Recipe removed from Favorites",
            "✓"
        );

    }


    localStorage.setItem(
        "recipeFavorites",
        JSON.stringify(
            favoriteIds
        )
    );


    if (button) {

        const saved =
            favoriteIds.includes(
                mealId
            );


        button.classList.toggle(
            "saved",
            saved
        );


        button.textContent =
            saved
                ? "♥"
                : "♡";

    }

}


/* =========================================================
   FAVORITES PAGE
   ========================================================= */

async function showFavorites() {

    setNavigation(
        favoritesBtn
    );


    resultsTitle.textContent =
        "My Favorite Recipes";


    if (
        favoriteIds.length === 0
    ) {

        recipeContainer.innerHTML = "";

        resultsCount.textContent =
            "";

        hideAllMessages();

        emptyMessage.classList.remove(
            "hidden"
        );

        document.querySelector(
            "#emptyMessage h3"
        ).textContent =
            "No favorite recipes yet";

        document.querySelector(
            "#emptyMessage p"
        ).textContent =
            "Save recipes by clicking the heart icon.";

        return;

    }


    showLoading();


    try {

        const recipePromises =
            favoriteIds.map(
                id =>
                    fetchAPI(
                        `lookup.php?i=${id}`
                    )
            );


        const responses =
            await Promise.all(
                recipePromises
            );


        const meals =
            responses
                .filter(
                    response =>
                        response.meals
                )
                .map(
                    response =>
                        response.meals[0]
                );


        currentMeals =
            meals;


        displayRecipes(
            meals
        );


        resultsCount.textContent =
            `${meals.length} saved`;


    }

    catch (error) {

        showError(
            "Unable to load your favorite recipes."
        );

    }

}


/* =========================================================
   HOME
   ========================================================= */

function showHome() {

    setNavigation(
        homeBtn
    );


    searchInput.value =
        "";

    clearBtn.style.display =
        "none";


    resultsTitle.textContent =
        "Popular Recipes";


    loadPopularRecipes();

}


/* =========================================================
   RANDOM RECIPE
   ========================================================= */

async function loadRandomRecipe() {

    showModalLoading();


    try {

        const data =
            await fetchAPI(
                "random.php"
            );


        if (
            !data.meals ||
            !data.meals[0]
        ) {

            showModalError();

            return;

        }


        renderRecipeDetails(
            data.meals[0]
        );

    }

    catch (error) {

        showModalError();

    }

}


/* =========================================================
   SHARE
   ========================================================= */

async function shareRecipe(
    meal
) {

    const shareData = {

        title:
            meal.strMeal,

        text:
            `Check out this recipe: ${meal.strMeal}`,

        url:
            window.location.href

    };


    /* Native share */

    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );


            return;

        }

        catch (error) {

            /*
             * User cancelled sharing.
             * No error message needed.
             */

            if (
                error.name ===
                "AbortError"
            ) {

                return;

            }

        }

    }


    /* Clipboard fallback */

    try {

        await navigator.clipboard.writeText(
            window.location.href
        );


        showToast(
            "Website link copied!",
            "🔗"
        );

    }

    catch (error) {

        showToast(
            "Copy the website URL manually.",
            "🔗"
        );

    }

}


/* =========================================================
   MODAL
   ========================================================= */

function openModal() {

    recipeModal.classList.add(
        "show"
    );


    recipeModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    recipeModal.classList.remove(
        "show"
    );


    recipeModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* ================= MODAL LOADING ================= */

function showModalLoading() {

    openModal();


    recipeDetails.innerHTML = `

        <div class="loading">

            <div class="spinner"></div>

            <p>
                Loading recipe...
            </p>

        </div>

    `;

}


/* ================= MODAL ERROR ================= */

function showModalError() {

    openModal();


    recipeDetails.innerHTML = `

        <div class="message-box error">

            <span>
                ⚠️
            </span>

            <div>

                <h3>
                    Recipe unavailable
                </h3>

                <p>
                    We couldn't load the recipe details.
                    Please try again.
                </p>

            </div>

        </div>

    `;

}


/* =========================================================
   UI HELPERS
   ========================================================= */

function showLoading() {

    hideAllMessages();

    recipeContainer.innerHTML =
        "";

    loading.classList.remove(
        "hidden"
    );

}


function showEmpty() {

    hideAllMessages();

    recipeContainer.innerHTML =
        "";

    emptyMessage.classList.remove(
        "hidden"
    );

    resultsCount.textContent =
        "";

}


function showError(
    message
) {

    hideAllMessages();

    recipeContainer.innerHTML =
        "";

    errorMessage.classList.remove(
        "hidden"
    );

    errorText.textContent =
        message;

    resultsCount.textContent =
        "";

}


function hideAllMessages() {

    loading.classList.add(
        "hidden"
    );

    emptyMessage.classList.add(
        "hidden"
    );

    errorMessage.classList.add(
        "hidden"
    );

}


/* ================= NAVIGATION ================= */

function setNavigation(
    activeButton
) {

    document
        .querySelectorAll(
            ".nav-btn"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    activeButton.classList.add(
        "active"
    );

}


/* ================= CATEGORY ACTIVE ================= */

function setActiveCategory(
    category
) {

    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category ===
                category
            );

        });

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(
    message,
    icon = "✓"
) {

    toastMessage.textContent =
        message;

    toastIcon.textContent =
        icon;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   CATEGORY EMOJIS
   ========================================================= */

function getCategoryEmoji(
    category
) {

    const emojis = {

        "Beef": "🥩",

        "Breakfast": "🍳",

        "Chicken": "🍗",

        "Dessert": "🍰",

        "Goat": "🐐",

        "Lamb": "🍖",

        "Miscellaneous": "🍽️",

        "Pasta": "🍝",

        "Pork": "🥓",

        "Seafood": "🦐",

        "Side": "🥗",

        "Starter": "🥟",

        "Vegan": "🌱",

        "Vegetarian": "🥦",

        "All": "🍽️"

    };


    return (
        emojis[category] ||
        "🍴"
    );

}


/* =========================================================
   SECURITY / TEXT SAFETY
   ========================================================= */

function escapeHTML(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}
```
