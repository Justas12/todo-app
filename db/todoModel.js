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

const createTodo = details => (details.text ? new Todo({ ...details, completed: false }): undefined);

const Todo = mongoose.model("todo", todoSchema);
module.exports = { Todo, createTodo };
