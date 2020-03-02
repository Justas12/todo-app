const express = require("express");
const Todo = require("../../db/todoModel").Todo;

const router = express.Router();

router.get("/", (req, res) => {
  if (Todo) {
    Todo.find()
      .then(todos => res.status(200).send(todos))
      .catch(rr => res.status(400).send(err));
  }
  res.send("todos");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.find({ _id: id })
    .then(todos => res.status(200))
    .send(todos)
    .catch(err => res.status(400).send(err));
});

router.post("/", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    due: req.body.due || undefined
  });
  todo
    .save(todo)
    .then(newTodo => res.status(200).send(newTodo))
    .catch(err => res.status(400).send(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete({ _id: id })
    .then(deletedOrder => res.status(200).send(deletedOrder))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
