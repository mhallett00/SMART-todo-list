const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT to_dos.*
    FROM to_dos
    JOIN users ON user_id = users.id
    WHERE users.name = '${req.session.user_id}'
    `;
    db.query(query)
    .then(data => {
      const to_dos = data.rows;
      res.json({ to_dos })
    })
    .catch(err => {
      res
        .status(500)
        .json( { error: err.message });
    })
  })
  return router;
}



/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

/* const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}; */


