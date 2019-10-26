const express = require('express');
const router = express.Router();
const passport = require('passport');
const { CLIENT_URL, GOOGLE_API_SCOPE } = require('../constants');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [GOOGLE_API_SCOPE.PLUS],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res, next) => {
    console.log(req.user);
    res.redirect(CLIENT_URL);
  },
);

router.get('/google/login/success', (req, res, next) => {
  console.log('로그인 호출!');
  console.log('유저', req.user);
  if (req.user) {
    res.status(200).json({
      result: 'login success',
      user: req.user,
    });
  } else{
    res.status(204);
  }
});

router.get('/google/logout', (req, res) => {
  console.log('로그아웃 호출!');
  console.log('logout 전 user', req.user);
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
