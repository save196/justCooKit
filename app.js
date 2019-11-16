const getReceipts = require('./getReceipts')
const url = 'https://kesko.azure-api.net/v1/search/recipes'
const body = {
  "filters": {
    "specialDiet": "2",
    "preparationTime": {
      "minTime": 30,
      "maxTime": 60
    }
  },
  "view": {
    "limit": 2
  }
}

receipts = getReceipts(url, body, function (err, body) {
  if (err) {
    console.log(err);
  } else {
    return body;
  }
})

console.log(receipts)
