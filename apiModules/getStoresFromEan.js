const request = require('request');
require('dotenv').config()

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
const API_URL = process.env.PRODUCTS_BY_EAN_API_U

// const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
// if (!SUBSCRIPTION_KEY) {
//   const secret = process.env.SECRET;
//   throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
// }

module.exports = function getStoresFromEan(ean) {
  const options = {
    url: API_URL + ean,
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    }
  };

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        ret_val = JSON.parse(body);
        resolve(ret_val[0].stores);
      } else {
        reject(error)
      }
    });
  })
}
