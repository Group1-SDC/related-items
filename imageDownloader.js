const fs = require('fs');
const axios = require('axios');
const path = require('path');

const PATH = path.join(__dirname);
const url = 'https://loremflickr.com/276/276/sports'

let padNum = (number, size) => {
  let result = "000" + number;
  return result.substr(-size);
}

let getImage = (fileName) => {
  let WRITE_PATH = path.join(PATH, "images", fileName + ".jpg");
  axios.get(url, {responseType: "stream"})
  .then((response) => {
    stream = response.data;
    return stream.pipe(fs.createWriteStream(WRITE_PATH));
  })
  .catch((err) => console.log(err))
};

let downloadImages = (times) => {

  let timer = 0;

  for (let counter = 0; counter < times; counter++) {
    let fileName = counter;
    setTimeout(() => getImage(fileName), timer);
    timer += 150;
  }
}

downloadImages(1000);