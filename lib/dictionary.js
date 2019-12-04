const axios = require('axios');
const { X_Rapid } = require('../config/keys');

module.exports = {
  requestToWordsAPI,
};

async function requestToWordsAPI(searchWord) {
  console.log('requestToWordsAPI 실행');
  const wordsAPI = await axios.get(
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}`,
    {
      headers: {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': X_Rapid.apiKey,
      },
    }
  );
  return wordsAPI;
}
