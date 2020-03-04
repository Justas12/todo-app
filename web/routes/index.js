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

router.post("/", (req, res) => {
  console.log(req.body);
  const todo = createTodo(req.body);
  if (todo) {
    todo
      .save(todo)
      .then(newTodo =>
        res.status(201).send(`successufully created object: ${id}`)
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
    res.status(400).send(`could not create object`);
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
        res.status(500).send('error saving data to database');
      }
    } else {
      res.status(200).send(`successufully updated object: ${id}`);
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
        res.status(500).send('error deleting data from database');
      }
    } else {
      res.status(200).send(`successufully deleted all objects!`);
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
        res.status(500).send('error deleting data from database');
      }
    } else {
      res.status(200).send(`successufully deleted object: ${id}`);
    }
  });
});

module.exports = router;
