const express = require('express');
const router = express.Router();
const { getTenVideoSubtitlesFromLocalBy } = require('../lib/youtube');
const { CLIENT_URL } = require('../constants');

let word, videosInfo, pageIndex, categories, language;

router.post('/:searchDetails', async (req, res, next) => {
  console.log('REQUEST video-search', req.body.selected);
  console.log('URL:', req.params);
  if (!req.body.selected.pageIndex) {
    pageIndex = 0;
  } else {
    pageIndex = req.body.selected.pageIndex;
  }
  categories = req.body.selected.categories;
  language = req.body.selected.language;
  word = req.body.selected.word;
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.status(200);
});

router.get('/success', async (req, res, next) => {
  console.log('Running video success router');
  videosInfo = await getTenVideoSubtitlesFromLocalBy(
    pageIndex,
    word,
    categories,
    language
  );
  console.log(videosInfo, word, 'success Router videoInfo');
  if (videosInfo) {
    res.header('Access-Control-Allow-Origin', CLIENT_URL);
    res.status(200).json({
      result: 'ok',
      searched: {
        word,
        videosInfo,
      },
    });
  }
});

module.exports = router;
