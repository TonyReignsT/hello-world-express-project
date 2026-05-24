const db = require("../config/db")

// creating a new user
exports.createUser = async (name, email, password_hash, role) => {
    const result = await db.query(
        `INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [name, email, password_hash, role]
    )

    return result.rows[0]
}

// getting all users
exports.getUsers = async () => {
    return await db.query("SELECT * FROM users");
};

// getting a user by id
exports.getUserById = async (id) => {
    const result = await db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [id]
    )

    return result.rows[0]
}


// updating a user
exports.updateUser = async (id, name, email, password_hash, role) => {
    const result = await db.query(
        `UPDATE users
        SET name = $1, email = $2, password_hash = $3, role = $4
        WHERE id = $5
        RETURNING *`,
        [name, email, password_hash, role, id] // the id goes last to match $5
    )

    return result.rows[0]
}

// deleting a user
exports.deleteUser = async (id) => {
    const result = await db.query(
        `DELETE FROM users
        WHERE id = $1
        RETURNING *`,
        [id]
    )

    return result.rows[0]
}
