let searchIcon = document.querySelector('.search-icon');
let inputField = document.querySelector('.input-field');
let getRecipe = document.querySelector('.food-btn');
let foodCard = document.querySelector('.card');
let gridCard = document.querySelector('.grid');
let cancelIcon = document.getElementById('cancel');
// add eventListeners
searchIcon.addEventListener('click',getMealList)
gridCard.addEventListener('click',showDetails)


// Get the list of the meals
function getMealList(){
    let userValue = inputField.value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userValue}`)
    .then(response => response.json())
    .then(data =>{
        let html = ''
        if(data.meals && inputField.value !== ''){
            data.meals.forEach(meal => {
                html += `
                <div class="card" data-id=${meal.idMeal}>
                    <img src="${meal.strMealThumb}" alt="">
                    <div class="details">
                        <h4 class="name">${meal.strMeal}</h4>
                        <button class="food-btn">Get recipe</button>
                    </div>    
                </div>
                `
            })
            gridCard.classList.remove('red')
        }else{
            html = `sorry, we've found` 
            gridCard.classList.add('red')
        }
        gridCard.innerHTML = html
    })

}

function showDetails(e){
    e.preventDefault()
    if(e.target.classList.contains('food-btn')){
        let mealItem = e.target.parentElement.parentElement;
        console.log(e.target);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>{
            getMealDetails(data.meals);
        })
    }
}

function getMealDetails(meal){
    meal = meal[0];
    console.log();
    let html = `
    <div class="content">
    <div class="image">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="details">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions.slice(600)}.</p>
        <div class="watch">
            <a href="${meal.strYoutube}">watch</a>
            <i class="fa fa-youtube"></i>
        </div>
    </div>
    <div id="cancel"onclick="remove()">
        <i class="fa fa-times" id="times"></i> 
    </div>
</div>
    `
    document.querySelector('.blog').innerHTML = html
    document.querySelector('.blog').classList.add('active')

}

function remove(){
    document.querySelector('.blog').classList.remove('active')

}