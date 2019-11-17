var express = require('express');
var router = express.Router();
const pug = require('pug');
var path = require('path');
var fs = require('fs');
const Router = require('express-promise-router')

const getRecipes = require('../apiModules/getRecipes')
const { getIngredients, getVanillaIngredients, getRecipePrice, getPriceFromIngredient } = require('../utils')

router.get("/search", async (req, res) => {
  const recipesList = await getRecipes(10)
  res.render("views/search/search.pug", { recipes: recipesList });
})

router.post("/search", async (req, res) => {
  console.log(eval(req.body.maxTime.match(/\d/g).join("")));
  const recipesList = await getRecipes(10, req.body.specialDiet, eval(req.body.maxTime.match(/\d/g).join("")))
  res.render("views/search/search.pug", { recipes: recipesList });
})


router.post("/recipe", async function (req, res) {
  let recipe = JSON.parse(req.body.retRecipe)
  let ingredients = getIngredients(recipe, 1)
  let vanillaIngredients = getVanillaIngredients(recipe, 1)
  let price = await getRecipePrice(ingredients)
  res.render("views/recipe/recipe.pug", { recipe: recipe, ingredients: vanillaIngredients, price });
});

module.exports = router;
