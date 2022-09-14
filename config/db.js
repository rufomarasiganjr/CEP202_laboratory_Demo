var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cpe202_lab7_demo',
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('MYSQL Databse is Running Connected');
  }
});

module.exports = connection;
