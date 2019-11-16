const request = require('request');
require('dotenv').config()

// const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
// if (!SUBSCRIPTION_KEY) {
//   const secret = process.env.SECRET;
//   throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
// }

module.exports = function (url, body, callback) {
  const options = {
    url,
    method: 'POST',
    body,
    json: true,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '17776f56f1314e37b9f5a0194e05ba1a'
    }
  };

  return request(options, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return callback(error || { statusCode: response.statusCode });
    }
    callback(null, body);
  });
}
