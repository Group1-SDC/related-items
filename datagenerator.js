// const faker = require('faker');
// const fs = require('fs');
// const imagePath = 'https://related-items-pictures.s3-us-west-2.amazonaws.com/images/'

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// // maybe switch to the fs method if this takes too long
// const csvWriter = createCsvWriter({
//   path: '/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/products.csv',
//   header: [
//     {id: 'id', title: 'ID'},
//     {id: 'title', title: 'TITLE'},
//     {id: 'price', title: 'PRICE'},
//     {id: 'description', title: 'DESCRIPTION'},
//     {id: 'category', title: 'CATEGORY'},
//     {id: 'image', title: 'IMAGE'}
//   ]
// });

// var products = [];
// for (var i = 1; i <= 1000; i++) {
//   // could do this model with async await
//   //will need to change the above to 10M
//   var product = {
//     id: i,
//     title: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     description: faker.commerce.productDescription(),
//     category: faker.commerce.department(),
//     image: imagePath + Math.floor(Math.random() * 1000)  + '.jpg'
//   }
//   products.push(product)
// }

// csvWriter.writeRecords(products)
//   .then(() => {
//     console.log('CSV FILE SUCCESSFULLY WRITTEN')
//   })
//   .catch(() => {
//     console.log('ERROR WITH CSV FILE CREATION')
//   })
// let csvContent = "data:text/csv;charset=utf-8," + products.map((product) => product.join(",")).join("\n");
// var encodedUri = encodeURI(csvContent);

const faker = require('faker');
const fs = require('fs');
const imagePath = 'https://related-items-pictures.s3-us-west-2.amazonaws.com/images/'
const writeProducts = fs.createWriteStream('/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/products.csv');
writeProducts.write('id,title,price,description,category,image\n');

var writeNewProducts = (writer, encoding, callback) => {
  let i = 1000;
  // will need to change the above to 10M
  let idnum = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      idnum += 1;
      const id = idnum;
      const title = faker.commerce.productName();
      const price = faker.commerce.price();
      const description = faker.commerce.productDescription();
      const category = faker.commerce.department();
      const image = imagePath + Math.floor(Math.random() * 1000)  + '.jpg';
      const data = `${id},${title},${price},"${description}",${category},${image}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

writeNewProducts(writeProducts, 'utf-8', () => {
  writeProducts.end();
})