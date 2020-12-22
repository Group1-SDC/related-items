// This file creates 16 related items for each of the 10 million products, for a total of 160 million rows of data output to a CSV file
// See a sample of this data in samplerelations.csv
// Run this file with the command 'node dataGeneratorRelations.js' while in the root directory of this project -- THIS DATA GENERATION MAY TAKE A WHILE

const fs = require('fs');
const writeRelations = fs.createWriteStream('/Users/matthewcrawford/Documents/HRSEA-13/SDC/related-items/relations.csv');
writeRelations.write('id,listing_id,related_listing\n')

var writeNewRelationData = (writer, encoding, callback) => {
  let i = 10000000;
  let counter = 0;
  let counterListings = 0
  function write() {
    let ok = true;
    do {
      i -=1;
      counterListings += 1
      for (var j = 1; j <= 16; j++) {
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