// const express = require('express');
// const router  = express.Router();
const request = require('request');

// module.exports = (dbhelpers) => {

  const ApiBook = function(callback) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=americanbornchineseagasdjksdfgjndfgf`key`=AIzaSyAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo'
    request(url, (error, response, body) => {
      if (error) return callback("Invalid IP URL", null);

      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
        return;
      }
      const ip = JSON.parse(body);
      console.log(ip.totalItems);
      // callback(null, ip);
    });
  };

  ApiBook();
  // After you have an API key, your application can append the query parameter key=yourAPIKey to all request URLs.

  // The API key is safe for embedding in URLs; it doesn't need any encoding.

  // key: AIzaSyAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo

  // https://www.googleapis.com/books/v1/volumes?q=flowers+intitle:keyes&`key`=AIzaSyAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo

  // returns a JSON object. can like use retunedObject.items.length?

  // Use this key in your application by passing it with key=API_KEY parameter.

  //
  // return router;
// };

