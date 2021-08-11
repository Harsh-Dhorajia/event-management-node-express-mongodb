const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generate = require("../utils/generateToken");
module.exports = {
  async register(req, res) {
    try {
      let { name, email, password } = req.body;

      const isUserAlreadyRegistered = await User.find({
        email,
      });
      if (isUserAlreadyRegistered.length) {
        return res.status(403).send({
          message: "Email already exists",
        });
      }
      password = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password,
        name,
      });
      const token = generate(user);
      return res.status(200).send({
        message: "User is registered successfully",
        user,
        token,
      });
    } catch (error) {
      console.log(`error`, error);
      res.status(500).send(error);
    }
  },
};
