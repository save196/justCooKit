const getEanAndQuantityFromIngredient = require('./apiModules/getEanAndQuantityFromIngredient');
const getStoresFromEan = require('./apiModules/getStoresFromEan');
const getPriceFromEanAndStore = require('./apiModules/getPriceFromEanAndStore');

async function getPriceFromIngredient(ingredient) {
  const { ean, quantity } = await getEanAndQuantityFromIngredient(ingredient);
  let stores = await getStoresFromEan(ean);
  let price = await getPriceFromEanAndStore(ean, stores);

  let weightedPrice = quantity === 0 ? 0 : price * ingredient.amount / quantity

  Number.isNaN(weightedPrice) ? weightedPrice = 0 : Math.abs(weightedPrice)

  return weightedPrice
}

module.exports = {
  getIngredients: function (recipe, requiredPortions) {
    let ingredients = []
    if (!recipe) return ingredients

    let portions = recipe.Portions ? eval(recipe.Portions.Amount) : 1

    Array.isArray(recipe.Ingredients) ? recipe.Ingredients.forEach(ingredient => {
      Array.isArray(ingredient.SubSectionIngredients) ? ingredient.SubSectionIngredients.forEach(subSectionIngredient => {
        let name = subSectionIngredient[0].Name
        let ean = subSectionIngredient[0].Ean
        let ingredientTypeName = subSectionIngredient[0].IngredientTypeName
        let amount

        if (subSectionIngredient[0] && subSectionIngredient[0].Amount) {
          let amountNumber = eval(subSectionIngredient[0].Amount.match(/\d/g).join(""))

          if (subSectionIngredient[0].Unit === "tl") { // tea spoon
            amount = amountNumber * 4.2 / portions * requiredPortions // convert to grams
          } else if (subSectionIngredient[0].Unit === "dl") { // deciliters
            amount = amountNumber * 100 / portions * requiredPortions // convert to milliliters
          } else if (subSectionIngredient[0].Unit === "rkl") { // table spoon
            amount = amountNumber * 15 / portions * requiredPortions // convert to grams
          } else if (subSectionIngredient[0].Unit === "ripaus") { // an insignificant amount, from 1/2 tea spoon to 1/16
            amount = (1.5 / portions) * requiredPortions // convert to grams
          } else {
            if (subSectionIngredient[0].AmountInfo) {
              let num = eval(subSectionIngredient[0].AmountInfo.match(/\d/g).join(""))
              amount = (num / portions) * requiredPortions
            } else {
              amount = (amountNumber / portions) * requiredPortions
            }
          }
        }
        amount = amount ? amount : 0

        let index = ingredients.findIndex(x => x.name === name)

        if (index === -1) {
          ingredients.push({
            name,
            ean: ean ? ean : null,
            amount: Math.round(amount),
            ingredientTypeName
          })
        }
        else {
          ingredients[index].amount = Math.round(amount + ingredients[index].amount)
        }
      }) : console.log('No sub-ingredients')
    }) : console.log("No ingredients")

    return ingredients
  },
  getRecipePrice: async function (ingredients) {
    let finalPrice = 0

    for (let i = 0; i < ingredients.length; i++) {
      weightedPrice = await getPriceFromIngredient(ingredients[i])
      finalPrice += weightedPrice
    }

    return (finalPrice * 1.2).toFixed(2) + '€'
  }
}
