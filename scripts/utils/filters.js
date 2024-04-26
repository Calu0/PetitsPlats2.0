import { removeFilter } from '../pages/index.js';


export function filterByIngredient(recipes, ingredient) {
    return recipes.filter(recipe =>
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
    );
}

export function filterByUstensil(recipes, ustensil) {
    return recipes.filter(recipe =>
        recipe.ustensils.some(u => u.toLowerCase().includes(ustensil.toLowerCase()))
    );
}

export function filterByAppliance(recipes, appliance) {
    return recipes.filter(recipe =>
        recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
    );
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
    element.remove();

}

