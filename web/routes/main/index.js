const express = require("express");
const utils = require("../../utils");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("To view todos, please visit /todos");
  })
  .all(utils.allowedMethods(["GET"]));

module.exports = router;
