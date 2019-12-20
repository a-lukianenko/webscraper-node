const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async url => {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const features = $('.data-list.tech-spec').eq(1);
  const obj = {};

  features.find('tr').each((i, el) => {
    const key = $(el)
      .find('th')
      .text();

    const value = $(el)
      .find('td')
      .text()
      .replace(/,/g, '.');

    obj[key] = value;
  });
  return obj;
};
