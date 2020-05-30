DROP TABLE IF EXISTS to_dos CASCADE;
CREATE TABLE to_dos (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  status_id INTEGER REFERENCES statuses(id) ON DELETE CASCADE
);