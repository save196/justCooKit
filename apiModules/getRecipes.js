const request = require('request');
require('dotenv').config()

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
const API_URL = process.env.RECIPES_API_URL

module.exports = function getRecipes(limit, specialDiet, maxTime) {
  let defaultLimit = "20"
  let defaultSpecialDiet = []
  let defaultMaxTime = 60

  const options = {
    url: API_URL,
    method: 'POST',
    body: {
      "filters": {
        specialDiet: specialDiet ? specialDiet : defaultSpecialDiet,
        "preparationTime": {
          "minTime": 30,
          maxTime: maxTime ? maxTime : defaultMaxTime
        }
      },
      "view": {
        limit: limit ? limit : defaultLimit
      }
    },
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
        resolve(body);
      } else {
        reject(error)
      }
    });
  })
}
