const jwt = require("jsonwebtoken");

const { config } = require("./config");
require("dotenv/config");

const generateToken = (user) => {
  const maxAge = 1 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};

module.exports.generateToken = generateToken;
