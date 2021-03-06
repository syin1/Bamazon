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
  readProducts();
});

// asking users what they would like to buy
function promptUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'user_item_id',
        message: "What's the ID of the product you would like to buy?"
      },
      {
        type: 'input',
        name: 'user_item_quantity',
        message: 'How many units would you like to buy?'
      }
    ])
    .then(function(purchase) {
      // Call checkQuantity AFTER getting purchase details from customer
      checkQuantity(purchase.user_item_id, purchase.user_item_quantity);
    });
}

// check if there are enough quantity in stock for purchase to go through
function checkQuantity(id, quantity) {
  connection.query(
    'SELECT stock_quantity, price, product_sales FROM products where ?',
    {
      item_id: parseInt(id)
    },
    function(err, res) {
      if (err) throw err;

      if (parseInt(quantity) > res[0].stock_quantity) {
        console.log('');
        console.log('Insufficient quantity!');
        console.log('');
        connection.end();
      } else {
        console.log('');
        console.log('Executing purchase order...');
        // Call executePurchaseOrder AFTER checking there's sufficient quantity
        executePurchaseOrder(
          parseInt(id),
          parseInt(quantity),
          res[0].stock_quantity,
          res[0].price,
          res[0].product_sales
        );
        console.log('');
      }
    }
  );
}

// execute customer's purchase order
function executePurchaseOrder(
  id,
  purchaseQuantity,
  stockQuantity,
  price,
  productSales
) {
  if (productSales === null) {
    productSales = 0;
  }

  var sales = (price * purchaseQuantity).toFixed(2);
  var cumulativeTotal = parseFloat(sales) + parseFloat(productSales);

  connection.query(
    'update products set ? where ?',
    [
      {
        stock_quantity: stockQuantity - purchaseQuantity,
        product_sales: parseFloat(sales) + parseFloat(productSales)
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log('Your order went through!');
      console.log(`Your total purchase comes to $${sales}`);
      console.log('');
      connection.end();
    }
  );
}

// displays the product catalogue
function readProducts() {
  connection.query(
    'SELECT item_id as ID, product_name as Product, department_name as Department, Price FROM products',
    function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log('');
      // Call promptUser AFTER readProducts completes
      promptUser();
    }
  );
}
