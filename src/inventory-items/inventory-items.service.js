const db = require("../config/db");

// create a new item
exports.createItem = async (
  item_name,
  description,
  quantity,
  unit_price,
  category_id,
) => {
  const result = await db.query(
    `INSERT INTO inventory_items (item_name, description, quantity, unit_price, category_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [item_name, description, quantity, unit_price, category_id],
  );

  return result.rows[0];
};

// get all items
exports.getItems = async () => {
  const result = await db.query(
    `SELECT *
        FROM inventory_items`,
  );
  return result.rows;
};

// get a single item
exports.getItemById = async (id) => {
  const result = await db.query(
    `SELECT *
        FROM inventory_items
        WHERE id = $1`,
    [id],
  );
  return result.rows[0];
};

// updating an item
exports.updateItem = async (
  id,
  item_name,
  description,
  quantity,
  unit_price,
  category_id,
) => {
  const result = await db.query(
    `UPDATE inventory_items
        SET item_name = $1, description = $2, quantity = $3, unit_price = $4, category_id = $5
        WHERE id = $6
        RETURNING *`,
    [item_name, description, quantity, unit_price, category_id, id],
  );
  return result.rows[0];
};

// deleting an item
exports.deleteItem = async (id) => {
  const result = await db.query(`DELETE FROM inventory_items WHERE id = $1`, [
    id,
  ]);
  return result.rowCount;
};
