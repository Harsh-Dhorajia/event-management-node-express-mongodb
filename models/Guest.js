const mongoose = require("mongoose");

const GuestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    ref: "event",
  },
  invitedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Guest", GuestSchema);
