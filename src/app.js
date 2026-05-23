const express = require('express')
require('dotenv').config()

const categoryRoutes = require("./categories/categories.routes") // importing categories route

const app = express()

// returns json middleware
app.use(express.json()) 

app.get('/', (req, res) => {
    res.send("Hello Universe!")
})

app.use("/categories", categoryRoutes)

module.exports = app
