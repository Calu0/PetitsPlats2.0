// import '../../dist/styles.css'
import { recipes } from '../../data/recipes.js';
import { RecipeCardFactory } from '../templates/card.js';
import { addFilterButton } from '../utils/filters.js';


export let currentFilteredRecipes = recipes;

export let activeFilters = {
    ingredients: [],
    appliances: [],
    utensils: []
};

function getIngredients(recipes) {
    const ingredients = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!ingredients.includes(ingredient.ingredient)) {
                ingredients.push(ingredient.ingredient);
            }
        });
    });
    return ingredients;
}

function getAppareils(recipes) {
    const appareils = [];
    recipes.forEach(recipe => {
        if (!appareils.includes(recipe.appliance)) {
            appareils.push(recipe.appliance);
        }
    });
    return appareils;
}

function getUstensiles(recipes) {
    const ustensiles = [];
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            if (!ustensiles.includes(ustensil)) {
                ustensiles.push(ustensil);
            }
        });
    });
    return ustensiles;
}



export function applyFilters() {
    let filteredRecipes = recipes;

    // Filters recipes that include any of the selected ingredients
    if (activeFilters.ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeFilters.ingredients.some(ing =>
                recipe.ingredients.some(i => i.ingredient.toLowerCase().includes(ing.toLowerCase()))
            )
        );
    }

    // Filters recipes that include any of the selected appliances
    if (activeFilters.appliances.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeFilters.appliances.some(appliance =>
                recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
            )
        );
    }

    // Filters recipes that include any of the selected utensils
    if (activeFilters.utensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeFilters.utensils.some(utensil =>
                recipe.ustensils.some(u => u.toLowerCase().includes(utensil.toLowerCase()))
            )
        );
    }

    displayAllRecipes(filteredRecipes);
    currentFilteredRecipes = filteredRecipes;
}



function addFilter(type, value) {
    if (!activeFilters[type].includes(value)) {
        activeFilters[type].push(value);
        applyFilters();
    }
}


export function removeFilter(type, value) {
    const index = activeFilters[type].indexOf(value);
    if (index > -1) {
        activeFilters[type].splice(index, 1);
        applyFilters();
    }
}

// fill the dropdown with the items and show it
function fillAndShowList(items, selector) {

    const dropdownContent = document.querySelector(selector);
    const listElement = dropdownContent.querySelector('ul');
    listElement.innerHTML = '';
    items.forEach(item => {
        listElement.innerHTML += `<li class='hover:bg-yellow px-4 py-[6px] cursor-pointer'>${item}</li>`;
    })

}

// filter the dropdown items based on the search input
function filterDropdownItems(inputId, listSelector, items) {

    const searchText = document.getElementById(inputId).value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchText));
    fillAndShowList(filteredItems, listSelector);

}

// add event listeners to the search inputs of the ingredients dropdown to filter the items
document.getElementById('ingredient-search-input').addEventListener('input', function () {
    const ingredients = getIngredients(currentFilteredRecipes);
    filterDropdownItems('ingredient-search-input', '.select__ingredients .ingredients-dropdown', ingredients);
});


// add event listeners to the search inputs of the appliances dropdown to filter the items
document.getElementById('appliance-search-input').addEventListener('input', function () {
    const appliances = getAppareils(currentFilteredRecipes);
    filterDropdownItems('appliance-search-input', '.select__appareils .appareils-dropdown', appliances);
});


// add event listeners to the search inputs of the ustensils dropdown to filter the items
document.getElementById('utensil-search-input').addEventListener('input', function () {
    const utensils = getUstensiles(currentFilteredRecipes);
    filterDropdownItems('utensil-search-input', '.select__ustensiles .ustensiles-dropdown', utensils);
});


// add event listeners for when the page is loaded to show the dropdowns when the buttons are clicked
// fill the dropdowns with the items and show them
// close the dropdowns when clicked outside
document.addEventListener('DOMContentLoaded', () => {


    // ingredients dropdown    
    document.querySelector('.select__ingredients .button__ingredients').addEventListener('click', function () {
        const ingredients = getIngredients(currentFilteredRecipes);
        fillAndShowList(ingredients, '.select__ingredients .ingredients-dropdown');
        const dropdownContent = document.querySelector('.select__ingredients .ingredients-dropdown');
        dropdownContent.classList.toggle('hidden');
    });


    // appliances dropdown
    document.querySelector('.select__appareils .button__appareils').addEventListener('click', function () {
        const appareils = getAppareils(currentFilteredRecipes);
        fillAndShowList(appareils, '.select__appareils .appareils-dropdown');
        const dropdownContent = document.querySelector('.select__appareils .appareils-dropdown');
        dropdownContent.classList.toggle('hidden');
    });


    // ustensils dropdown
    document.querySelector('.select__ustensiles .button__ustensiles').addEventListener('click', function () {
        const ustensiles = getUstensiles(currentFilteredRecipes);
        fillAndShowList(ustensiles, '.select__ustensiles .ustensiles-dropdown');
        const dropdownContent = document.querySelector('.select__ustensiles .ustensiles-dropdown');
        dropdownContent.classList.toggle('hidden');
    });

});


function closeDropdown(selector) {
    const dropdownContent = document.querySelector(selector);
    if (!dropdownContent.classList.contains('hidden')) {
        dropdownContent.classList.add('hidden');
    }
}

// close dropdown when clicked outside
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


// filter by ingredient
document.querySelector('.select__ingredients .ingredients-dropdown ul').addEventListener('click', function (e) {
    const ingredient = e.target.innerText;
    addFilterButton(ingredient, 'ingredients');
    addFilter('ingredients', ingredient);
    closeDropdown('.select__ingredients .ingredients-dropdown');
});


// filter by appliance
document.querySelector('.select__appareils .appareils-dropdown ul').addEventListener('click', function (e) {
    const appliance = e.target.innerText;
    addFilterButton(appliance, 'appliances');
    addFilter('appliances', appliance);
    closeDropdown('.select__appareils .appareils-dropdown');
});


// filter by ustensils
document.querySelector('.select__ustensiles .ustensiles-dropdown ul').addEventListener('click', function (e) {
    const utensil = e.target.innerText;
    addFilterButton(utensil, 'utensils');
    addFilter('utensils', utensil);
    closeDropdown('.select__ustensiles .ustensiles-dropdown');
});



// main searchbar, looks for the search text in the recipe name, ingredients and ustensils
function handleMainSearch() {
    const searchText = document.getElementById('main-search-input').value.toLowerCase();
    let filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchText) ||
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchText)) ||
            recipe.ustensils.some(u => u.toLowerCase().includes(searchText)) ||
            recipe.appliance.toLowerCase().includes(searchText);
    });
    displayAllRecipes(filteredRecipes);
}

document.getElementById('main-search-button').addEventListener('click', handleMainSearch);
document.getElementById('main-search-input').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleMainSearch();
    }
});



export function displayAllRecipes(filteredRecipes = recipes) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = '';
    console.log(filteredRecipes);

    filteredRecipes.forEach(recipe => {
        const recipeCard = RecipeCardFactory(recipe);
        recipesContainer.innerHTML += recipeCard.getRecipeCardDOM();
    });
}


const init = () => {
    displayAllRecipes();
}

init();

