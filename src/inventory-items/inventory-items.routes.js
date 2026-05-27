const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./inventory-items.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.post("/", protect, restrictTo("admin"), createItem);
router.get("/", protect, getItems);
router.get("/:id", protect, getItemById);
router.put("/:id", protect, restrictTo("admin"), updateItem);
router.delete("/:id", protect, restrictTo("admin"), deleteItem);

module.exports = router;
