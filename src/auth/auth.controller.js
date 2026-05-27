const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("./auth.service");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // check if user exists
    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // compare password with hashed password from the db
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate JWT token containing user's id and authorization role
    const token = jwt.sign(
      { id: user.id, role: user.role }, // payload - user info
      process.env.JWT_SECRET, // secret key
      { expiresIn: "24h" }, // token becomes invalid after 1 day
    );

    res.status(200).json({
      success: true,
      message: "Login Successful!",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
