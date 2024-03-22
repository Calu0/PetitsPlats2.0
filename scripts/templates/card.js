


export function RecipeCardFactory(data) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

    const shortDescription = description.length > 180 ? `${description.slice(0, 180)}...` : description;


    function createIngredientList(ingredients) {
        return ingredients.map(ingredient => {
            let name = ingredient.ingredient;
            let quantity = ingredient.quantity;
            let unit = ingredient.unit === 'grammes' ? 'g' : ingredient.unit;

            if (unit) {
                quantity += ` ${unit}`;
            }
            return `<li class='flex flex-col text-gray w-[45%] text-sm'>
            <span class='text-black font-500 '>${name}</span>
            ${quantity ? `<span}>${quantity}</span>` : ''}
            </li>`;
        }).join('');
    }

    // function createUstensilsList(ustensils) {
    //     return ustensils.map(ustensil => `<li>${ustensil}</li>`).join('');
    // }

    function getRecipeCardDOM() {
        const ingredientsHTML = createIngredientList(ingredients);
        // const ustensilsHTML = createUstensilsList(ustensils);

        return `
            <a class="recipe-card max-w-[380px] bg-white rounded-[21px] shadow-sm relative" id="recipe-${id}" href='/'>
                <img src="../../assets/images/recipes/${image}" alt="${name}" class='h-[253px] object-cover w-full rounded-t-[21px]'/>
                <div class='px-6 gap-7 flex flex-col mt-8 mb-[60px]'>
                <h3 class='font-bold font-Anton font-lg'>${name}</h3>
                <div class='flex flex-col gap-15 gap-4'> 
                    <p class='text-gray font-bold tracking-widest text-xxs'>RECETTE</p>
                    <p class='text-sm text-black'>${shortDescription}</p>
                </div>
                <div>
                <div class='flex flex-col gap-15 gap-4'>
                <p class='text-gray font-bold tracking-widest text-xxs'>INGRÉDIENTS</p>
                <ul class="ingredients flex flex-wrap gap-5">${ingredientsHTML}</ul>
                </div>
                
                </div>
                <div class='absolute top-5 right-5 bg-yellow px-[15px] py-[5px] text-xxs rounded-full'> ${time} min</div>
                </div>
            </a>
        `;
    }

    return { getRecipeCardDOM };
}