const express = require('express');
const router = express.Router();
const { requestToWordsAPI } = require('../lib/dictionary');

router.post('/', async (req, res, next) => {
  try {
    console.log('사전 검색 요청 단어:', req.body.word);
    const word = req.body.word;
    let dictionary = await requestToWordsAPI(word);
    dictionary = dictionary.data;

    if (dictionary) {
      res.status(200).json({
        result: 'ok',
        dictionary,
      });
    } else {
      res.status(204).json();
    }

  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

module.exports = router;
