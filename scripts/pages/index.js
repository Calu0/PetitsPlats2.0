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


    if (activeFilters.ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeFilters.ingredients.every(ing =>
                recipe.ingredients.some(i => i.ingredient.toLowerCase().includes(ing.toLowerCase()))
            )
        );
    }


    if (activeFilters.appliances.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeFilters.appliances.every(appliance =>
                recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
            )
        );
    }

    if (activeFilters.utensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeFilters.utensils.every(utensil =>
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


document.addEventListener('DOMContentLoaded', () => {

    // NON FILTERED , TO CHANGE
    const ingredients = getIngredients(currentFilteredRecipes);
    const appareils = getAppareils(currentFilteredRecipes);
    const ustensiles = getUstensiles(currentFilteredRecipes);

    function fillAndShowList(items, selector) {

        const dropdownContent = document.querySelector(selector);
        const listElement = dropdownContent.querySelector('ul');
        listElement.innerHTML = '';
        items.forEach(item => {
            listElement.innerHTML += `<li class='hover:bg-yellow px-4 py-[6px] cursor-pointer'>${item}</li>`;
        });
        dropdownContent.classList.toggle('hidden');

    }

    document.querySelector('.select__ingredients .button__ingredients').addEventListener('click', function () {
        fillAndShowList(ingredients, '.select__ingredients .ingredients-dropdown');

    });

    document.querySelector('.select__appareils .button__appareils').addEventListener('click', function () {
        fillAndShowList(appareils, '.select__appareils .appareils-dropdown');
    });

    document.querySelector('.select__ustensiles .button__ustensiles').addEventListener('click', function () {
        fillAndShowList(ustensiles, '.select__ustensiles .ustensiles-dropdown');
    });
});


// filter by ingredient
document.querySelector('.select__ingredients .ingredients-dropdown ul').addEventListener('click', function (e) {
    const ingredient = e.target.innerText;
    addFilterButton(ingredient);
    addFilter('ingredients', ingredient);
});

// filter by appareils
document.querySelector('.select__appareils .appareils-dropdown ul').addEventListener('click', function (e) {
    const appliance = e.target.innerText;
    addFilterButton(appliance);
    addFilter('appliances', appliance);
});

// filter by ustenstiles
document.querySelector('.select__ustensiles .ustensiles-dropdown ul').addEventListener('click', function (e) {
    const utensils = e.target.innerText;
    addFilterButton(utensils);
    addFilter('utensils', utensils);
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

