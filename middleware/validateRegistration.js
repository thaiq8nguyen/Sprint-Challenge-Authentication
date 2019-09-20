const validator = require("validator");

const validateRegistration = (req, res, next) => {
  const { username, password } = req.body;

  if (validator.isAlpha(username) && validator.isAlpha(password)) {
    next();
  } else {
    res.status(400).json("Invalid user and password combination.");
  }
};
module.exports = validateRegistration;
