const db = require("../config/db");

// create transaction
exports.createTransaction = async (
  item_id,
  user_id,
  quantity,
  transaction_type,
) => {
  const result = await db.query(
    `INSERT INTO transactions(item_id, user_id, quantity, transaction_type)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [item_id, user_id, quantity, transaction_type],
  );
  return result.rows[0];
};

// get all transactions
exports.getTransactions = async () => {
  const result = await db.query(`SELECT * FROM transactions`);
  return result.rows;
};

// get a single transaction
exports.getTransactionById = async (id) => {
  const result = await db.query(`SELECT * FROM transactions WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
};

// update transaction
exports.updateTransaction = async (
  id,
  item_id,
  user_id,
  quantity,
  transaction_type,
) => {
  const result = await db.query(
    `UPDATE transactions
        SET item_id = $1, user_id = $2, quantity = $3, transaction_type = $4
        WHERE id = $5
        RETURNING *`,
    [item_id, user_id, quantity, transaction_type, id],
  );
  return result.rows[0];
};

// delete transaction
exports.deleteTransaction = async (id) => {
  const result = await db.query(`DELETE FROM transactions WHERE id = $1`, [id]);
  return result.rowCount;
};
