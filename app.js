const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

//set up view engine
app.set("view engine", "ejs");

//connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log("Connected to mongodb");
  }
);

//setup routes
app.use("/auth", authRoutes);

//create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now running on port 3000");
});
