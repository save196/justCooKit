const request = require('request');

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
const API_URL = process.env.PRODUCTS_API_U

/* INGREDIENT
{
  "Name": "(luomu) karitsan jauhelihaa",
  "Amount": "400",
  "PackageRecipe": "false",
  "IngredientType": "9402",
  "Unit": "g",
  "IngredientTypeName": "Karitsan jauheliha
}

OR

{
  "Name": "Pirkka esikypsytettyjä rikottuja ohrasuurimoita",
  "Ean": "6410405112811",
  "Amount": "2",
  "PackageRecipe": "false",
  "IngredientType": "6365",
  "Unit": "dl",
  "IngredientTypeName": "Ohrasuurimo, rikottu"
}
*/

module.exports = function getPriceFromIngredient(ingredient) {
  if ('Ean' in ingredient) {
    body = {
      "filters": {
        "ean": ingredient['Ean']
      }
    };
  }
  else {
    body = {
      "query": ingredient['ingredientTypeName'],
      "view": {
        "limit": 1
      }
    }
  };

  let options = {
    url: API_URL,
    method: 'POST',
    body,
    json: true,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    }
  };

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body['results'][0]['ean']);
      } else {
        reject(error)
      }
    });
  })
}
