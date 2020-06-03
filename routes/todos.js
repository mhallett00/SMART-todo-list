const express = require('express');
const router  = express.Router();
const { apiSorter } = require('../helpers/apihelpers');

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
    // const categoryId = await apiSorter(req.body);
    // dbhelpers.addTodo({...req.body, user_id: userId, category_id: categoryId})
    //     .then(todo => {
    //       res.send(todo);
    //     })
    //     .catch(e => {
    //       console.error(e);
    //       res.send(e)
    //     });
    console.log(req.body.name);
    apiSorter(req.body.name, result => {
      dbhelpers.addTodo({...req.body, user_id: userId, category_id: result})
        .then(todo => {
          res.send(todo);
        })
        .catch(e => {
          console.error(e);
          res.send(e)
        });
    });
    // console.log(categoryId);
  });

  return router;
};


