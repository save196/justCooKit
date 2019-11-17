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
        // console.log(JSON.stringify(body.results, null, 4))
        if (body.results[0]) {
          let ean = body.results[0].ean
          let urlSlug = body.results[0].urlSlug

          noEan = urlSlug.slice(0, urlSlug.length - 14)
          firstDigit = noEan.match(/\d/)
          let index = noEan.indexOf(firstDigit)
          if (index === -1) index = 0

          noFirstPart = noEan.slice(index, noEan.length)

          value = ""
          for (let i = 0; i < noFirstPart.length; i++) {
            const char = noFirstPart[i];
            try {
              Number.isInteger(eval(char))
              value += char
            } catch (e) {
              if (char === 'l') {
                value *= 1000
                break
              }
              if (char === 'm' && noFirstPart[i + 1] === 'l') {
                break
              }
              if (char === 'd' && noFirstPart[i + 1] === 'l') {
                value *= 100
                break
              }
              if (char === 'k' && noFirstPart[i + 1] === 'g') {
                !value ? value = 1000 : value *= 1000
                break
              }
              if ((char === '-' || char === 'x') && noFirstPart[i + 1].match(/\d/)) {
                value += '*'
              } else {
                break
              }
              if (char === 'k' && noFirstPart[i + 1] === 'p' && noFirstPart[i + 2] === 'l' && noFirstPart[i + 3].match(/\d/)) {
                value += '*'
              } else {
                value = 0
                break
              }
              if (char === 'g') {
                break
              }
              if ((char === '-' || char === 'x') && noFirstPart[i + 1].match(/\d/)) {
                value += '*'
              } else {
                break
              }
            }
          }

          if (!value && value !== 0) {
            if (urlSlug.includes("kg")) {
              value = 1000
            } else {
              value = 0
            }
          }

          resolve({ ean, quantity: eval(value) });
        } else {
          resolve(0)
        }
      } else {
        reject(error)
      }
    });
  })
}
