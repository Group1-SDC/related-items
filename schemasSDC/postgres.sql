DROP DATABASE IF EXISTS relateditems;

CREATE DATABASE relateditems;

USE relateditems;

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