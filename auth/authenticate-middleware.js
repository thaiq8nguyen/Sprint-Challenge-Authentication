/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  const token = req.token;

  jwt.verify(token, config.secrets.jwt, (error, token) => {
    if (error) {
      res.status(401).json({ you: "shall not pass!" });
    }
    next();
  });
};
