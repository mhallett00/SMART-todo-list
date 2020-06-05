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

  const addTodo = function(todo) {
    return db.query(`
    INSERT INTO to_dos (
      user_id, name, category_id, status_id)
      VALUES ($1, $2, $3, 1)
    RETURNING *;
    `, [todo.user_id, todo.name, todo.category_id])
      .then(res => res.rows);
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
        return data.rows;
      })
      .catch(err => console.error(500));
  };

  const updateTodo = function(todo) {
    let query = `
      UPDATE to_dos
      SET category_id = ${todo.category_id}
      WHERE id = ${todo.id}
      RETURNING *;
    `;
    return db.query(query)
      .then(data => {
       return data.rows;
      })
      .catch(err => console.error(500));
  };

  const newUser = (userObj) => {
    const { name, email, password } = userObj;
    return db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [name, email, password])
      .then(res => res.rows[0])
      .catch(err => console.error('error adding new user',err));
  };

  const editStatusToDo = function(todo) {

    let query = `
      UPDATE to_dos
      SET status_id = ${todo.status_id}
      WHERE id = ${todo.id}
      RETURNING*;
    `;
    return db.query(query)
      .then(data => {
        return data.rows;
      })
      .catch(err => console.error(500));
  };

  const getTodoId = function(todoName) {
    let query = `
    SELECT id
    FROM to_dos
    WHERE to_dos.name = ${todoName}
    `;
    return db.query(query)
      .then(data => data.rows)
      .catch(err => console.error(500));
  };

  return { addTodo, getUserWithEmail, getIdWithUsername, getTodos, updateTodo, getTodoId, editStatusToDo, newUser };
};
