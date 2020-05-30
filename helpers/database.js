const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getUserWithEmail = function(email) {
  return db.query(`
    SELECT * FROM users
    WHERE users.email = $1
  `, [email])
  .then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;
