USE bamazon;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing, Shoes & Jewelry", 300),
("Electronics", 300),
("Books & Audible", 80),
("Sports & Outdoors", 1500);
