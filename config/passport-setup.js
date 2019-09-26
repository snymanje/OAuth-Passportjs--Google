const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      //options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      console.log("passport callback func");

      new User({
        username: profile.displayName,
        googleId: profile.id
      })
        .save()
        .then(newUser => {
          console.log("New user created: " + newUser);
        });
    }
  )
);
