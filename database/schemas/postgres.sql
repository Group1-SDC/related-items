DROP DATABASE IF EXISTS relateditems;

CREATE DATABASE relateditems;

\c relateditems;

CREATE TABLE products (
  id integer primary key,
  title varchar(255),
  price money,
  description varchar(255),
  category varchar(255),
  image varchar(255)
);

CREATE TABLE relations (
  id integer primary key,
  listing_id integer,
  related_listing integer
);

-- create a b-tree index on listing_id (syntax for adding during create table does not exist)
-- To seed into DATABASE

COPY products (id, title, price, description, category, image) FROM '/Users/matthewcrawford/Documents/HRSEA-13/SDC/related-items/products.csv' DELIMITER ',' CSV HEADER;

COPY relations FROM '/Users/matthewcrawford/Documents/HRSEA-13/SDC/related-items/relations.csv' DELIMITER ',' CSV HEADER;