const getRecipes = require('./apiModules/getRecipes')
const getProducts = require('./getProducts')

recipesURL = process.env.AZURE_API_URL

async function main() {
  let limit = 1
  let specialDiet = "2"
  let maxTime = 60
  let requiredPortions = 3
  recipes = await getRecipes(limit, specialDiet, maxTime)
  // Saverio here has to send me the selected recipe
  // Then I can filter the recipe and get the list of products with the quantity required
  // Then I pass every product, one by one, to Gabri who calculates the price of each product
  // Then we show the cost of the recipe to the customer
  products = getProducts(recipes.results[0], requiredPortions)

  // console.log(JSON.stringify(recipes.results[0], null, 4))
  console.log(JSON.stringify(products, null, 4))
}

main()
