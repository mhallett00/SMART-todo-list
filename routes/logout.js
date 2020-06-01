const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    //clears cookieSession
    req.session = null;
    //redirect to login/register page
    res.redirect('/login');

  });

  return router;
}
