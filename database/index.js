// const mysql = require('mysql');
// const mysqlConfig = require('./config.js');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'matthewcrawford',
  host: 'localhost',
  database: 'relateditems',
  password: '',
  port: 5432
})

pool.connect();

// const connection = mysql.createConnection(mysqlConfig);


const getProducts = (id, callback) => {
  var query = `select products.id, products.title, products.price, products.description, products.category, products.image from products, relations where relations.listing_id = ${id} and products.id = relations.related_listing;`
  pool.query(query)
  .then((res) => {
    callback(res.rows)
  })
  .catch((err) => {
    console.log(err)
  })
}


// const getAllProducts = function (callback) {
//   var query = 'select * from products';
//   connection.query(query, function (err, results) {
//     if (err) {
//       console.log(err)
//     }
//     callback(err, results);
//   });
// }

// const postAllProducts = function (product, callback) {
//   const params = [product.title, product.price, product.description, product.category, product.image]
//   var query = `INSERT INTO products (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)`
//   connection.query(query, function (err, results) {
//     if (err) {
//       console.log(err)
//     }
//     callback(err, results)
//   })
// }

module.exports = {
  getProducts
};

