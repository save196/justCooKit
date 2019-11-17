const request = require('request');
require('dotenv').config()

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY

// const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
// if (!SUBSCRIPTION_KEY) {
//   const secret = process.env.SECRET;
//   throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
// }

module.exports = function getPricesFromEanAndStores(ean, stores) {
  let store = Array.isArray(stores) && stores.length ? stores[0].id : -1

  const options = {
    url: 'https://kesko.azure-api.net/v2/stores/' + store + '/product-pricing?plussa=False',
    method: 'POST',
    body: {
      "eans": ean
    },
    json: true,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '17776f56f1314e37b9f5a0194e05ba1a'
    }
  };

  if (store != -1) {
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body[ean].simplePrice.price);
        } else {
          reject(error)
        }
      });
    })
  }
  else {
    return 0
  }
}
