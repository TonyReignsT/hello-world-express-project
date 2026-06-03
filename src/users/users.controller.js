const userService = require("./users.service");
const bcrypt = require("bcryptjs");

// creating a user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password_hash } = req.body;

    if (!name || !email || !password_hash) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const user = await userService.createUser(name, email, password_hash);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getting all users
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getting a single user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// updating a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, password_hash } = req.body;
    // hashing the password before updating
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const updatedUser = await userService.updateUser(
      id,
      name,
      email,
      hashedPassword
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(204).send(); // success - No content
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
