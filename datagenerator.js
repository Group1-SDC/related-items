const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// maybe switch to the fs method if this takes too long
const csvWriter = createCsvWriter({
  path: '/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/products.csv',
  header: [
    {id: 'id', title: 'ID'},
    {id: 'title', title: 'TITLE'},
    {id: 'price', title: 'PRICE'},
    {id: 'description', title: 'DESCRIPTION'},
    {id: 'category', title: 'CATEGORY'},
    {id: 'image', title: 'IMAGE'}
  ]
});

const imagePath = 'https://related-items-pictures.s3-us-west-2.amazonaws.com/images/'
var products = [];
for (var i = 1; i <= 1000; i++) {
  //will need to change the above to 10M
  var product = {
    id: i,
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: imagePath + Math.floor(Math.random() * 1000)  + '.jpg'
  }
  products.push(product)
}

csvWriter.writeRecords(products)
  .then(() => {
    console.log('CSV FILE SUCCESSFULLY WRITTEN')
  })
  .catch(() => {
    console.log('ERROR WITH CSV FILE CREATION')
  })
// let csvContent = "data:text/csv;charset=utf-8," + products.map((product) => product.join(",")).join("\n");
// var encodedUri = encodeURI(csvContent);