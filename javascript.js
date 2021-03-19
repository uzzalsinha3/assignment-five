const search = document.getElementById("search"),
submit= document.getElementById("submit");
mealsInformation = document.getElementById("meals"),
single_mealInformation=document.getElementById("single-meal");
function searchMeal(){
    const foodName = search.value;
    if(foodName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data => {
        if(data.meals === null){
             alert("sorry,nothing found");
        }else{mealsInformation.innerHTML= data.meals.map(meal => `
          <div class="meal" onclick="showMeal('${meal.idMeal}')">
         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
         <div class="meal-info" data-mealID="${meal.idMeal}">
         <h3>${meal.strMeal}</h3>
         </div>
         </div>
             `)}    
    });
    }else{
   alert("sorry")
   }
}  
submit.addEventListener("click", searchMeal);
const showMeal = meal =>{
mealsInformation.style.display = "none";
const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
console.log(url);
fetch(url)
.then(res => res.json())
.then(data =>{
   const meal = data.meals[0];
   addMealToDom(meal);   
}
);
}
function addMealToDom(meal){
    const ingredients = [];
    for(let i = 1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}`);
    }else{
        break;
        }
    }
    single_mealInformation.innerHTML = `
        <div class=single-meal>
            <h1>${meal.strMeal}<h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        </div>
        <div>
            <h2>Ingredients</h2>
            <ul>
                 ${ingredients.map(showIngredients => `<li>${showIngredients}</li>`).join('')}
            </ul>
         </div>        
         `;

}


