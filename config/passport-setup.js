const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

// create cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//get user from cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
      console.log(profile);
      //Check if user already exists in our DB
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //Already have a user
          console.log("User is in DB already" + profile);
          done(null, currentUser);
          //moving on to serialize user function
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          })
            .save()
            .then(newUser => {
              console.log("New user created: " + newUser);
              done(null, newUser);
              //moving on to serialize user function
            });
        }
      });
    }
  )
);
