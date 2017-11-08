
const axios = require('axios');

async function getNumResults(postCode) {

  const url = `https://public.je-apis.com/restaurants?q=${postCode}`;
  const headers = {
    'Accept-Tenant': 'uk',
    'Accept-Language': 'en-GB',
    'Authorization': 'Basic VGVjaFRlc3RBUEk6dXNlcjI=',
    'Host': 'public.je-apis.com'
  }

  try {
    const result = await axios({ method: 'get', url, headers });
    console.log(`There are ${result.data.Restaurants.length} restaurants in the ${postCode.toUpperCase()} area`)
  } catch (error) {
    console.error(error);
  }
}

getNumResults('EC2Y');
