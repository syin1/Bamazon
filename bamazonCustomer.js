var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  readProducts();
});

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

function checkQuantity(id, quantity) {
  connection.query(
    'SELECT stock_quantity FROM products where ?',
    {
      item_id: parseInt(id)
    },
    function(err, res) {
      if (err) throw err;

      if (parseInt(quantity) > res[0].stock_quantity) {
        console.log('Insufficient quantity!');
      } else {
        console.log('Execute purchase order...');
        // Call executePurchaseOrder AFTER checking there's sufficient quantity
        executePurchaseOrder(
          parseInt(id),
          parseInt(quantity),
          res[0].stock_quantity
        );
      }
    }
  );
}

function executePurchaseOrder(id, purchaseQuantity, stockQuantity) {
  connection.query(
    'update products set ? where ?',
    [
      {
        stock_quantity: stockQuantity - purchaseQuantity
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log('Your order went through!');
      // Call showPurchaseCost AFTER order goes through
      showPurchaseCost(id, purchaseQuantity);
    }
  );
}

function showPurchaseCost(id, quantity) {
  connection.query(
    'select price from products where ?',
    {
      item_id: id
    },
    function(err, res) {
      if (err) throw err;
      var total = (res[0].price * quantity).toFixed(2);
      console.log(`Your total purchase comes to $${total}`);
      connection.end();
    }
  );
}

// function createProduct() {
//   console.log('Inserting a new product...\n');
//   var query = connection.query(
//     'INSERT INTO products SET ?',
//     {
//       flavor: 'Rocky Road',
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + ' product inserted!\n');
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log('Updating all Rocky Road quantities...\n');
//   var query = connection.query(
//     'UPDATE products SET ? WHERE ?',
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: 'Rocky Road'
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + ' products updated!\n');
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log('Deleting all strawberry icecream...\n');
//   connection.query(
//     'DELETE FROM products WHERE ?',
//     {
//       flavor: 'strawberry'
//     },
//     function(err, res) {
//       console.log(res.affectedRows + ' products deleted!\n');
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

function readProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log(res);
    // Call promptUser AFTER readProducts completes
    promptUser();
  });
}
