var express = require('express');
var router = express.Router();
const pug = require('pug');
var path = require('path');
var fs = require('fs');
const Router = require('express-promise-router')

const getRecipes = require('../apiModules/getRecipes')
const { getProducts, getPriceFromIngredient } = require('../utils')

router.get("/search", async (req, res) => {
  const recipesList = await getRecipes(10)
  res.render("views/search/search.pug", { recipes: recipesList });
})

router.post("/check", function (req, res) {
  console.log(req.body.retRecipe)
  res.send({ status: 'SUCCESS' });
});

router.post("/recipe", function (req, res) {
  console.log(req.body)
  let products = getProducts(req.body.recipe, 1)
  let finalPrice = 0

  Array.isArray(products) ? products.forEach(ingredient => {
    finalPrice += await getPriceFromIngredient(ingredient)
  }) : console.error("No products in the recipe!")

  res.render("views/recipe/recipe.pug", { recipe: req.body.recipe, price: finalPrice });
});

router.post("/cart", function (req, res) {
  console.log(req.body)
  Array.isArray(req.body.recipes) ? req.body.recipes.forEach(recipe => {
    // da fare
  }) : console.error("No recipes in the cart!")

  res.render("views/recipe/recipe.pug", { recipe: req.body.recipe, price: finalPrice });
});

module.exports = router;
