const express = require("express");
const Todo = require("../../db/todoModel").Todo;
const createTodo = require("../../db/todoModel").createTodo;
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", (req, res) => {
  Todo.find()
    .then(todos => {
      if (todos) {
        res.status(200).send(todos);
      }
      else {
        res.status(404).send('not found');
      }
    })
    .catch(err => {
      if (err.message instanceof mongoose.Error.CastError) {
        res.status(400).send('bad request');
      }
      else {
        res.status(500).send('error fetching data from database');
      }
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(todo => {
      if (todo) {
        res.status(200).send(todo);
      }
    })
    .catch(err => {
      if (err.message instanceof mongoose.Error.CastError) {
        res.status(400).send('bad request');
      }
      else {
        res.status(404).send('not found');
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
        res.status(201).send(`successufully created object: ${todo}`)
      )
      .catch(err => {
        if (err.message instanceof mongoose.Error.CastError) {
          res.status(400).send('bad request');
        }
        else {
          res.status(500).send('error saving data to database');
        }
      });
  }
  else {
    res.status(400).send(`could not create object: 'text' property is missing`);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, (err, todo) => {
    if (err) {
      if (err.message instanceof mongoose.Error.CastError) {
        res.status(400).send('bad request');
      }
      else {
        res.status(404).send('not found');
      }
    } else {
      res.status(200).send(`successufully updated object: ${todo}`);
    }
  });
});

router.delete("/", (req, res) => {
  Todo.deleteMany({}, (err, todo) => {
    if (err) {
      if (err.message instanceof mongoose.Error.CastError) {
        res.status(400).send('bad request');
      }
      else {
        res.status(404).send('not found');
      }
    } else {
      if (todo) {
        res.status(200).send(`successufully deleted all objects!`);
      }
      else {
        res.status(404).send('no objects found');
      }
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err) {
      if (err.message instanceof mongoose.Error.CastError) {
        res.status(400).send('bad request');
      }
      else {
        res.status(404).send('not found');
      }
    } else {
      if (todo) {
        res.status(200).send(`successufully deleted object: ${todo}`);
      }
      else {
        res.status(404).send('not found');
      }
    }
  });
});

router.all((req, res, next) => res.status(405).send('Method Not Allowed'));

module.exports = router;
