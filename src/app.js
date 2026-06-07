const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Defining routes
const categoryRoutes = require("./categories/categories.routes"); // importing categories route
const userRoutes = require("./users/users.routes");
const inventoryRoutes = require("./inventory-items/inventory-items.routes");
const transactionRoutes = require("./transactions/transactions.routes");
const authRoutes = require("./auth/auth.routes");

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Configuring CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Whitelists your Vite frontend local development server port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello Universe!");
});

app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/transactions", transactionRoutes);
app.use("/auth", authRoutes);

module.exports = app;
