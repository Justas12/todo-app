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
    due: {
      type: Date,
      required: false
    },
    patient: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const Todo = mongoose.model("todo", todoSchema, "Todo");
module.exports = { Todo };
