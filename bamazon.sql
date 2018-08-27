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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Casual Sneaker", "Clothing, Shoes & Jewelry", 20.50, 1000),
("Long-Sleeve Solid Oxford Shirt", "Clothing, Shoes & Jewelry", 45.50, 1000),
("Diamond-Accent Heart Locket Necklace", "Clothing, Shoes & Jewelry", 1999.50, 50),
("iMac Pro", "Electronics", 6299, 1000),
("Bose QuietComfort 35 Wireless Headphone", "Electronics", 399, 500),
("Canon TS3127 Wireless Color Photo Printer", "Electronics", 39.99, 300),
("The Intelligent Investor", "Books & Audible", 32.98, 200),
("Mao: The Unknown Story", "Books & Audible", 25.99, 300),
("The Grand Design", "Books & Audible", 27.95, 500),
("12-Piece Men's Golf Set", "Sports & Outdoors", 285.99, 100),
("Fitbit Ionic Smartwatch", "Sports & Outdoors", 329.95, 300),
("SOLE Fitness F80 Folding Treadmill Machine", "Sports & Outdoors", 2049.99, 40);

