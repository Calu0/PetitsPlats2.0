// import '../../dist/styles.css'
import { recipes } from '../../data/recipes.js';
import { RecipeCardFactory } from '../templates/card.js';

function displayAllRecipes() {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = RecipeCardFactory(recipe);
        recipesContainer.innerHTML += recipeCard.getRecipeCardDOM();
    });
}

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



document.addEventListener('DOMContentLoaded', () => {

    // NON FILTERED , TO CHANGE
    const ingredients = getIngredients(recipes);
    const appareils = getAppareils(recipes);
    const ustensiles = getUstensiles(recipes);



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



function init() {
    displayAllRecipes();
}

init();