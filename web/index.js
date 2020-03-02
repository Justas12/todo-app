const express = require('express');
const bodyParser = require('body-parser');
const todosRouter = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/todos', todosRouter);
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('To view todos, please visit /todos');
})
app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
