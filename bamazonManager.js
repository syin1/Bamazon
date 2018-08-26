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
      } else if (selected.inventoryOption === 'View Low Inventory') {
        viewLowInventory();
      } else if (selected.inventoryOption === 'Add to Inventory') {
        pickProduct();
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

// list all items with an inventory count lower than five
function viewLowInventory() {
  connection.query('SELECT * FROM products where stock_quantity < 5', function(
    err,
    res
  ) {
    if (err) throw err;

    if (res.length === 0) {
      console.log('No items with an inventory count lower than five');
    } else {
      console.log(res);
    }
    connection.end();
  });
}

// let manager pick which product, and in what quantity to add to inventory
function pickProduct() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    var products = [];
    for (var i = 0; i < res.length; i++) {
      products.push(res[i].product_name);
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'productToAdd',
          message: 'Here is a list of products to add to inventory:',
          choices: products
        },
        {
          type: 'input',
          name: 'quantityToAdd',
          message: 'How many units would you like to add to inventory?'
        }
      ])
      .then(function(selected) {
        console.log('you picked ' + selected.productToAdd);
        console.log('you added ' + selected.quantityToAdd);
        connection.end();
      });
  });
}

// add the desired product to inventory
function addToInventory() {}
