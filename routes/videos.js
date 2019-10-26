const express = require('express');
const router = express.Router();
const { getTenVideoSubtitlesFromLocalBy } = require('../lib/youtube');

let word, videosInfo, pageIndex, categories, language;

router.post('/', async (req, res, next) => {
  console.log('비디오 검색 요청', req.body.selected);
  if (!req.body.selected.pageIndex) {
    pageIndex = 0;
  } else {
    pageIndex = req.body.selected.pageIndex;
  }
  categories = req.body.selected.categories;
  language = req.body.selected.language;
  word = req.body.selected.word;
});

router.get('/success', async (req, res, next) => {
  console.log('video success router 실행');
  videosInfo = await getTenVideoSubtitlesFromLocalBy(
    pageIndex,
    word,
    categories,
    language,
  );
  console.log(videosInfo, word, 'success라우터 videoInfo');
  if (videosInfo) {
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
