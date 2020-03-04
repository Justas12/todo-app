const express = require("express");
const Todo = require("../../db/todoModel").Todo;
const createTodo = require("../../db/todoModel").createTodo;

const router = express.Router();

router.get("/", (req, res) => {
  Todo.find()
    .then(todos => res.status(200).send(todos))
    .catch(rr => res.status(400).send(err.message));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(todo);
    }
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const todo = createTodo(req.body);
  if (todo) {
    todo
      .save(todo)
      .then(newTodo =>
        res.status(200).send(`successufully created object: ${id}`)
      )
      .catch(err => res.status(400).send(err));
  }
  else {
    res.status(400).send(`could not create object`);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, (err, todo) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(`successufully updated object: ${id}`);
    }
  });
});

router.delete("/", (req, res) => {
  Todo.deleteMany({}, (err, todo) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(`successufully deleted all objects!`);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(`successufully deleted object: ${id}`);
    }
  });
});

module.exports = router;
