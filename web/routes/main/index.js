const express = require("express");
const utils = require("../../utils");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
	res.send("To view todos, please visit /todos");
  })
  .all(utils.allowedMethods(["GET"]));

router
  .route("/patients")
  .get((req, res) => {
		const rp = require("request-promise");
		var options = {
			method: "GET",
			uri: "http://patients:8080/api/v1/patients",
			json: true,
	  };
		rp(options)
		.then(function (data) {
		  res.status(200).send(data);
		})
		.catch(function (err) {
		  res.status(500).send(err);
		});
  })
  .all(utils.allowedMethods(["GET"]));

module.exports = router;
