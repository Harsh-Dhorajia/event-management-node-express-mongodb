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
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});


module.exports = mongoose.model("Event", EventSchema);
