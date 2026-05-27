const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./users.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.post("/", createUser); // public - register
router.get("/", protect, getUsers); // protected
router.get("/:id", protect, getUserById); // protected
router.put("/:id", protect, updateUser); // protected
router.delete("/:id", protect, restrictTo("admin"), deleteUser); // admin only

module.exports = router;
