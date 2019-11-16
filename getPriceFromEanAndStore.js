const request = require('request');
require('dotenv').config()

// const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
// if (!SUBSCRIPTION_KEY) {
//   const secret = process.env.SECRET;
//   throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
// }

module.exports = function getPricesFromEanAndStores(ean, store) {
  const options = {
    url: 'https://kesko.azure-api.net/v2/stores/'+ store +'/product-pricing?plussa=False',
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

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //ret_val = JSON.parse(body);
        resolve(body[ean].simplePrice.price);
      } else {
        reject(error)
      }
    });
  })
}
