const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'User' model class out of mongoose as an object
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOne returns a promise, so use 'then' here
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // User already exists
          // Call done with the found user
          done(null, existingUser);
        } else {
          // Make a new user
          // Call done with the new user
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
