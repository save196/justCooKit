var express = require('express');
var router = express.Router();
const pug = require('pug');
var path = require('path');
var fs = require('fs');
const Router = require('express-promise-router')

const getRecipes = require('../apiModules/getRecipes')
const { getIngredients, getRecipePrice, getPriceFromIngredient } = require('../utils')

router.get("/search", async (req, res) => {
  const recipesList = await getRecipes(10)
  res.render("views/search/search.pug", { recipes: recipesList });
})

router.post("/check", function (req, res) {
  console.log(req.body.retRecipe)
  res.send({ status: 'SUCCESS' });
});

router.get("/recipe", async function (req, res) {
  // console.log(req.body)
  let recipes = await getRecipes(1, "2", 60)
  let ingredients = getIngredients(recipes[0], 1)
  let price = await getRecipePrice(ingredients)

  res.render("views/recipe/recipe.pug", { recipe: recipes[0], price });
});

router.post("/cart", function (req, res) {
  console.log(req.body)
  Array.isArray(req.body.recipes) ? req.body.recipes.forEach(recipe => {
    // da fare
  }) : console.error("No recipes in the cart!")

  res.render("views/recipe/recipe.pug", { recipe: req.body.recipe, price: finalPrice });
});

module.exports = router;
