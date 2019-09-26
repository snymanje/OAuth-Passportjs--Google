const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passwort
  res.send("logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//callback route for auth
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You are on the redirect uri");
});

module.exports = router;
