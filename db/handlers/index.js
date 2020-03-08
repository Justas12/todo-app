const Todo = require("../models/todo").Todo;

exports.getTodos = (req, res) => {
  Todo.find((err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("not found");
    }
  });
};

exports.addTodo = (req, res) => {
  const todo = new Todo(req.body);
  todo.save((err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (result) {
      res.set("Location", "localhost/todos/".concat(result._id));
      res.status(201).send(`successufully saved object: ${result}`);
    } else {
      res.status(400).send("bad request");
    }
  });
};

exports.deleteTodos = (req, res) => {
  Todo.deleteMany({}, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (result.deletedCount > 0) {
      res.status(200).send(`successufully deleted objects`);
    } else {
      res.status(404).send("not found");
    }
  });
};

exports.getTodo = (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("not found");
    }
  });
};

const update = (id, fields, res) => {
  Todo.updateOne({ _id: id }, { $set: fields }, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (result.ok === 1) {
      res.status(200).send(`successufully updated object`);
    } else {
      res.status(400).send("could not update object");
    }
  });
};

exports.editTodo = (req, res) => {
  const id = req.params.id;
  const fields = req.query;
  if (Object.keys(fields).length === 0) {
    Todo.findById(id, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (result) {
        update(id, { completed: !result.completed }, res);
      } else {
        res.status(404).send("not found");
      }
    });
  } else {
    update(id, fields, res);
  }
};

exports.replaceTodo = (req, res) => {
  const id = req.params.id;
  const fields = req.body;
  if (fields.text) {
    Todo.replaceOne({ _id: id }, fields, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (result.ok === 1) {
        res.status(200).send(`successufully replaced object`);
      } else {
        res.status(400).send("could not replace object");
      }
    });
  } else {
    res.status(400).send("'text' property is missing");
  }
};

exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (result) {
      res.status(200).send(`successufully deleted object: ${result}`);
    } else {
      res.status(404).send("not found");
    }
  });
};
