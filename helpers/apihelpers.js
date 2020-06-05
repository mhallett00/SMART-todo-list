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
    return Promise.resolve(categoryId);
  });
};

module.exports = { apiSorter };
