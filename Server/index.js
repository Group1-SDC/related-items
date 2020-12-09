const express = require('express')
const app = express()
const port = 3003
const db = require('../database')
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:product_id', express.static('public'));

app.get('/api/data', (req, res) => {
  db.getAllProducts(function (err, results) {
    if (err) {
      console.log(err)
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})