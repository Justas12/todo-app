const express = require("express");
const utils = require("../../utils");
const handlers = require("../../../db/handlers");

const router = express.Router();

router
  .route("/")
  .get(handlers.getTodos)
  .post(handlers.addTodo)
  .delete(handlers.deleteTodos)
  .all(utils.allowedMethods(["GET", "POST", "DELETE"]));

router
  .route("/:id")
  .get(handlers.getTodo)
  .put(handlers.replaceTodo)
  .patch(handlers.editTodo)
  .delete(handlers.deleteTodo)
  .all(utils.allowedMethods(["GET", "PUT", "PATCH", "DELETE"]));

module.exports = router;
