# Film
- **Movie Database API** (rapidapi.com)
- accesses IMDb data
- Two GET endpoints:
  - `Search:`
    - search movie/show by title
    - returns list of movies/shows
  - `ID` or `Title`
    - way more info

### Steps
1. Sign up for a RapidAPI user account (it’s free).
2. Navigate to the API pricing page and subscribe to a pricing plan. Hint: There’s a free tier that allows up to 1,000 requests per day.
3. Return to the IMDb API documentation & endpoints page.
4. Pick one of the IMDb API endpoints and select your preferred programming language (method of code) from the dropdown. The IMDb API can be used with Node.js, PHP, Python, Ruby, Objective-C, Java (Android), C# (.NET), and cURL.
5. Fill out all required parameters (and any optional parameters if you like).
6. Click “Test Endpoint” to test the API right in your browser.
7. Copy the “Request Snippet” and integrate right into your website or application.

### How to use with `Node.js`
1. Install `unirest npm module`
``` js
$ npm install unirest
```
2. Pick any IMDb API endpoint & select 'Node JS' under 'Request Snippet`
3. Copy snippet & make request
``` js
const unirest = require('unirest');

unirest.post(API_URL)
  .header('X-RapidAPI-Key', API_KEY)
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });
```
### How do you apply for an IMDb API key?
>After signing up for a free RapidAPI account and subscribing to a pricing plan on the IMDb pricing page (remember, there’s a free version), you’ll be automatically assigned an API key with your application.

# Books

## Google Books API
- https://developers.google.com/books/docs/v1/using
- Requests to Books API for public data must be accompanied by an identifier, which can be an `API key` or an `access token`
  - pretty sure we just need an `API key`
  - isntructions to get key in link above
-  `Volume IDs`: unique strings given to each volume Google Books knows about
- When viewing a particular volume on the site(books.google.com), you can find the volume ID in the id URL parameter. Here is an example:

> https://books.google.com/ebooks?`id=buc0AAAAMAAJ`&dq=holmes&as_brr=4&source=webstore_bookcard

### Performing a search
- send a GET request to following URI:
``` http
https://www.googleapis.com/books/v1/volumes?q=search+terms
```
- single required parameter:
  - `q` - search for volumes that contain this text string

Request example:

GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&`key`=yourAPIKey
 
# Restaurants

## Yelp Fusion API
- https://www.yelp.ca/developers/documentation/v3/business_search
- endpoint: `/business/search`
- access through yelp.ca or rapidapi.com (already using for films)

Request:
``` http
GET https://api.yelp.com/v3/businesses/search
```

Parameters:
| Name      | Type        | Description |
| ------------- |:-------------:| :-----|
| term     | string | Optional. Search term, for example "food" or "restaurants". The term may also be business names, such as "Starbucks". If term is not included the endpoint will default to searching across businesses from a small number of popular categories. |

# Products

## Amazon API vs Shopify API
- Amazon = way larger/more robust
- Shopify = Canadian!
