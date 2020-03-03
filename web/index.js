const express = require("express");
const todosRouter = require("./routes");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const DB_URI = "mongodb://mongo:27017/todo-app";

app.use("/todos", todosRouter);
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("To view todos, please visit /todos");
});

mongoose.connect(DB_URI).then(() => {
  console.log("APP IS RUNNING");
  app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
});