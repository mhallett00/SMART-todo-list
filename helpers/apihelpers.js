const { apiBook, apiRestaurant, apiFilmShow, apiProduct } = require('../routes/api');

const apiSorter = async function(formParam) {
  const encodedParam = encodeURI(formParam);
  const promises = [apiProduct(encodedParam), apiRestaurant(encodedParam), apiFilmShow(encodedParam), apiBook(encodedParam)];

  return Promise.all(promises).then(values => {
    console.log(values);
    let categoryId = 5;

    if (values[0]) {
      categoryId = 3;
    } else if (values[1]) {
      categoryId = 2;
    } else if (values[2]) {
      categoryId = 1;
    } else if (values[3]) {
      categoryId = 4;
    }

    // console.log('apisorter result', categoryId)
    // console.log('apisorter promise result', Promise.resolve(categoryId))
    return Promise.resolve(categoryId)
  });


//  console.log()
//   apiProduct(formParam, callback)
//     .then(result => {
//       console.log("then1prod:", result)
//       if (result) {
//         return callback(3);
//       } else {
//         return apiRestaurant(formParam)
//       }
//     })
//     .then(result => {
//       console.log("then2resto:", result)
//       if (result) {
//         return callback(2);
//       // } else if (result === undefined) {
//       //   return undefined;
//       } else {
//         return apiFilmShow(formParam)
//       }

//     })
//     .then(result => {
//       console.log("then3film:", result)
//       if (result) {
//         return callback(1);
//       } else {
//         return apiBook(formParam)
//       }
//     })
//     .then(result => {
//       console.log("then4book:", result)
//       if (result) {
//        return callback(4);
//       } else {
//         return callback(5);
//       }
//     })

// /*     const secondFunction = async () => {
//       const result = await firstFunction()
//       // do something else here after firstFunction completes
//     } */

//   // let result = await apiProduct(formParam)
//   // console.log('apiproduct', typeof result, result);
//   // if (result) {
//   //   return 3;
//   // }

//   // result = await apiRestaurant(formParam)
//   // console.log('apirestaruatn', typeof result, result);
//   // if (result) {
//   //   return 2;
//   // }
//   //   result = await apiFilmShow(formParam)
//   // console.log('apiFilmShow', typeof result, result);
//   // if (result) {
//   //   return 1;
//   // }
//   //   result = await apiBook(formParam)
//   // console.log('apiBook', typeof result, result);
//   // if (await result) {
//   //   return 4;
//   // }
//   //   return 5;

//   // result = await apiRestaurant(formParam)
//   // console.log('apirestaruatn', typeof result, result);
//   // if (result) {
//   //   return 2;
//   // }

//   // result = await apiFilmShow(formParam)
//   // console.log('apiFilmShow', typeof result, result);
//   // if (result) {
//   //   return 1;
//   // }

//   // result = await apiBook(formParam)
//   // console.log('apiBook', typeof result, result);
//   // if (await result) {
//   //   return 4;
//   // }

//   // return 5;
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
