const { image } = require('faker');
var faker = require('faker');

var products = [['id', 'title', 'price']];
var counter = 1;
for (var i = 0; i < 3; i++) {
  var productInfo = [];
  productInfo.push(counter);
  counter++;
  productInfo.push(faker.commerce.productName());
  productInfo.push(faker.commerce.price());
  products.push(productInfo)
}

let csvContent = "data:text/csv;charset=utf-8," + products.map((product) => product.join(",")).join("\n");

var encodedUri = encodeURI(csvContent);