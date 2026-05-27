const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} = require("./transactions.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");


router.post("/",protect, createTransaction);
router.get("/",protect, getTransactions)
router.get("/:id", protect, getTransactionById)
router.put("/:id", protect, restrictTo('admin'), updateTransaction)
router.delete("/:id",protect, restrictTo('admin'), deleteTransaction)

module.exports = router;
