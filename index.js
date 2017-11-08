
const axios = require('axios');
const postalAreas = require('./postal-areas.json');
const sleep = ms => new Promise(res => setTimeout(res, ms))

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

const postCodes = postalAreas.reduce((seq, area) => seq.concat(area.range.map(i => `${area.code}${i}`)), []);
const sequence = [];

postCodes.forEach(code => {
  sequence.push(() => getNumResults(code));
  sequence.push(() => sleep(10000));
})

await Promise.all(sequence);
