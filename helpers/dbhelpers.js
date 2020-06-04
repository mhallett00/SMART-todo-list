// const { Pool } = require('pg');
// const pool = new Pool({
//   user: 'labber',
//   password: 'labber',
//   host: 'localhost',
//   database: 'midterm'
// });

// const db = pool;


module.exports = (db) => {

  const getUserWithEmail = function(email) {
    return db.query(`
      SELECT *
      FROM users
      WHERE users.email = $1
    `, [email])
    .then(res => res.rows[0]);
  };

  const getIdWithUsername = function(name) {
    return db.query(`
      SELECT users.id
      FROM users
      WHERE users.name = $1
    `, [name])
    .then(res => res.rows[0].id);
  };

  /**
   * Add a property to the database
   * @param {{}} property An object containing all of the property details.
   * @return {Promise<{}>} A promise to the property.
   */
  const addTodo = function(todo) {
    return db.query(`
    INSERT INTO to_dos (
      user_id, name, category_id, status_id)
      VALUES ($1, $2, $3, 1)
    RETURNING *;
    `, [todo.user_id, todo.name, todo.category_id])
    .then (res => res.rows);
  };

  const getTodos = function(userId) {
    let query = `
    SELECT to_dos.*
    FROM to_dos
    JOIN users ON user_id = users.id
    WHERE users.name = '${userId}'
    `;
    return db.query(query)
    .then(data => {
      // console.log(data.rows)
      return data.rows
    })
    .catch(err => console.error(500));
  };

  const updateTodo = function(todo) {
    let query = `
      UPDATE to_dos
      SET category_id = ${todo.category_id}
      WHERE id = ${todo.id}
      RETURNING *;
    `
    return db.query(query)
    .then(data => {
      // console.log(data.rows)
      return data.rows
    })
    .catch(err => console.error(500));
  };

  const deleteToDo = function (todo) {
    let query = `
      UPDATE to_dos
      SET status_id = ${todo.status_id}
      WHERE id = ${todo.id}
      RETURNING*;
    `
    return db.query(query)
    .then(data => {
      // console.log(data.rows)
      return data.rows
    })
    .catch(err => console.error(500));
  };

  // sql?
  // user clicks todo item on list
  // menu comes up with 4 categories
  // select category, click ok (submit)
  // we have a category name on submission, but we need a category ID
  // variable UI display: Watch -> html id: filmShow -> table name: film_shows = category_id?
  // SELECT category_id FROM categories where category.name = ${categorySubmission}

/*
UPDATE to_dos
  SET category_id = ${newCatId}
  WHERE to_dos.id = (SELECT id
    FROM to_dos
    WHERE to_dos.name = ${todoName})
  RETURNING *;
  */


  // const updateTodo = function(newCatId, todoName, userId) {
  //   console.log('HELLO');
  //   let query = `
  //   UPDATE to_dos
  //   SET category_id = ${newCatId}
  //   WHERE to_dos.id = (SELECT id
  //     FROM to_dos
  //     WHERE to_dos.name = ${todoName}
  //     AND user_id = ${userId})
  //   RETURNING *
  //   `;
  //   return db.query(query)
  //   .then(data => {
  //     // console.log(data);
  //     data.rows})
  //   .catch(err => console.error(500));
  // }

  const getTodoId = function(todoName) {
    let query = `
    SELECT id
    FROM to_dos
    WHERE to_dos.name = ${todoName}
    `;
    return db.query(query)
    .then(data => data.rows)
    .catch(err => console.error(500));
  }

  return { addTodo, getUserWithEmail, getIdWithUsername, getTodos, updateTodo, getTodoId, deleteToDo };
};
