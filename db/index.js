const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
  });

connection.connect(err => {
    if(err) {
        console.error('error while connecting: '+err.stack);
        return process.exit(22);
    }
    console.log("connected as id " + connection.threadId);
})

exports.con = connection;