const googleCredentials = require('../config/google.json');
const User = require('../models/User');

module.exports = function(app) {
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth')
    .OAuth2Strategy;

  app.use(passport.initialize());
  app.use(passport.session());
  console.log('passport.session 실행중');

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializeUser', user);
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris[0],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOrCreate({
            google_id: profile.id,
            name: profile.displayName,
            profile_image_url: profile.photos[0].value,
          });
          done(null, user.doc);
        } catch (err) {
          done(err);
        }
        return passport;
      },
    ),
  );
};
