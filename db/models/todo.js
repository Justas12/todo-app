const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    due: Date
  },
  {
    versionKey: false
  }
);

const Todo = mongoose.model("todo", todoSchema, "Todo");
module.exports = { Todo };
