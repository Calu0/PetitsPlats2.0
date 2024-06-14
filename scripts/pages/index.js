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

// Function to get unique ingredients from the recipes
function getIngredients(recipes) {
    const ingredients = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            let ingredient = recipes[i].ingredients[j].ingredient;
            let found = false;
            for (let k = 0; k < ingredients.length; k++) {
                if (ingredients[k] === ingredient) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                ingredients.push(ingredient);
            }
        }
    }
    return ingredients;
}

// Function to get unique appliances from the recipes
function getAppareils(recipes) {
    const appareils = [];
    for (let i = 0; i < recipes.length; i++) {
        let appliance = recipes[i].appliance;
        let found = false;
        for (let j = 0; j < appareils.length; j++) {
            if (appareils[j] === appliance) {
                found = true;
                break;
            }
        }
        if (!found) {
            appareils.push(appliance);
        }
    }
    return appareils;
}

// Function to get unique utensils from the recipes
function getUstensiles(recipes) {
    const ustensiles = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            let utensil = recipes[i].ustensils[j];
            let found = false;
            for (let k = 0; k < ustensiles.length; k++) {
                if (ustensiles[k] === utensil) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                ustensiles.push(utensil);
            }
        }
    }
    return ustensiles;
}

// Function to apply filters to the recipes
export function applyFilters() {
    let filteredRecipes = recipes;

    for (let i = 0; i < activeFilters.ingredients.length; i++) {
        filteredRecipes = filterByIngredient(filteredRecipes, activeFilters.ingredients[i]);
    }

    for (let i = 0; i < activeFilters.appliances.length; i++) {
        filteredRecipes = filterByAppliance(filteredRecipes, activeFilters.appliances[i]);
    }

    for (let i = 0; i < activeFilters.utensils.length; i++) {
        filteredRecipes = filterByUstensil(filteredRecipes, activeFilters.utensils[i]);
    }

    currentFilteredRecipes = filteredRecipes;
    updateDropdowns(filteredRecipes);
    displayAllRecipes(filteredRecipes);
}

// Function to update the dropdowns based on the filtered recipes
function updateDropdowns(filteredRecipes) {
    const ingredients = getIngredients(filteredRecipes);
    const appliances = getAppareils(filteredRecipes);
    const utensils = getUstensiles(filteredRecipes);

    fillAndShowList(ingredients, '.select__ingredients .ingredients-dropdown');
    fillAndShowList(appliances, '.select__appareils .appareils-dropdown');
    fillAndShowList(utensils, '.select__ustensiles .ustensiles-dropdown');
}

// Function to add a filter and reapply filters
function addFilter(type, value) {
    let found = false;
    for (let i = 0; i < activeFilters[type].length; i++) {
        if (activeFilters[type][i] === value) {
            found = true;
            break;
        }
    }
    if (!found) {
        activeFilters[type].push(value);
        applyFilters();
    }
}

// Function to remove a filter and reapply filters
export function removeFilter(type, value) {
    let index = -1;
    for (let i = 0; i < activeFilters[type].length; i++) {
        if (activeFilters[type][i] === value) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        activeFilters[type].splice(index, 1);
        applyFilters();
    }
}

// Fill the dropdown with items and show it
function fillAndShowList(items, selector) {
    const dropdownContent = document.querySelector(selector);
    const listElement = dropdownContent.querySelector('ul');
    listElement.innerHTML = ''; // Clear existing items
    for (let i = 0; i < items.length; i++) {
        const liElement = document.createElement('li');
        liElement.className = 'hover:bg-yellow px-4 py-[6px] cursor-pointer';
        liElement.textContent = items[i];
        listElement.appendChild(liElement);
    }
}

// Filter the dropdown items based on the search input
function filterDropdownItems(inputId, listSelector, items) {
    const searchText = document.getElementById(inputId).value.toLowerCase();
    const filteredItems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].toLowerCase().indexOf(searchText) !== -1) {
            filteredItems.push(items[i]);
        }
    }
    fillAndShowList(filteredItems, listSelector);
}

// Add event listeners to the search inputs of the ingredients dropdown to filter the items
document.getElementById('ingredient-search-input').addEventListener('input', function () {
    const ingredients = getIngredients(currentFilteredRecipes);
    filterDropdownItems('ingredient-search-input', '.select__ingredients .ingredients-dropdown', ingredients);
});

// Add event listeners to the search inputs of the appliances dropdown to filter the items
document.getElementById('appliance-search-input').addEventListener('input', function () {
    const appliances = getAppareils(currentFilteredRecipes);
    filterDropdownItems('appliance-search-input', '.select__appareils .appareils-dropdown', appliances);
});

// Add event listeners to the search inputs of the utensils dropdown to filter the items
document.getElementById('utensil-search-input').addEventListener('input', function () {
    const utensils = getUstensiles(currentFilteredRecipes);
    filterDropdownItems('utensil-search-input', '.select__ustensiles .ustensiles-dropdown', utensils);
});

// Add event listeners for when the page is loaded to show the dropdowns when the buttons are clicked
document.addEventListener('DOMContentLoaded', () => {
    // Ingredients dropdown    
    document.querySelector('.select__ingredients .button__ingredients').addEventListener('click', function () {
        const ingredients = getIngredients(currentFilteredRecipes);
        fillAndShowList(ingredients, '.select__ingredients .ingredients-dropdown');
        const dropdownContent = document.querySelector('.select__ingredients .ingredients-dropdown');
        dropdownContent.classList.toggle('hidden');
    });

    // Appliances dropdown
    document.querySelector('.select__appareils .button__appareils').addEventListener('click', function () {
        const appareils = getAppareils(currentFilteredRecipes);
        fillAndShowList(appareils, '.select__appareils .appareils-dropdown');
        const dropdownContent = document.querySelector('.select__appareils .appareils-dropdown');
        dropdownContent.classList.toggle('hidden');
    });

    // Utensils dropdown
    document.querySelector('.select__ustensiles .button__ustensiles').addEventListener('click', function () {
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

document.addEventListener('click', function (e) {
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
document.querySelector('.select__ingredients .ingredients-dropdown ul').addEventListener('click', function (e) {
    const ingredient = e.target.innerText;
    addFilterButton(ingredient, 'ingredients');
    addFilter('ingredients', ingredient);
    closeDropdown('.select__ingredients .ingredients-dropdown');
});

// Filter by appliance
document.querySelector('.select__appareils .appareils-dropdown ul').addEventListener('click', function (e) {
    const appliance = e.target.innerText;
    addFilterButton(appliance, 'appliances');
    addFilter('appliances', appliance);
    closeDropdown('.select__appareils .appareils-dropdown');
});

// Filter by utensils
document.querySelector('.select__ustensiles .ustensiles-dropdown ul').addEventListener('click', function (e) {
    const utensil = e.target.innerText;
    addFilterButton(utensil, 'utensils');
    addFilter('utensils', utensil);
    closeDropdown('.select__ustensiles .ustensiles-dropdown');
});

// Main searchbar, looks for the search text in the recipe name, ingredients, and utensils
function handleMainSearch() {
    const searchText = document.getElementById('main-search-input').value.toLowerCase();
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(searchText) ||
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchText)) ||
            recipe.ustensils.some(u => u.toLowerCase().includes(searchText)) ||
            recipe.appliance.toLowerCase().includes(searchText)) {
            filteredRecipes.push(recipe);
        }
    }

    // Display message if no recipes match the search text
    if (filteredRecipes.length === 0) {
        displayNoRecipesMessage(searchText);
    } else {
        displayAllRecipes(filteredRecipes);
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

document.getElementById('main-search-button').addEventListener('click', handleMainSearch);
document.getElementById('main-search-input').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleMainSearch();
    }
});

// Function to display all recipes
export function displayAllRecipes(filteredRecipes = recipes) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = '';

    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipeCard = RecipeCardFactory(filteredRecipes[i]);
        recipesContainer.innerHTML += recipeCard.getRecipeCardDOM();
    }


    const totalElement = document.getElementById('total');
    totalElement.innerText = `${filteredRecipes.length} recettes trouvées`;
}

// Initialize the page by displaying all recipes
const init = () => {
    displayAllRecipes();
}

init();
