let searchIcon = document.querySelector('.search-icon');
let inputField = document.querySelector('.input-field');
let getRecipe = document.querySelector('.food-btn');
let foodCard = document.querySelector('.card');
let gridCard = document.querySelector('.grid');

// add eventListeners
searchIcon.addEventListener('click',getMealList)

// Get the list of the meals
function getMealList(){
    let userValue = inputField.value.trim()
    console.log(userValue)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userValue}`)
    .then(response => response.json())
    .then(data =>{
        let html = ''
        if(data.meals && inputField.value !== ''){
            data.meals.forEach(meal => {
                console.log(meal)
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
