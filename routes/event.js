const express = require("express");
const EventController = require("../controllers/EventController");
const validation = require('../middlewares/validation');
const eventValidation = require('../utils/validations/eventValidation')
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.route("/create").post(authenticate, validation(eventValidation.create), EventController.create);
router.route("/invite-user/:eventId").put(authenticate, validation(eventValidation.inviteUser), EventController.inviteUser);
router.route("/guests/paginate/:eventId").get(authenticate, EventController.getInvitedUsers);
router.route("/paginate").post(authenticate, EventController.paginate);
router.route("/update/:eventId").put(authenticate, validation(eventValidation.create), EventController.updateEvent);

module.exports = router;
