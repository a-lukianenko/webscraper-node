const fs = require('fs');

// Unite unique features as keys of the 'final' object
function getFeatures(...objs) {
  const final = Object.assign({}, ...objs);
  for (obj of objs) {
    for (key in final) {
      let res = key in obj;
      if (!res) {
        obj[key] = 'N/A';  // if the product feature is absent, then 'N/A'
      }
    }
  }
  return final;
}

// loop through the product objects, write headers and features to .csv
function write(final, ...objs) {
  const keys = Object.keys(final);
  const writeStream = fs.createWriteStream('features.csv');
  let str = 'feature';
  for (let i = 1; i <= objs.length; i++) {
    str += `,product_${i}`;
  }
  writeStream.write(`${str} \n`);

  for (let key of keys) {
    let str = `${key}`;
    for (let obj of objs) {
      str += `,${obj[key]}`;
    }
    writeStream.write(`${str} \n`);
  }
}

function writeCSV(...objs) {
  write(getFeatures(...objs), ...objs);
}

module.exports = writeCSV;
