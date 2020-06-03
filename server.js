// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const request  = require('request');
const bcrypt   = require('bcrypt');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
const dbhelpers = require('./helpers/dbhelpers')(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const todosRoutes = require("./routes/todos");
const loginRoutes = require("./routes/login");
// const apiPing = require("./routes/api")
// const todosIDRoutes = require("./routes/todos:id");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/to_dos", todosRoutes(dbhelpers));
app.use("/api/login", loginRoutes(dbhelpers));
// app.use("/https://www.googleapis.com/books/v1/volumes?q=flowers+intitle:keyes&`key`=AIzaSyAKjPZ7x_sUR7okP5SJEoY0MDHMVsseZfo", apiPing(dbhelpers));

// app.use("/todos:id", todosIDRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  console.log(req)
  res.render("login");
});

app.get("/login/:id", (req,res) => {
  req.session.user_id = req.params.id;
  console.log(req.session.user_id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


// GET                 /todos                         index action               index page to display all lists

// GET                 /todos/:id                     show action                displays a users todos on ID in url
// GET                 /todos/:entry/edit(?)          edit action                displays edit form based on ID in url
// GET                 /login/:id                     login bypass
// GET                 /logout                        logout user                logout user
// POST                /todos                         create action              add an item to list
// POST                /register                      register action            register user
// GET                 /register                      show action                displays user register form
