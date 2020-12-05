NEED SOMETHING ABOUT CREATING A KEYSPACE IF IT DOESN'T EXIST, AND USING IT

drop table if exist sampleproducts;

drop table if exists samplerelations;

create table sampleproducts (
  id int primary key,
  title text,
  price float,
  description text,
  category text,
  image text
)
create table samplerelations (
  id int,
  listing_id int,
  related_listing int,
  primary key (
    listing_id, related_listing
  )
)