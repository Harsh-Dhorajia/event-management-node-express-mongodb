const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  createdBy: String
});


module.exports = mongoose.model("Event", EventSchema);
