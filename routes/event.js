const express = require("express");
const { create } = require("../controllers/EventController");
const router = express.Router();

router.route("/create").post(create);

module.exports = router;
