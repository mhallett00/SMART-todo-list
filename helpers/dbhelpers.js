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
      VALUES ($1, $2, 1, 1)
    RETURNING *;
    `, [todo.user_id, todo.name])
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
    .then(data => data.rows)
    .catch(err => console.error(500));
  };

  return { addTodo, getUserWithEmail, getIdWithUsername, getTodos };
};
