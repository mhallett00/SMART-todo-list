const express = require('express');
const router  = express.Router();
const { getUserWithEmail } = require('../helpers/dbhelpers');

module.exports = (dbhelpers) => {
  // loads login/register page
  router.get("/", (req, res) => {
    // we need to install cookies (cookieSession)?
    if (req.session.user_id) {
      //redirects to todos (we needs todos ejs)
      res.redirect('/');

    } else {
      let templateVars = {
        user: {id: undefined, name: null}
      };
      //render login ejs file
      res.render("login", templateVars);
    }
  });

  //user logs in
  router.post("/", (req,res) => {
    //check db for user's email
    dbhelpers.getUserWithEmail(req.body.email)
    .then(user => {
      if (!user) {
        res.json({error: 'User does not exist'});

      } else {
        // check hashed password
        if (req.body.password, user.password) {
          res.json({error: 'Bad Password'});
        } else {
          req.session = { user_id: user.id };
          res.redirect('/todos');
        }
      }
    })
    .catch(err => {
      console.error('Login Failed', err);
    });

});

  return router;
};
