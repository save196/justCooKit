const request = require('request');

module.exports = function getProducts(recipe, requiredPortions) {
  let products = []
  let portions = recipe.Portions ? eval(recipe.Portions.Amount) : 1

  Array.isArray(recipe.Ingredients) ? recipe.Ingredients.forEach(ingredient => {
    Array.isArray(ingredient.SubSectionIngredients) ? ingredient.SubSectionIngredients.forEach(subSectionIngredient => {
      let name = subSectionIngredient[0].Name
      let ean = subSectionIngredient[0].Ean
      let amount

      if (subSectionIngredient[0]) {
        if (subSectionIngredient[0].Unit === "tl") { // tea spoon
          amount = (eval(subSectionIngredient[0].Amount) * 4.2 / portions) * requiredPortions // convert to grams
        } else if (subSectionIngredient[0].Unit === "dl") { // deciliters
          amount = (eval(subSectionIngredient[0].Amount) * 100 / portions) * requiredPortions // convert to milliliters
        } else if (subSectionIngredient[0].Unit === "rkl") { // table spoon
          amount = (eval(subSectionIngredient[0].Amount) * 15 / portions) * requiredPortions // convert to grams
        } else if (subSectionIngredient[0].Unit === "ripaus") { // an insignificant amount, from 1/2 tea spoon to 1/16
          amount = (1.5 / portions) * requiredPortions // convert to grams
        } else {
          if (subSectionIngredient[0].AmountInfo) {
            let num = eval(subSectionIngredient[0].AmountInfo.match(/\d/g).join(""))
            amount = (num / portions) * requiredPortions
          } else {
            amount = (subSectionIngredient[0].Amount / portions) * requiredPortions
          }
        }
      }
      amount = amount ? amount : 0

      let index = products.findIndex(x => x.name === name)

      if (index === -1) {
        products.push({
          name,
          ean: ean ? ean : null,
          amount: Math.round(amount)
        })
      }
      else {
        products[index].amount = Math.round(amount + products[index].amount)
      }
    }) : console.log('No sub-ingredients')
  }) : console.log("No ingredients")

  return products
}
