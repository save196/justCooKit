// var express = require("express");
// var path = require('path');
// var route = require('./routes/route');
// var assert = require('assert');
// const pug = require('pug');
// var bodyParser = require('body-parser');
// var session = require('express-session');

const getRecipes = require('./getRecipe')
const getProducts = require('./getProducts')

// let app = express();
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.use(express.static(path.join(__dirname, 'public/style')));
// app.use(express.static(path.join(__dirname, 'public/img')));
// app.use(express.static(path.join(__dirname, 'public/upload')));

// app.use('/', route);
// app.get('/', function (req, res) {
// });
// app.get('*', function (req, res) {
//   res.send("Page not found!")
// });

// app.listen(3000, () => {
//   console.log('Listening on port 3000!');
// })
// module.exports = app;

async function main() {
  let limit = 1
  recipes = await getRecipes(limit)
  // Saverio here has to send me the selected recipe and how many people want it
  // Then I can filter the recipe and get the list of products with the quantity required
  let recipe = recipes.results[0]
  let portions = 4
  products = getProducts(recipe, portions)
  // Then I pass every product, one by one, to Gabri who calculates the price of each product
  // Then we show the cost of the recipe to the customer

  // console.log(JSON.stringify(recipes.results[0].Ingredients[0].SubSectionIngredients, null, 4))
  console.log(JSON.stringify(products, null, 4))
}

main()
