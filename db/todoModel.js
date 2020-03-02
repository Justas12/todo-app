const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  id: Number,
  text: String,
  completed: Boolean,
  due: Date
});

const Todo = mongoose.model("todo", todoSchema);
module.exports = { Todo };
