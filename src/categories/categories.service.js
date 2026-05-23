const db = require("../config/db");

// Creating a category
exports.createCategory = async (category_name, description) => {
  const result = await db.query(
    `INSERT INTO categories(category_name, description)
        VALUES ($1, $2)
        RETURNING *`,
    [category_name, description],
  ); // $1 and $2 (parameterized SQL) - protects agains sql injection

  return result.rows[0];
};

// Finding all categories
exports.getCategories = async () => {
  return await db.query("SELECT * FROM categories");
};

// updating a category
exports.updateCategory =  async (id, category_name, description) => {
    const result = await db.query(
        `UPDATE categories
        SET category_name = $1,
            description  = $2
        WHERE id = $3
        RETURNING *`,
        [category_name, description, id]
    )

    return result.rows[0]
}

// deleting category
exports.deleteCategory = async (id) => {
    const result = await db.query(
        `DELETE FROM categories
        WHERE id = $1
        RETURNING *`,
        [id]
    )

    return result.rows[0]
}
