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
          .json({ error: err.message });
      });
  });

  // adds item when form is submitted
  router.post('/', async(req, res) => {
    const userId = await dbhelpers.getIdWithUsername(req.session.user_id);

    apiSorter(req.body.name).then(categoryId => {
      dbhelpers.addTodo({...req.body, user_id: userId, category_id: categoryId})
        .then(todo => {
          res.send(todo);
        })
        .catch(e => {
          console.error(e);
          res.send(e);
        });
    });

  });

  router.post('/edit', async(req, res) => {
    const userId = await dbhelpers.getIdWithUsername(req.session.user_id);

    dbhelpers.updateTodo({...req.body, user_id: userId})
      .then(todo => {
        res.send(todo);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post('/status', async(req, res) => {
    const userId = await dbhelpers.getIdWithUsername(req.session.user_id);

    dbhelpers.editStatusToDo({...req.body, user_id: userId})
      .then(todo => {
        res.send(todo);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};


