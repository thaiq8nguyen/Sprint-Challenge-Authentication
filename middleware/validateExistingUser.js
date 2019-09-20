const { findUserByUsername } = require("../auth/user-model");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await findUserByUsername(username);

    if (!user) {
      next();
    } else {
      res
        .status(400)
        .json({ error: true, message: "The user is already existed" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: true, message: "Unable to register new user" });
  }
};
