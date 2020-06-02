const request = require('request-promise-native');


const apiBook = function(callback, title) {
  const url = `https://www.googleapis.com/books/v1/volumes?intitle:"${title}"``key``=AIzaAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo`
  request(url, (error, response, body) => {
    if (error) return callback("Invalid IP URL", null);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} en fetching IP: ${body}`), null);
      return;
    }
    const books = JSON.parse(body);
    return books.totalItems;
    // callback(null, books);
  });
};

const apiRestaurant = function(callback, name) {
  const apiKey = "pud2EC91z6vLKUlqwQZWKTapXz-zNnSIRg1CbbxRAEuQBhKlFZGuqUCaVHDc9dGxDT78s8F892PatU_yRI2fZmqbeFQp16zSdBUsWDLKY31XDWPvHBDDM0UG5XbWXnYx";
  const url = { url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=toronto`, headers: { "Authorization": "Bearer " + apiKey } }
  request(url, (error, response, body) => {
    if (error) return callback("Invalid IP URL", null);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} en fetching IP: ${body}`), null);
      return;
    }
    const restaurants = JSON.parse(body);
    console.log(restaurants.businesses.length);
    // return books.totalItems;
    // callback(null, books);
  });
};

// key: pud2EC91z6vLKUlqwQZWKTapXz-zNnSIRg1CbbxRAEuQBhKlFZGuqUCaVHDc9dGxDT78s8F892PatU_yRI2fZmqbeFQp16zSdBUsWDLKY31XDWPvHBDDM0UG5XbWXnYx

const apiFilmShow = function(callback, title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=4432dfaa`
  request(url, (error, response, body) => {
    if (error) return callback("Invalid IP URL", null);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} en fetching IP: ${body}`), null);
      return;
    }
    const filmShow = JSON.parse(body);
    console.log(filmShow.Response);
    // callback(null, books);
  });
};

const apiProduct = function(callback, name) {
const appID = 'QTVQHV-XVVUL6LT8G';
const url = `http://api.wolframalpha.com/v2/query?appid=QTVQHV-XVVUL6LT8G&input=${name}&output=json`;
request(url, (error, response, body) => {
  if (error) return callback("Invalid IP URL", null);
  if (response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} en fetching IP: ${body}`), null);
    return;
  }
  const product = JSON.parse(body);
  // console.log(product);
  console.log(product.queryresult.datatypes);

  // return books.totalItems;
  // callback(null, books);
});
};

apiProduct();

module.exports = { apiBook, apiRestaurant, apiFilmShow, apiProduct };


// String.includes(ConsumerProductsPTE)
// apiRestaurant();
  // After you have an API key, your application can append the query parameter key=yourAPIKey to all request URLs.

  // The API key is safe for embedding in URLs; it doesn't need any encoding.

  // key: AIzaSyAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo

  // https://www.googleapis.com/books/v1/volumes?q=flowers+intitle:keyes&`key`=AIzaSyAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo

  // returns a JSON object. can like use retunedObject.items.length?

  // Use this key in your application by passing it with key=API_KEY parameter.

  //
  // return router;


