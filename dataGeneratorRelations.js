const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// maybe switch to the fs method if this takes too long
const csvWriter = createCsvWriter({
  path: '/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/relations.csv',
  header: [
    {id: 'id', title: 'ID'},
    {id: 'listing_id', title: 'LISTING_ID'},
    {id: 'related_listing', title: 'RELATED_LISTING'}
  ]
});

var relationData = [];
var counter = 1;
for (var i = 1; i <= 10; i++) {
  //will change above loop from 10 to 10M
  for (var j = 1; j <= 16; j++) {
    //keep at 16 (or 12?)
    var relation = {
      id: counter,
      listing_id: i,
      related_listing: Math.ceil(Math.random() * 10)
      //Will need to change the above to 10M
    }
    relationData.push(relation)
    counter++
  }
}

csvWriter.writeRecords(relationData)
  .then(() => {
    console.log('CSV FILE FOR RELATIONS SUCCESSFULLY WRITTEN')
  })
  .catch(() => {
    console.log('ERROR WITH CSV FILE CREATION')
  })
// let csvContent = "data:text/csv;charset=utf-8," + products.map((product) => product.join(",")).join("\n");
// var encodedUri = encodeURI(csvContent);