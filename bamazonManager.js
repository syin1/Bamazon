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
      } else if (selected.inventoryOption === 'Add New Product') {
        addNewProduct();
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
    var quantity = [];
    var id = [];
    for (var i = 0; i < res.length; i++) {
      products.push(res[i].product_name);
      quantity.push(res[i].stock_quantity);
      id.push(res[i].item_id);
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'productToAdd',
          message:
            'Here is a list of products to add to inventory, please pick one:',
          choices: products
        },
        {
          type: 'input',
          name: 'quantityToAdd',
          message: 'What quantity would you like to add to inventory?'
        }
      ])
      .then(function(selected) {
        index = products.indexOf(selected.productToAdd);

        addToInventory(
          id[index],
          parseInt(selected.quantityToAdd),
          quantity[index]
        );
      });
  });
}

// add the desired product and quantity to inventory
function addToInventory(id, quantityToAdd, existingQuantity) {
  if (existingQuantity === null) {
    existingQuantity = 0;
  }

  connection.query(
    'update products set ? where ?',
    [
      {
        stock_quantity: existingQuantity + quantityToAdd
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log('You added the product to inventory');
      connection.end();
    }
  );
}

// add new product to inventory
function addNewProduct() {
  // prompt for info about the new product to add
  inquirer
    .prompt([
      {
        name: 'newProduct',
        type: 'input',
        message: 'What is the new product you would like to add?'
      },
      {
        name: 'department',
        type: 'input',
        message: 'What department does this new product fall under?'
      },
      {
        name: 'price',
        type: 'input',
        message: "What's the selling price of this new product?"
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'What quantity would you like to add to stock?'
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO products SET ?',
        {
          product_name: answer.newProduct,
          department_name: answer.department,
          price: parseFloat(answer.price),
          stock_quantity: parseInt(answer.quantity)
        },
        function(err) {
          if (err) throw err;
          console.log('Your new product was added successfully!');
        }
      );
      connection.end();
    });
}
