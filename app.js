var express = require("express");
var app = express();
var path = require('path');
var route = require('./routes/route');
var assert = require('assert');
const pug = require('pug');
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', __dirname, '/views');

app.use('/', route);
app.get('/', function(req,res){
});
app.get('*', function(req, res){
    res.send("Error 404")
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})
module.exports = app;


// async function main() {
//   recipes = await getRecipes(recipesURL, body)
//   // Saverio here has to send me the selected recipe
//   // Then I can filter the recipe and get the list of products with the quantity required
//   // Then I pass every product, one by one, to Gabri who calculates the price of each product
//   // Then we show the cost of the recipe to the customer
//   // products = getProducts(recipes)

//   console.log(JSON.stringify(recipes, null, 4))
// }

// main()
