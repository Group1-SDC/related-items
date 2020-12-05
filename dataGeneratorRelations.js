// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// // maybe switch to the fs method if this takes too long
// const csvWriter = createCsvWriter({
//   path: '/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/relations.csv',
//   header: [
//     {id: 'id', title: 'ID'},
//     {id: 'listing_id', title: 'LISTING_ID'},
//     {id: 'related_listing', title: 'RELATED_LISTING'}
//   ]
// });

// var relationData = [];
// var counter = 1;
// for (var i = 1; i <= 10; i++) {
//   //will change above loop from 10 to 10M
//   for (var j = 1; j <= 16; j++) {
//     //keep at 16 (or 12?)
//     var relation = {
//       id: counter,
//       listing_id: i,
//       related_listing: Math.ceil(Math.random() * 10)
//       //Will need to change the above to 10M
//     }
//     relationData.push(relation)
//     counter++
//   }
// }
// csvWriter.writeRecords(relationData)
//   .then(() => {
//     console.log('CSV FILE FOR RELATIONS SUCCESSFULLY WRITTEN')
//   })
//   .catch(() => {
//     console.log('ERROR WITH CSV FILE CREATION')
//   })

const fs = require('fs');
const writeRelations = fs.createWriteStream('/Users/matthewcrawford/Documents/HRSEA-13/FEC/related-items/relations.csv');
writeRelations.write('id,listing_id,related_listing\n')

var writeNewRelationData = (writer, encoding, callback) => {
  let i = 10;
  // will need to change above loop from 10 to 10M
  let counter = 0;
  // add counter listings and increment it how i gets incremented?
  let counterListings = 0
  function write() {
    let ok = true;
    do {
      i -=1;
      counterListings += 1
      for (var j = 1; j <= 16; j++) {
        // keep the above at 16 (or 12)
        counter += 1;
        const id = counter;
        const listing_id = counterListings;
        const related_listing = Math.ceil(Math.random() * 10000000);
        const data = `${id},${listing_id},${related_listing}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding)
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write)
    }
  }
  write()
}

writeNewRelationData(writeRelations, 'utf-8', () => {
  writeRelations.end();
})
