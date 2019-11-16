const request = require('request');

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
    url: 'https://kesko.azure-api.net/v1/search/products',
    method: 'POST',
    body,
    json: true,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '17776f56f1314e37b9f5a0194e05ba1a'
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
