# 🍴 Recipe Finder

A responsive web application that allows users to search, browse, and save delicious recipes using **TheMealDB API**. The project demonstrates API integration, dynamic web development, responsive design, and browser storage using HTML, CSS, and JavaScript.

---

# 📌 Project Overview

The Recipe Finder application helps users discover recipes by searching for dish names or browsing recipe categories. It retrieves real-time recipe information from **TheMealDB API** and displays recipe images, ingredients, cooking instructions, and YouTube tutorial links.

Users can also save their favorite recipes using browser **LocalStorage**, making the application interactive and user-friendly.

---

# 🎯 Objectives

* Develop a responsive recipe search application.
* Integrate a real-world REST API.
* Learn asynchronous JavaScript using Fetch API.
* Display dynamic data using DOM manipulation.
* Store user favorites using LocalStorage.
* Create a mobile-friendly user interface.
* Deploy the application using GitHub Pages.

---

# ✨ Features

* 🔍 Search recipes by name
* 🍽 Browse recipes by category
* 📖 View complete recipe details
* 🥕 Display ingredients and measurements
* 👨‍🍳 Step-by-step cooking instructions
* ❤️ Save favorite recipes
* 💾 Store favorites in LocalStorage
* 🎲 Random recipe generator
* 🔗 Share recipes
* 🎥 Watch YouTube cooking tutorials (when available)
* 📱 Fully responsive design
* ⚠️ Loading and error handling

---

# 🛠 Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### API

* TheMealDB API

### Browser Features

* Fetch API
* LocalStorage
* Web Share API

### Deployment

* GitHub
* GitHub Pages

---

# 📂 Project Structure

```text
Recipe-Finder/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# 🔌 API Used

**TheMealDB API**

API Base URL

```text
https://www.themealdb.com/api/json/v1/1/
```

Endpoints used:

### Search Recipe

```text
/search.php?s=Chicken
```

### Recipe Details

```text
/lookup.php?i=52772
```

### Category Filter

```text
/filter.php?c=Chicken
```

### Random Recipe

```text
/random.php
```

---

# ⚙️ How It Works

1. User opens the website.
2. Popular recipes are displayed.
3. User searches for a recipe.
4. The application sends a request to TheMealDB API.
5. Matching recipes are displayed.
6. User selects a recipe.
7. Complete recipe information is shown.
8. User can save the recipe as a favorite.
9. Favorites are stored using LocalStorage.

---

# 💾 Local Storage

Favorite recipes are stored inside the browser using:

```javascript
localStorage.setItem("recipeFavorites", JSON.stringify(favoriteIds));
```

To retrieve favorites:

```javascript
const favoriteIds =
JSON.parse(localStorage.getItem("recipeFavorites")) || [];
```

---

# 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/recipe-finder.git
```

### Open the Project

Open the project folder and run:

```text
index.html
```

No additional installation is required.

---

# 🌐 GitHub Pages Deployment

1. Upload all project files to GitHub.
2. Open the repository.
3. Go to **Settings**.
4. Select **Pages**.
5. Choose **Deploy from a branch**.
6. Select **main** branch.
7. Select **/(root)**.
8. Click **Save**.

GitHub will generate a public website URL.

---

# 📱 Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

# 📸 Project Modules

### 🏠 Home Page

* Navigation bar
* Search bar
* Category buttons
* Recipe cards

### 🔍 Search

* Search recipes by name
* Display matching recipes

### 📖 Recipe Details

* Recipe image
* Ingredients
* Measurements
* Instructions
* YouTube link

### ❤️ Favorites

* Save recipes
* Remove recipes
* Persistent browser storage

### 🎲 Random Recipe

Displays a random recipe from the API.

---

# 🧪 Testing

The project has been tested for:

* Recipe search
* Category filtering
* Recipe details
* Favorite storage
* Responsive layout
* API connectivity
* Error handling

---

# ⚠️ Limitations

* Requires an internet connection.
* Favorites are stored only in the current browser.
* User authentication is not included.
* Advanced nutritional analysis is not available.
* Multi-ingredient search is not supported by the free API.

---

# 🔮 Future Enhancements

* User login and registration
* Personalized recommendations
* Shopping list generator
* Meal planner
* Recipe ratings and reviews
* Voice search
* Ingredient substitution suggestions
* Mobile application using React Native

---

# 🎓 Learning Outcomes

This project demonstrates:

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* REST API Integration
* Fetch API
* JSON Handling
* LocalStorage
* Responsive Web Design
* GitHub Deployment

---

# 👩‍💻 Developer

**Name:** Charu Nethra A R

**Project:** Recipe Finder Application

**Course:**  B.Sc

**Year:** 2026

---

# 📄 License

This project is developed for educational and learning purposes.

---

# 🙏 Acknowledgement

Special thanks to **TheMealDB** for providing the free recipe API used in this project.
