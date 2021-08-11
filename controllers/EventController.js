const Event = require("../models/Event");
const Guest = require("../models/Guest");
const User = require("../models/User");
const { pagination } = require("../utils/pagination");

module.exports = {
  async create(req, res) {
    try {
      const { _id, email } = req.user;
      const { name, description, date } = req.body;

      const event = await Event.create({
        name,
        description,
        date,
        createdBy: email,
        userId: _id,
      });
      return res.send(event);
    } catch (error) {
      console.log(`event`, event);
      return res.send(error);
    }
  },

  async inviteUser(req, res) {
    const { _id } = req.user;
    const { email } = req.body;
    try {
      const owner = await User.findById(_id);
      if (owner.email === email) {
        return res.json({
          message: "Email is same as your email. Please try another email",
        });
      }
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          message: "Please enter email who is registered user on the system",
        });
      }
      const event = await Event.findById(req.params.eventId);
      if (!event) {
        return res.json({ message: "Event not found" });
      }

      if (_id.toString() != event.userId.toString()) {
        return res.json({ message: "You are not allow to invite users" });
      }
      const userAlreadyInvited = await Guest.findOne({
        invitedBy: owner.email,
        eventId: req.params.eventId,
      });

      if (userAlreadyInvited) {
        return res.json({ message: "This email is already invited" });
      }
      const guest = await Guest.create({
        eventId: req.params.eventId,
        userId: user.id,
        invitedBy: owner.email,
      });
      return res.json({
        data: guest,
        message: "Invited Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Something went wrong" });
    }
  },

  async eventDetail(req, res) {
    try {
      // Get event detail with their invited users
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.json({ message: "Event not found" });

      res.json({ message: "Event details", data: event });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Something went wrong" });
    }
  },

  async getInvitedUsers(req, res) {
    try {
      const { _id } = req.user;
      const event = await Event.findOne({
        _id: req.params.eventId,
        userId: _id,
      });
      console.log(`object`, event);
      if (!event) {
        return res.json({ message: "Event not found" });
      }
      const guests = await Guest.find({ eventId: event._id }).populate({
        model: "User",
        path: "userId",
        select: ["email", "name"],
      });
      console.log(`guests`, guests);
      return res.json({ message: "Event details", data: guests });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Something went wrong" });
    }
  },

  async paginate(req, res) {
    try {
      // http://localhost:5000/api/event/getAllEvents?limit=4&page=1&search=eventName:Node for testing

      // Get event detail with their invited users
      const { searchOptions, limit, skip, sortOptions } = pagination(req);
      const events = await Event.find({
        ...searchOptions,
        userId: req.user._id,
      })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      res.json({ message: "All Events List", payload: events });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Something went wrong" });
    }
  },

  async updateEvent(req, res) {
    try {
      const { name, date, description } = req.body;
      const { _id } = req.user;
      const user = User.findById(_id);
      if (!user) return res.json({ message: "User not found" });

      const event = await Event.findById(req.params.eventId);
      if (!event) return res.json({ message: "Event not found" });

      if (event.userId.toString() !== _id.toString()) {
        return res.json({
          message: "Only event creators are allow to update the event details",
        });
      }

      const updatedEvent = await Event.findOneAndUpdate(
        {_id: req.params.eventId, },
        {
          name,
          description,
          date,
        },
        { multi: true }
      );
      return res.json({
        message: "Event updated successfully",
        data: updatedEvent,
      });
    } catch (error) {
      return res.json({ message: "Something went wrong" });
    }
  },
};
