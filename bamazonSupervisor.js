var mysql = require('mysql');
var inquirer = require('inquirer');

// setting DB connection details
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

// connecting to mySQL DB
connection.connect(function(err) {
  if (err) throw err;
  showMethods();
});

// list options for displaying revenue and create new department
function showMethods() {
  inquirer
    .prompt({
      type: 'list',
      name: 'supervisorOption',
      message: 'Here is a list of options:',
      choices: ['View Product Sales by Department', 'Create New Department']
    })
    .then(function(selected) {
      if (selected.supervisorOption === 'View Product Sales by Department') {
        console.log('view product sales');
        connection.end();
      } else if (selected.supervisorOption === 'Create New Department') {
        console.log('create new department');
        connection.end();
      }
    });
}
