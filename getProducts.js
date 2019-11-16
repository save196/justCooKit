const request = require('request');

module.exports = function getProducts(recipe, quantity) {
  let products = []
  let portions = recipe.Portions.Amount
  for (let i = 0; i < recipe.Ingredients.length; i++) {
    const ingredient = array[i];
    ingredient.SubSectionIngredients.forEach(subSectionIngredient => {
      products.push({
        name: subSectionIngredient.Name,
        ean: subSectionIngredient.Ean || null,
        amount: (subSectionIngredient.Amount / portions) * quantity
      })
    });

  }
  return {
    products
  }
}
