const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const { getUserWithEmail } = require('../helpers/dbhelpers');

module.exports = (dbhelpers) => {

  router.get('/', (req, res) => {
    res.render('register');
  })

  router.post('/', (req, res) => {
    const input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const user = dbhelpers.getUserWithEmail(input.email);
    if (user) {
      res.redirect('/');
    } else {
      const addUser = dbhelpers.newUser(input);
      req.session = { user_id: addUser.id };
      res.redirect('/');
    }

  });

  return router;
}

// $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.


