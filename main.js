const getRecipes = require('./apiModules/getRecipes')
const { getIngredients, getPriceFromIngredient } = require('./utils')

recipesURL = process.env.RECIPES_API_URL

async function main() {
  let limit = 1
  let specialDiet = "6"
  let maxTime = 60
  let requiredPortions = 1
  recipes = await getRecipes(limit, specialDiet, maxTime)
  ingredients = getIngredients(recipes.results[0], requiredPortions)

  // console.log(JSON.stringify(recipes.results[0], null, 4))
  // console.log(JSON.stringify(ingredients, null, 4))

  let finalPrice = 0
  for (var i = 0; i < ingredients.length; i++) {
    weightedPrice = await getPriceFromIngredient(ingredients[i])
    finalPrice += weightedPrice
    // console.log(weightedPrice)
  }
  console.log((finalPrice * 1.1).toFixed(2));
}

main()
