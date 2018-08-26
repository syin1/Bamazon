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
  showOptions();
});

// list a set of menu options for managing inventories
function showOptions() {
  inquirer
    .prompt({
      type: 'list',
      name: 'inventoryOption',
      message: 'Here is a list of inventory options:',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]
    })
    .then(function(selected) {
      if (selected.inventoryOption === 'View Products for Sale') {
        viewProducts();
      }
    });
}

// list every available item: the item IDs, names, prices, and quantities
function viewProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
