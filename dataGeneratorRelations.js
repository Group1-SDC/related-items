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
