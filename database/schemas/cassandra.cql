DROP KEYSPACE IF EXISTS relateditems;

CREATE KEYSPACE relateditems WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 3
}

USE relateditems;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS relations

CREATE TABLE products (
  id int PRIMARY KEY,
  title text,
  price float,
  description text,
  category text,
  image text
)
CREATE TABLE relations (
  id int,
  listing_id int,
  related_listing int,
  PRIMARY KEY (
    listing_id, related_listing
  )
)

COPY RELATIONS (id, listing_id, related_listing) FROM  '/Users/matthewcrawford/Documents/HRSEA-13/SDC/related-items/relations.csv' WITH HEADER = TRUE AND CHUNKSIZE = 2500;
COPY PRODUCTS (id, title, price, description, category, image, relations) FROM ‘/Users/matthewcrawford/Documents/HRSEA-13/SDC/related-items/products.csv’ WITH HEADER = TRUE;