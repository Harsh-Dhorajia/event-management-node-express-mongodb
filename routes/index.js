const express = require("express");
const userRoutes = require("./user");
// const eventRoutes = require("./event");

const router = express.Router();

router.use("/user", userRoutes);
// router.use("/event", eventRoutes);

module.exports = router;
