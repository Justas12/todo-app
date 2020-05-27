const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const soap = require("soap");
const soapHandlers = require("../db/handlers/soap");

const app = express();

const port = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "mongodb://db:27017/todo-app";

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(jsonParser);

app.use("/todos", routes.todosRouter);
app.use("/", routes.mainRouter);

var service = {
  TodoService: {
    TodoServiceSoapPort: {
      GetTodo: soapHandlers.getTodo,
      AddTodo: soapHandlers.addTodo,
      DeleteTodo: soapHandlers.deleteTodo,
      UpdateTodo: soapHandlers.updateTodo,
    },
  },
};

var xml = fs.readFileSync("service.wsdl", "utf8");

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("APP IS RUNNING!");
    app.listen(port, () => {
      console.log(`Listening on http://127.0.0.1:${port}`);
      soap.listen(app, "/wsdl", service, xml, () => {
        console.log("server initialized!");
      });
      }
    );
  })
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
