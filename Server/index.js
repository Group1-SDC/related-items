require('newrelic');
const express = require('express')
const app = express()
const port = 3003
const db = require('../database')

app.use(express.static('public'));
app.use('/:product_id', express.static('public'));

app.get('/api/data/:product_id', (req, res) => {
  db.getProducts(req.params.product_id)
    .then(rows => res.send(rows))
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})