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

const createTodo = details => {
	if(details.text) {
		return new Todo({ ...details, completed: false });
	} else {
		return undefined;
	}
}

const Todo = mongoose.model("todo", todoSchema);
module.exports = { Todo, createTodo };
