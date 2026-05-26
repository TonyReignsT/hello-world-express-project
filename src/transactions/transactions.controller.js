const transactionService = require("./transactions.service");

// creating transaction
exports.createTransaction = async (req, res) => {
  try {
    const { item_id, user_id, quantity, transaction_type } = req.body;

    if (!item_id || !user_id || !quantity || !transaction_type) {
      return res.status(400).json({
        success: false,
        message:
          "item_id, user_id, quantity and transaction_type are all required",
      });
    }

    const transaction = await transactionService.createTransaction(
      item_id,
      user_id,
      quantity,
      transaction_type,
    );

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    // postgresql error code for foreign key violation (referencing a non-existent id)
    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Invalid item_id or user_id. Please provide valid references",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions();

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single transaction
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await transactionService.getTransactionById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction found successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_id, user_id, quantity, transaction_type } = req.body;

    const updatedTransaction = await transactionService.updateTransaction(
      id,
      item_id,
      user_id,
      quantity,
      transaction_type,
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message: "Invalid item_id or user_id. Please provide valid references",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete route
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await transactionService.deleteTransaction(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
