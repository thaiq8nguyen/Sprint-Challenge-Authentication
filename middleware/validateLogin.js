const validator = require("validator");
const { findUserByUsername } = require("../auth/user-model");

const validateLogin = async (req, res, next) => {
  const { username, password } = req.body;

  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    res.status(400).json({
      error: true,
      message: "Invalid username and password combination."
    });
  }

  if (!validator.isEmpty(username)) {
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({
        error: true,
        message: "The username does not exist."
      });
    }
  }

  next();
};

module.exports = validateLogin;
