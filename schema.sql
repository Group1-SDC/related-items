DROP DATABASE IF EXISTS products;
-- Names have been changed so that I don't accidentally delete my relateditems database
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

-- This file runs and works BUT DON'T RUN IT BECAUSE YOU WILL LOSE ALL DATA IN YOUR DATABASE!!!

COPY products (id, title, price, description, category, image) FROM '/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/products.csv' DELIMITER ',' CSV HEADER;

COPY relations FROM '/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/relations.csv' DELIMITER ',' CSV HEADER;