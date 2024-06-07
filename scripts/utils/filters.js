import { removeFilter } from '../pages/index.js';

export function filterByIngredient(recipes, ingredient) {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            let ing = recipe.ingredients[j];
            if (ing.ingredient.toLowerCase().includes(ingredient.toLowerCase())) {
                filteredRecipes.push(recipe);
                break;
            }
        }
    }
    return filteredRecipes;
}

export function filterByUstensil(recipes, ustensil) {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        for (let j = 0; j < recipe.ustensils.length; j++) {
            let u = recipe.ustensils[j];
            if (u.toLowerCase().includes(ustensil.toLowerCase())) {
                filteredRecipes.push(recipe);
                break;
            }
        }
    }
    return filteredRecipes;
}

export function filterByAppliance(recipes, appliance) {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.appliance.toLowerCase().includes(appliance.toLowerCase())) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}

export function addFilterButton(filterName, type) {
    const filterContainer = document.querySelector('.filter-container');
    const button = document.createElement('button');
    button.className = 'bg-yellow text-sm flex justify-between items-center rounded-[10px] p-[17px] gap-[60px]';
    button.innerHTML = `<p>${filterName}</p><img src="./assets/svg/close-icon.svg" alt="cross" class="w-[10px] h-[10px] mr-2"/>`;
    button.addEventListener('click', function () {
        removeFilterButton(button);
        removeFilter(type, filterName);
    }, false);
    filterContainer.appendChild(button);
}

export function removeFilterButton(element) {
    const filterContainer = document.querySelector('.filter-container');
    const buttons = filterContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] === element) {
            filterContainer.removeChild(buttons[i]);
            break;
        }
    }
}
