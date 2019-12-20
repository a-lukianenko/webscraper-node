const fs = require('fs');
const fetch = require('node-fetch');
const helper = require('./helper');

const writeCSV = require('./writeCSV');

const urls = [
  // iPhone XS Max 64 Gb
  'https://www.hepsiburada.com/apple-iphone-xs-max-64-gb-apple-turkiye-garantili-p-HBV00000E8OSS?magaza=ceptelefonuonline',

  // iPhone XR 64 Gb
  'https://www.hepsiburada.com/apple-iphone-xr-64-gb-apple-turkiye-garantili-p-HBV00000E8OT0',

  // iPhone 8 Plus 64 Gb
  'https://www.hepsiburada.com/apple-iphone-8-plus-64-gb-apple-turkiye-garantili-p-HBV000007PV9M'
];

async function fetchProducts(products) {
  const productsPromise = products.map(p => helper(p));
  Promise.all(productsPromise).then(arr => {
    writeCSV(...arr);
  });
}

fetchProducts(urls);
