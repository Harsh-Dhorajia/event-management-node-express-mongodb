const jwt = require("jsonwebtoken");
const User = require("../models/User");
const _ = require("lodash");
const auth = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(400).send({
      message: `Authentication error. Token required.`,
    });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (!data) {
      return nes.status(400).send({
        message: "Invalid token",
      });
    }
    const userData = await User.findOne({
      _id: data.id,
    });
    if (!userData) {
      return nes.status(400).send({
        message: "You are not allowed to access this",
      });
    }
    req.user = _.pick(userData, ["email", "_id"]);
    next();
  } catch (error) {
    console.log(`error`, error);
  }
};
module.exports = auth;
