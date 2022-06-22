const config = require("config-yml");
const jwt = require("jsonwebtoken");

const token = (ID, Email, Username, Name) => jwt.sign(
  { id: ID,
    email: Email,
    username:Username,
    name: Name
  },
  config.jwtkey,
  {
    expiresIn: "720h",
  }
);

module.exports = {token};