const getReceipts = require('./getReceipts')

const receiptsURL = 'https://kesko.azure-api.net/v1/search/recipes'
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

async function main() {
  receipts = await getReceipts(receiptsURL, body)
  console.log(JSON.stringify(receipts, null, 4));
}

main()
