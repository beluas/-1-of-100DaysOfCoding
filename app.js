document.addEventListener("DOMContentLoaded", () => {
	"use strict";

	const fetchData = async () => {
		try {
			const res = await fetch(
				"https://www.themealdb.com/api/json/v1/1/random.php"
			);
			let meal = await res.json();

			return meal.meals[0];
		} catch (err) {
			if (err) console.log(error);
		}
	};

	const createIngredientObject = (recipe) => {
		const ingredientsName = [];
		const quantities = [];
		for (let [key, value] of Object.entries(recipe)) {
			if (key.includes("strIngredient")) {
				if (value) {
					ingredientsName.push(value);
				}
			}
			if (key.includes("strMeasure")) {
				if (value) {
					quantities.push(value);
				}
			}
		}

		let ingredients = {};

		ingredientsName.forEach((key, i) => {
			ingredients[key] = quantities[i];
		});

		return ingredients;
	};

	const displayRecipe = async (recipe) => {
		const ingredients = await createIngredientObject(recipe);

		let strIngredients = "";

		for (let [key, value] of Object.entries(ingredients)) {
			strIngredients += `<li>${key} : ${value}</li>`;
		}

		let recipeHTMLElements = `
        <div class="recipe">
            <div class="img">
                <img src="${recipe.strMealThumb}" alt="" />
                
                <p> <b> Tags </b>: ${
					recipe.strTags ? recipe.strTags : recipe.strMeal
				}</p>
                
                <p> <b>Category</b> : ${recipe.strCategory}</p>
                <p> <b> Area </b>: ${recipe.strArea}<p/>

                <h2>Ingredients</h2>
                    <ul>${strIngredients}</ul>
            
            </div>
           
            <div class="desc">
                <h2> ${recipe.strMeal}</h3>

                
                <p>${recipe.strInstructions.substring(0, 800)}<p/>
            </div> 
        </div>
            
        `;

		document.querySelector("#recipe").innerHTML = recipeHTMLElements;
	};

	document.querySelector("button").addEventListener("click", async () => {
		const recipe = await fetchData();
		displayRecipe(recipe);
	});
});
