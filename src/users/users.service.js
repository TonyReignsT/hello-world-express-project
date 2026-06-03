const db = require("../config/db");
const bcrypt = require("bcryptjs");

// creating a new user
exports.createUser = async (name, email, password_hash) => {
  const hashedPassword = await bcrypt.hash(password_hash, 10);
  const result = await db.query(
    `INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, 'staff')
        RETURNING id, name, email, role`,
    [name, email, hashedPassword],
  );

  return result.rows[0];
};

// getting all users
exports.getUsers = async () => {
  const result = await db.query("SELECT id, name, email, role FROM users");

  return result.rows;
};

// getting a user by id
exports.getUserById = async (id) => {
  const result = await db.query(
    `SELECT id, name, email, role FROM users
        WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

// updating a user
exports.updateUser = async (id, name, email, password_hash) => {
  const result = await db.query(
    `UPDATE users
        SET name = $1, email = $2, password_hash = $3
        WHERE id = $4
        RETURNING id, name, email, role`,
    [name, email, password_hash, id], // the id goes last to match $5
  );

  return result.rows[0];
};

// deleting a user
exports.deleteUser = async (id) => {
  const result = await db.query(
    `DELETE FROM users
        WHERE id = $1`,
    [id],
  );

  return result.rowCount;
};
