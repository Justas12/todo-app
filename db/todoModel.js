const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: String,
    completed: Boolean,
    due: Date
  },
  {
    versionKey: false
  }
);

const createTodo = details => new Todo({ ...details, completed: false });

const Todo = mongoose.model("todo", todoSchema);
module.exports = { Todo, createTodo };
