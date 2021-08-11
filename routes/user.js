const express = require("express");
const AuthController = require("../controllers/AuthController");
const validation = require('../middlewares/validation');
const userValidation = require('../utils/validations/userValidation')

const router = express.Router();

router.route("/register").post(validation(userValidation.register), AuthController.register);
router.route("/login").post(validation(userValidation.login), AuthController.login);

module.exports = router;
