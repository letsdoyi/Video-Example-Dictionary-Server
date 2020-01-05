const google = require('../config/google.json');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports = function(app) {
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: '579216993023-ufdlgbmsvomg5rb2v76b4pmp03ccmssj.apps.googleusercontent.com',
        clientSecret: keys.google.clientSecret,
        callbackURL: google.web.redirect_uris[0],
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
      }
    )
  );
};
