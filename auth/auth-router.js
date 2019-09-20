const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { createUser, findUserByUsername } = require("./user-model");
const validateExistingUser = require("../middleware/validateExistingUser");
const validateRegistration = require("../middleware/validateRegistration");
const validateLogin = require("../middleware/validateLogin");
const config = require("../config");

const createToken = data => {
  const i = "Management"; //Issuer
  const s = "management@staging.com"; //subject
  const a = "http://dev.com"; // audience

  const signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: config.secrets.jwtExp,
    algorithm: "HS256"
  };

  return jwt.sign(data, config.secrets.jwt, signOptions);
};

router.post(
  "/register",
  [validateExistingUser, validateRegistration],
  async (req, res) => {
    // implement registration
    const { username, password } = req.body;

    try {
      const user = await createUser({
        username,
        password: bcrypt.hashSync(password, 14)
      });

      const token = createToken(user);
      res.status(201).json({ error: false, message: "User created", token });
    } catch (e) {
      res
        .status(500)
        .json({ error: true, message: "Unable to register new user." });
    }
  }
);

router.post("/login", validateLogin, async (req, res) => {
  // implement login

  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken({ username: user.username });
      res.json({ error: false, token });
    } else {
      res.status(401).json({
        error: true,
        message: "Invalid username and password combination."
      });
    }
  } catch (e) {
    res.status(500).json({ error: true, message: "Unable to login." });
  }
});

module.exports = router;
