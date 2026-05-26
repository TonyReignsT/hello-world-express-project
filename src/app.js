const express = require('express')
require('dotenv').config()

// Defining routes
const categoryRoutes = require("./categories/categories.routes") // importing categories route
const userRoutes = require("./users/users.routes")
const inventoryRoutes = require("./inventory-items/inventory-items.routes")
const transactionRoutes = require("./transactions/transactions.routes")

const app = express()

// returns json middleware
app.use(express.json()) 

app.get('/', (req, res) => {
    res.send("Hello Universe!")
})

app.use("/categories", categoryRoutes)
app.use("/users", userRoutes)
app.use("/inventory", inventoryRoutes)
app.use("/transactions", transactionRoutes)

module.exports = app
