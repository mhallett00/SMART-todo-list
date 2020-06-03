const { apiBook, apiRestaurant, apiFilmShow, apiProduct } = require('../routes/api');

const apiSorter = async function(formParam, callback) {

  apiProduct(formParam, callback)
    .then(result => {
      console.log("then1prod:", result)
      if (result) {
        callback(3);
      } else {
        return apiRestaurant(formParam)
      }
    })
    .then(result => {
      console.log("then2resto:", result)
      if (result) {
        callback(2);
      // } else if (result === undefined) {
      //   return undefined;
      } else {
        return apiFilmShow(formParam)
      }

    })
    .then(result => {
      console.log("then3film:", result)
      if (result) {
        callback(1);
      } else {
        return apiBook(formParam)
      }
    })
    .then(result => {
      console.log("then4book:", result)
      if (result) {
       callback(4);
      } else {
        callback(5);
      }
    })

/*     const secondFunction = async () => {
      const result = await firstFunction()
      // do something else here after firstFunction completes
    } */

  // let result = await apiProduct(formParam)
  // console.log('apiproduct', typeof result, result);
  // if (result) {
  //   return 3;
  // }

  // result = await apiRestaurant(formParam)
  // console.log('apirestaruatn', typeof result, result);
  // if (result) {
  //   return 2;
  // }
  //   result = await apiFilmShow(formParam)
  // console.log('apiFilmShow', typeof result, result);
  // if (result) {
  //   return 1;
  // }
  //   result = await apiBook(formParam)
  // console.log('apiBook', typeof result, result);
  // if (await result) {
  //   return 4;
  // }
  //   return 5;

  // result = await apiRestaurant(formParam)
  // console.log('apirestaruatn', typeof result, result);
  // if (result) {
  //   return 2;
  // }

  // result = await apiFilmShow(formParam)
  // console.log('apiFilmShow', typeof result, result);
  // if (result) {
  //   return 1;
  // }

  // result = await apiBook(formParam)
  // console.log('apiBook', typeof result, result);
  // if (await result) {
  //   return 4;
  // }

  // return 5;
};

module.exports = { apiSorter };
// apiSorter('vitamix%20blender').then(console.log);

/* const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response } = JSON.parse(data)
      return response;
    });
}; */
