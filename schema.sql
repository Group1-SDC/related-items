DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

USE products;

CREATE TABLE products (

  id INT AUTO_INCREMENT PRIMARY KEY,
  title varchar(255),
  price DECIMAL,
  description varchar(255),
  category varchar(255),
  image varchar(2083)

);