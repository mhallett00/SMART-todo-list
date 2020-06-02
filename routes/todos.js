const express = require('express');
const router  = express.Router();
const { apiBook } = require('./api');

module.exports = (dbhelpers) => {

  router.get("/", (req, res) => {
    dbhelpers.getTodos(req.session.user_id)
    .then(todos => res.json({ todos }))
    .catch(err => {
      res
        .status(500)
        .json( { error: err.message });
    })
  });

  // posting new item to database
  // 1. converting username to userID (line 23)
  // 2. ping API and RETURN category_id based on result
  //   a. if (req.body.length > 0) {RETURN x}
  // 3. take userID, catID, req.body -> use SQL to insert into databse

  // adds item when form is submitted
  router.post('/', async (req, res) => {
    const userId = await dbhelpers.getIdWithUsername(req.session.user_id);
    // console.log({...req.body, user_id: userId})
    // const categoryId = await apiBook(callback, req.body)
    // console.log(categoryId);
    dbhelpers.addTodo({...req.body, user_id: userId})
      .then(todo => {
        res.send(todo);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};


