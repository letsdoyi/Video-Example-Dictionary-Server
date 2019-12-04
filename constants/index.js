// Connect Dotenv
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config({
    path: './.env',
  });
}

module.exports = {
  CLIENT_URL: process.env.CLIENT_URL,
  GOOGLE_API_SCOPE: {
    PLUS: 'https://www.googleapis.com/auth/plus.login',
    YOUTUBE: 'https://www.googleapis.com/youtube/v3'
  }
}
