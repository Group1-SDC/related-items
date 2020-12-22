// This file creates 10 million products with associated data output to a CSV file
// See sampleproducts.csv for an example of this data
// Run this file with the command 'node datagenerator.js' while in the root directory of this project -- THIS DATA GENERATION MAY TAKE A WHILE

const faker = require('faker');
const fs = require('fs');
const imagePath = 'https://related-items-pictures.s3-us-west-2.amazonaws.com/images/'
const writeProducts = fs.createWriteStream('/Users/matthewcrawford/Documents/HRSEA-13/SDC/related-items/products.csv');
writeProducts.write('id,title,price,description,category,image\n');

var writeNewProducts = (writer, encoding, callback) => {
  let i = 10000000;
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