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

-- Create a b-tree index on listing_id (syntax for adding during create table does not exist)
-- -- Command: CREATE INDEX listing_id_index ON relations(listing_id)

-- To seed into DATABASE...(insert your own path)

COPY products (id, title, price, description, category, image) FROM '../../products.csv' DELIMITER ',' CSV HEADER;

COPY relations FROM '../../relations.csv' DELIMITER ',' CSV HEADER;