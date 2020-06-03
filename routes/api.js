const request = require('request-promise-native');


const apiBook = function(title) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
  request(url).then((body) => {
    // console.log(body);
    const books = JSON.parse(body);
    console.log('api.jsbooks', books.totalItems > 0, books.totalItems)
    return books.totalItems > 0;
  });
};

// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo

// https://www.googleapis.com/books/v1/volumes?intitle:"americanbornchinese"&key=AIzaAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo

const apiRestaurant = function(name) {
  const apiKey = "pud2EC91z6vLKUlqwQZWKTapXz-zNnSIRg1CbbxRAEuQBhKlFZGuqUCaVHDc9dGxDT78s8F892PatU_yRI2fZmqbeFQp16zSdBUsWDLKY31XDWPvHBDDM0UG5XbWXnYx";
  const url = { url: `https://api.yelp.com/v3/businesses/search?term=${name}&location=toronto`, headers: { "Authorization": "Bearer " + apiKey } }
  request(url).then((body) => {
    const restaurants = JSON.parse(body);
    console.log('api.jsrestaurant', restaurants.businesses.length > 0, restaurants.businesses.length)
    return restaurants.businesses.length > 0;
  });
};

const apiFilmShow = function(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=4432dfaa`
  return request(url).then((body) => {
    const filmShow = JSON.parse(body);
    console.log('api.jsshow', filmShow.Response === "True", filmShow.Response)
    return filmShow.Response === "True";
  });
};

const apiProduct = function(name) {
  const url = `http://api.wolframalpha.com/v2/query?appid=QTVQHV-XVVUL6LT8G&input=${name}&output=json`;
  return request(url).then((body) => {
    const product = JSON.parse(body);
    console.log('api.jsproduct', product.queryresult.datatypes === 'ConsumerProductsPTE', product.queryresult.datatypes)
    return product.queryresult.datatypes === 'ConsumerProductsPTE';
  }); // .catch(function())
};

// apiBook();

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

  // if (error) return callback("Invalid IP URL", null);
  //   if (response.statusCode !== 200) {
  //     callback(Error(`Status Code ${response.statusCode} en fetching IP: ${body}`), null);
  //     return;
  //   }
