const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");
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
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.log(`error`, error);
      res.status(500).send(error);
    }
  },

  async login(req, res) {
    try {
      let { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).send({
          message: "Password is invalid",
        });
      }
      const token = generate(user);
      return res.status(200).send({
        message: "User is loggedin successfully",
        data: {
          token,
        },
      });
    } catch (error) {
      console.log(`error`, error);
      res.status(500).send(error);
    }
  },

  async changePassword(req, res) {
    try {
      const { _id } = req.user;
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(_id);

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isValidPassword) {
        return res.status(400).send({ message: "Invalid current Password" });
      }
      await User.findByIdAndUpdate(
        _id,
        { password: await bcrypt.hash(newPassword, 12) },
        { multi: true }
      );
      return res.send({ message: "Password changed successfully" });
    } catch (error) {
      console.log(`error`, error);
      return res.send(error);
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: "Reuested User not found" });
      }
      const token = uuidv4();
      await User.findByIdAndUpdate(user._id, {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: dayjs().add(10, "minutes").format(),
        },
      });
      return res.json({
        message: "Reset password request is successfully executed",
      });
    } catch (error) {
      console.log(`error`, error);
      return res.send(error);
    }
  },

  async resetPassword(req, res) {
    try {
      const { newPassword } = req.body;
      const { token } = req.params;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gte: dayjs().format() },
      });
      if (!user) {
        return res.status(404).send({ message: "Reuested User not found" });
      }
      
      await User.findByIdAndUpdate(user._id, {
        $set: {
          password: await bcrypt.hash(newPassword, 12),
        },
      });
      return res.json({
        message: "Your Password is reset",
      });
    } catch (error) {
      console.log(`error`, error);
      return res.send(error);
    }
  },
};
