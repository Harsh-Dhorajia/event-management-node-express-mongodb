const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));
app.use(express.json())
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("listening on port " + port));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(`err`, err);
    }
    console.log("Mongodb Connected successfully");
  }
);

app.use(require('./routes'));

module.exports = app;
