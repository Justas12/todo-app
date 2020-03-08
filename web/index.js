const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "mongodb://db:27017/todo-app";

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(jsonParser);

app.use("/todos", routes.todosRouter);
app.use("/", routes.mainRouter);

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("APP IS RUNNING!");
    app.listen(port, () =>
      console.log(`Listening on http://127.0.0.1:${port}`)
    );
  })
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
