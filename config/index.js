const config = {
  requestRateLimit: {
    windowMs: 1000 * 60 * 15,
    max: 180,
    message: "Too many requests"
  },
  secrets: {
    jwt: " iloveJavaScript!",
    jwtExp: "1h"
  }
};

module.exports = config;
