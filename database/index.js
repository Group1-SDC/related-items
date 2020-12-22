const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: process.env.VAR1,
  database: process.env.VAR2,
  password: process.env.VAR3,
  port: 5432
})

pool.connect();

const getProducts = (id, callback) => {
  var query = `select products.id, products.title, products.price, products.description, products.category, products.image from products, relations where relations.listing_id = ${id} and products.id = relations.related_listing;`;
  return pool.query(query)
    .then(({rows}) => {
      return rows
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getProducts
};

