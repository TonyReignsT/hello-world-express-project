// Importing the jsonwebtoken library to verify tokens
const jwt = require("jsonwebtoken");

// middleware to check if a user is logged in
exports.protect = (req, res, next) => {
  try {
    // get token from header
    const authHeader = req.headers.authorization;

    // check if the authorization header exixsts and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Sign-in token is missing.",
      });
    }

    // extracting the token by splitting "Bearer <token" at the space
    const token = authHeader.split(" ")[1];

    // verifying the token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to the request object
    req.user = decoded;

    next(); // passing control to the next function
  } catch (error) {
    // returns an error if token is wrong, modified, or expired
    res.status(401).json({
      success: false,
      message: "Access denied. Your token is invalid or expired",
    });
  }
};

// role-based middleware - restricts access to specific roles
exports.restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if the role of the logged-in user is included in the allowed roles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
};
