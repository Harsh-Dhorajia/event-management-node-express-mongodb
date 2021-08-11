const User = require('../models/User');

module.exports = {
  async register(req, res) {
    console.log(`req.body`, req.body)
    let { name, email, password } = req.body;
    const user = await User.create({name, email, password});

    await user.save();
    console.log(`user`, user)
    return res.send(user);
  }
}