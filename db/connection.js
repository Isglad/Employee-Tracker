const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // MySQL username
  user: "root",
  // MySQL password
  password: "password",
  // MySQL database
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
