const express = require('express');
const router  = express.Router();

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

  router.post('/', async (req, res) => {
    const userId = await dbhelpers.getIdWithUsername(req.session.user_id);
    console.log({...req.body, user_id: userId})
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


