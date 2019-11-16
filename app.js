const request = require('request');
require('dotenv').config()

// const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY
// if (!SUBSCRIPTION_KEY) {
//   const secret = process.env.SECRET;
//   throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
// }

const options = {
  url: 'https://kesko.azure-api.net/v1/search/recipes',
  method: 'POST',
  body: {
    "filters": {
      "specialDiet": "2"
    }
  },
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'Ocp-Apim-Subscription-Key': '17776f56f1314e37b9f5a0194e05ba1a'
  }
};

function callback(err, res, body) {
  // let json = JSON.parse(body);

  if (!err && res.statusCode == 200) {
    console.log(body);
    // console.log(JSON.stringify(json, null, 4));
  } else {
    console.error(err)
  }
}

request(options, callback);
