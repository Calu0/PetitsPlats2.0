// Import necessary functions
import { recipes } from '../../data/recipes.js';
import { RecipeCardFactory } from '../templates/card.js';
import { addFilterButton, filterByIngredient, filterByUstensil, filterByAppliance } from '../utils/filters.js';


// Initialize variables for current filtered recipes and active filters
export let currentFilteredRecipes = recipes;
export let activeFilters = {
    ingredients: [],
    appliances: [],
    utensils: []
};

// Function to get unique ingredients from the recipes excluding selected ones
function getIngredients(recipes) {
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!activeFilters.ingredients.includes(ingredient.ingredient)) {
                ingredientsSet.add(ingredient.ingredient);
            }
        });
    });
    return Array.from(ingredientsSet);
}

// Function to get unique appliances from the recipes excluding selected ones
function getAppareils(recipes) {
    const appliancesSet = new Set();
    recipes.forEach(recipe => {
        if (!activeFilters.appliances.includes(recipe.appliance)) {
            appliancesSet.add(recipe.appliance);
        }
    });
    return Array.from(appliancesSet);
}

// Function to get unique utensils from the recipes excluding selected ones
function getUstensiles(recipes) {
    const utensilsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
            if (!activeFilters.utensils.includes(utensil)) {
                utensilsSet.add(utensil);
            }
        });
    });
    return Array.from(utensilsSet);
}

// Function to apply filters to the recipes and update dropdowns
export function applyFilters(baseRecipes = recipes) {
    let filteredRecipes = baseRecipes;

    activeFilters.ingredients.forEach(ingredient => {
        filteredRecipes = filterByIngredient(filteredRecipes, ingredient);
    });

    activeFilters.appliances.forEach(appliance => {
        filteredRecipes = filterByAppliance(filteredRecipes, appliance);
    });

    activeFilters.utensils.forEach(utensil => {
        filteredRecipes = filterByUstensil(filteredRecipes, utensil);
    });

    currentFilteredRecipes = filteredRecipes;
    displayAllRecipes(filteredRecipes);
    updateDropdownsWithFilteredRecipes(filteredRecipes);
}

// Function to update the dropdowns based on the filtered recipes
function updateDropdownsWithFilteredRecipes(filteredRecipes) {
    const ingredients = getIngredients(filteredRecipes);
    const appliances = getAppareils(filteredRecipes);
    const utensils = getUstensiles(filteredRecipes);

    fillAndShowList(ingredients, '.select__ingredients .ingredients-dropdown');
    fillAndShowList(appliances, '.select__appareils .appareils-dropdown');
    fillAndShowList(utensils, '.select__ustensiles .ustensiles-dropdown');
}

// Function to add a filter and reapply filters
function addFilter(type, value) {
    if (!activeFilters[type].includes(value)) {
        activeFilters[type].push(value);
        applyFilters(currentFilteredRecipes);
    }
}

// Function to remove a filter and reapply filters
export function removeFilter(type, value) {
    activeFilters[type] = activeFilters[type].filter(item => item !== value);
    applyFilters(recipes);
}

// Fill the dropdown with items and show it
function fillAndShowList(items, selector) {
    const dropdownContent = document.querySelector(selector);
    const listElement = dropdownContent.querySelector('ul');
    listElement.innerHTML = '';
    items.forEach(item => {
        const liElement = document.createElement('li');
        liElement.className = 'hover:bg-yellow px-4 py-[6px] cursor-pointer';
        liElement.textContent = item;
        listElement.appendChild(liElement);
    });
}

// Filter the dropdown items based on the search input
function filterDropdownItems(inputId, listSelector, items) {
    const searchText = document.getElementById(inputId).value.toLowerCase();
    const SpecialCharactersRegex = /[^a-zA-ZÀ-ÿ0-9\s]/g;

    if (SpecialCharactersRegex.test(searchText)) {
        return;
    }
    if (searchText.length >= 3) {
        const filteredItems = items.filter(item => item.toLowerCase().includes(searchText));
        fillAndShowList(filteredItems, listSelector);
    } else {
        fillAndShowList(items, listSelector);
    }
}

// Add event listeners to the search inputs of the ingredients dropdown to filter the items
document.getElementById('ingredient-search-input').addEventListener('input', () => {
    const ingredients = getIngredients(currentFilteredRecipes);
    filterDropdownItems('ingredient-search-input', '.select__ingredients .ingredients-dropdown', ingredients);
});

// Add event listeners to the search inputs of the appliances dropdown to filter the items
document.getElementById('appliance-search-input').addEventListener('input', () => {
    const appliances = getAppareils(currentFilteredRecipes);
    filterDropdownItems('appliance-search-input', '.select__appareils .appareils-dropdown', appliances);
});

// Add event listeners to the search inputs of the utensils dropdown to filter the items
document.getElementById('utensil-search-input').addEventListener('input', () => {
    const utensils = getUstensiles(currentFilteredRecipes);
    filterDropdownItems('utensil-search-input', '.select__ustensiles .ustensiles-dropdown', utensils);
});

// Add event listeners for when the page is loaded to show the dropdowns when the buttons are clicked
document.addEventListener('DOMContentLoaded', () => {

    // Ingredients dropdown    
    document.querySelector('.select__ingredients .button__ingredients').addEventListener('click', () => {
        const ingredients = getIngredients(currentFilteredRecipes);
        fillAndShowList(ingredients, '.select__ingredients .ingredients-dropdown');
        const dropdownContent = document.querySelector('.select__ingredients .ingredients-dropdown');
        dropdownContent.classList.toggle('hidden');
    });

    // Appliances dropdown
    document.querySelector('.select__appareils .button__appareils').addEventListener('click', () => {
        const appareils = getAppareils(currentFilteredRecipes);
        fillAndShowList(appareils, '.select__appareils .appareils-dropdown');
        const dropdownContent = document.querySelector('.select__appareils .appareils-dropdown');
        dropdownContent.classList.toggle('hidden');
    });

    // Utensils dropdown
    document.querySelector('.select__ustensiles .button__ustensiles').addEventListener('click', () => {
        const ustensiles = getUstensiles(currentFilteredRecipes);
        fillAndShowList(ustensiles, '.select__ustensiles .ustensiles-dropdown');
        const dropdownContent = document.querySelector('.select__ustensiles .ustensiles-dropdown');
        dropdownContent.classList.toggle('hidden');
    });
});

// Close dropdown when clicked outside
function closeDropdown(selector) {
    const dropdownContent = document.querySelector(selector);
    if (!dropdownContent.classList.contains('hidden')) {
        dropdownContent.classList.add('hidden');
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.select__ingredients') && !e.target.closest('.button__ingredients')) {
        closeDropdown('.select__ingredients .ingredients-dropdown');
    }

    if (!e.target.closest('.select__appareils') && !e.target.closest('.button__appareils')) {
        closeDropdown('.select__appareils .appareils-dropdown');
    }

    if (!e.target.closest('.select__ustensiles') && !e.target.closest('.button__ustensiles')) {
        closeDropdown('.select__ustensiles .ustensiles-dropdown');
    }
});

// Filter by ingredient
document.querySelector('.select__ingredients .ingredients-dropdown ul').addEventListener('click', (e) => {
    const ingredient = e.target.innerText;
    addFilterButton(ingredient, 'ingredients');
    addFilter('ingredients', ingredient);
    closeDropdown('.select__ingredients .ingredients-dropdown');
    document.getElementById('ingredient-search-input').value = '';
    document.getElementById('main-search-input').value = '';
});

// Filter by appliance
document.querySelector('.select__appareils .appareils-dropdown ul').addEventListener('click', (e) => {
    const appliance = e.target.innerText;
    addFilterButton(appliance, 'appliances');
    addFilter('appliances', appliance);
    closeDropdown('.select__appareils .appareils-dropdown');
    document.getElementById('ingredient-search-input').value = '';
    document.getElementById('main-search-input').value = '';
});

// Filter by utensils
document.querySelector('.select__ustensiles .ustensiles-dropdown ul').addEventListener('click', (e) => {
    const utensil = e.target.innerText;
    addFilterButton(utensil, 'utensils');
    addFilter('utensils', utensil);
    closeDropdown('.select__ustensiles .ustensiles-dropdown');
    document.getElementById('ingredient-search-input').value = '';
    document.getElementById('main-search-input').value = '';
});

// Main searchbar, looks for the search text in the recipe name, ingredients, and utensils
function handleMainSearch() {
    activeFilters.ingredients = [];
    activeFilters.appliances = [];
    activeFilters.utensils = [];

    const SpecialCharactersRegex = /[^a-zA-ZÀ-ÿ0-9\s]/g;
    const searchText = document.getElementById('main-search-input').value.toLowerCase();

    // Display messages based on input validation
    if (searchText === '') {
        applyFilters(recipes);
        return;
    } else if (SpecialCharactersRegex.test(searchText)) {
        displayNoSpecialCharactersMessage();
        return;
    } else if (searchText.length < 3) {
        displayNotEnoughCharactersMessage();
        return;
    }

    // Filter recipes based on search text
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText) ||
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchText)) ||
        recipe.ustensils.some(u => u.toLowerCase().includes(searchText)) ||
        recipe.appliance.toLowerCase().includes(searchText)
    );

    // Display messages or filtered recipes
    if (filteredRecipes.length === 0) {
        displayNoRecipesMessage(searchText);
    } else {
        currentFilteredRecipes = filteredRecipes;
        applyFilters(currentFilteredRecipes);
    }
}

// Function to display message when no recipes match the search text
function displayNoRecipesMessage(searchText) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = `
        <div class='flex justify-center text-lg w-full mb-24'>
            <p>Aucune recette ne contient ‘${searchText}’</p>
        </div>
    `;
}

function displayNotEnoughCharactersMessage() {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = `
        <div class='flex justify-center text-lg w-full mb-24'>
            <p>Veuillez saisir au moins 3 caractères</p>
        </div>
    `;
}

function displayNoSpecialCharactersMessage() {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = `
        <div class='flex justify-center text-lg w-full mb-24'>
            <p>Caractères spéciaux non autorisés</p>
        </div>
    `;
}

document.getElementById('main-search-button').addEventListener('click', handleMainSearch);
document.getElementById('main-search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleMainSearch();
    }
});

// Function to display all recipes
export function displayAllRecipes(filteredRecipes = recipes) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = '';

    filteredRecipes.forEach(recipe => {
        const recipeCard = RecipeCardFactory(recipe);
        recipesContainer.innerHTML += recipeCard.getRecipeCardDOM();
    });

    const totalElement = document.getElementById('total');
    totalElement.innerText = `${filteredRecipes.length} recettes trouvées`;
}

// Initialize the page by displaying all recipes
const init = () => {
    applyFilters(recipes);
}

init();
