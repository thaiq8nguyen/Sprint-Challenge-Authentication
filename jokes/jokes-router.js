const axios = require("axios");
const checkToken = require("../auth/checkToken");
const requiresLogin = require("../auth/authenticate-middleware");
const router = require("express").Router();

router.use(checkToken);
router.use(requiresLogin);

router.get("/", (req, res) => {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
});

module.exports = router;
