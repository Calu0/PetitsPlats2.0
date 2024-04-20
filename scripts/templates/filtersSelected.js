

function createFilterButton(filterType, filterValue) {
    const button = document.createElement('button');
    button.className = 'bg-yellow text-sm flex justify-between items-center rounded-[10px] p-[17px] gap-[60px]';
    button.innerHTML = `
        <p>${filterValue}</p>
        <img src="./assets/svg/close-icon.svg" alt="cross" class="w-[10px] h-[10px] mr-2" />
    `;

    button.addEventListener('click', function () {
        removeFilter(filterType, filterValue);
        updateFilterDisplays();
        displayAllRecipes(currentFilteredRecipes());
    });

    return button;
}