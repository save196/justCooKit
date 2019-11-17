const getRecipes = require('./apiModules/getRecipes')
const { getIngredients, getRecipePrice } = require('./utils')

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

  let price = await getRecipePrice(ingredients)

  console.log(price);
}

main()
