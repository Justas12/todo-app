const express = require("express");
const todosRouter = require("./routes");
const mongoose = require("mongoose");
const createTodo = require("../db/todoModel").createTodo;

const app = express();
const port = process.env.PORT || 3000;
const DB_URI = "mongodb://db:27017/todo-app";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/todos", todosRouter);
app.get("/", (req, res) => {
  res.send("To view todos, please visit /todos");
});

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const todo = createTodo({
      text: "todo1",
      due: Date.now()
    });
    todo.save(err => {
      if (err) {
        console.log(`DB Error: ${err.message}`);
        return;
      }
    });
    console.log("APP IS RUNNING!");
    app.listen(port, () =>
      console.log(`Listening on http://127.0.0.1:${port}`)
    );
  })
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
