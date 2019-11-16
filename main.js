const getRecipes = require('./apiModules/getRecipes')
const { getIngredients, getPriceFromIngredient } = require('./utils')

recipesURL = process.env.AZURE_API_URL

async function main() {
  let limit = 1
  let specialDiet = "2"
  let maxTime = 60
  let requiredPortions = 3
  recipes = await getRecipes()
  ingredients = getIngredients(recipes.results[0], requiredPortions)

  // console.log(JSON.stringify(recipes.results[0], null, 4))
  console.log(JSON.stringify(ingredients, null, 4))

  let price
  for (var i = 0; i < ingredients.length; i++) {
    price = await getPriceFromIngredient(ingredients[i])
    console.log(price);
  }
}

main()
