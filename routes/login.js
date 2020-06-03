const express = require('express');
const router  = express.Router();
//install bcrypt
const bcrypt  = require('bcrypt');
const { getUserWithEmail } = require('../helpers/dbhelpers');

module.exports = () => {
  // loads login/register page

  router.get("/login", (req, res) => {
    const user = req.session.user_id;
    // we need to install cookies (cookieSession)?
    if (req.session.user_id) {
      //redirects to todos (we needs todos ejs)
      res.render('/login');

    } else {
      let templateVars = {
        user: {id: undefined, name: null}
      };
      //render login ejs file
      res.render("login", templateVars);
    }
  });

  // app.get("/login", (req, res) => {
  //   const user = users[req.session["user_id"]];
  //   const templateVars = { user };
  //   res.render("urls_login", templateVars);
  // });

  //user logs in
  router.post("/", (req,res) => {
    //check db for user's email
    dbhelpers.getUserWithEmail(req.body.email)
    .then(user => {
      if (!user) {
        res.json({error: 'User does not exist'});

      } else {
        // check hashed password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
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
