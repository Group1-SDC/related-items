const { image } = require('faker');
var faker = require('faker');
var db = require('./database/index.js');
var products = []
var imageFilePath = 'https://ghrsea13-group2-fec.s3-us-west-2.amazonaws.com/'

for (var i = 0; i < 99; i++) {
    var product = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        image: imageFilePath+i+'.jpg'
    }
    products.push(product)
}

for (var product of products) {
    db.postAllProducts(product, function (err, products) {
        if (err) {
            console.log(err)
        }
    })
    console.log('posted to db')
}