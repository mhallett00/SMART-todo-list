const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserWithEmail } = require('../helpers/dbhelpers');

module.exports = () => {

  router.get('/', (req, res) => {
    res.redirect('/login');
  })

  router.post('/', (req, res) => {
    const input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const user = getUserWithEmail(input.email);
    if (user) {
      res.redirect('/login');
    } else {
      const addUser = newUser(input);
      req.session = { user_id: addUser.id };
      res.redirect('/todos');
    }

  });

  return router;
}


