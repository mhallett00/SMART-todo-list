const request = require('request-promise-native');


const apiBook = function(title) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
  return request(url).then((body) => {
    const books = JSON.parse(body);
    if (books.items[0].volumeInfo.title) {
      return title === encodeURI(books.items[0].volumeInfo.title);
    }
  }).catch(error => false);
};

const apiRestaurant = function(name) {
  const apiKey = "pud2EC91z6vLKUlqwQZWKTapXz-zNnSIRg1CbbxRAEuQBhKlFZGuqUCaVHDc9dGxDT78s8F892PatU_yRI2fZmqbeFQp16zSdBUsWDLKY31XDWPvHBDDM0UG5XbWXnYx";
  const url = { url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=toronto&category='restaurants'`, headers: { "Authorization": "Bearer " + apiKey } };
  return request(url).then((body) => {
    const restaurants = JSON.parse(body);
    if (restaurants.businesses[0].name) {
      return name === encodeURI(restaurants.businesses[0].name);
    }
  }).catch(error => false);
};

const apiFilmShow = function(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=4432dfaa`;
  return request(url).then((body) => {
    const filmShow = JSON.parse(body);
    if (filmShow.Title) {
      return title === encodeURI(filmShow.Title);
    }
  }).catch(error => false);
};

const apiProduct = function(name) {
  const url = `http://api.wolframalpha.com/v2/query?appid=QTVQHV-XVVUL6LT8G&input=${name}&output=json`;
  return request(url).then((body) => {
    const product = JSON.parse(body);
    if (product.queryresult.datatypes) {
      return product.queryresult.datatypes === 'ConsumerProductsPTE' || product.queryresult.datatypes === 'ExpandedFood';
    }
  }).catch(error => false);
};

module.exports = { apiBook, apiRestaurant, apiFilmShow, apiProduct };

// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo
