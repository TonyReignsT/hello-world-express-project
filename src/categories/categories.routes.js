const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./category.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.get("/", protect, getCategories);
router.get("/:id", protect, getCategoryById);
router.post("/", protect, restrictTo("admin"), createCategory);
router.put("/:id", protect, restrictTo("admin"), updateCategory);
router.delete("/:id", protect, restrictTo("admin"), deleteCategory);

module.exports = router;
