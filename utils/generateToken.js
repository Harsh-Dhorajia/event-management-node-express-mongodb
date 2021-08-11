const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const { id } = user;
  return jwt.sign(
    {
      id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "12h",
    }
  );
};
module.exports = generateToken;
