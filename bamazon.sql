DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Casual Sneaker", "Clothing, Shoes & Jewelry", 20.50, 1000, 20.50),
("Long-Sleeve Solid Oxford Shirt", "Clothing, Shoes & Jewelry", 45.50, 1000, 45.50),
("Diamond-Accent Heart Locket Necklace", "Clothing, Shoes & Jewelry", 1999.50, 50, 1999.50),
("iMac Pro", "Electronics", 6299, 1000, 0),
("Bose QuietComfort 35 Wireless Headphone", "Electronics", 399, 500, 399),
("Canon TS3127 Wireless Color Photo Printer", "Electronics", 39.99, 300, 39.99),
("The Intelligent Investor", "Books & Audible", 32.98, 200, 32.98),
("Mao: The Unknown Story", "Books & Audible", 25.99, 300, 25.99),
("The Grand Design", "Books & Audible", 27.95, 500, 27.95),
("12-Piece Men's Golf Set", "Sports & Outdoors", 285.99, 100, 285.99),
("Fitbit Ionic Smartwatch", "Sports & Outdoors", 329.95, 300, 329.95),
("SOLE Fitness F80 Folding Treadmill Machine", "Sports & Outdoors", 2049.99, 40, 2049.99);

