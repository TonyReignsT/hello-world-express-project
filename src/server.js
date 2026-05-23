const app = require("./app");
const db = require("./config/db"); // imports pool

const PORT = process.env.PORT || 8000;

// Testing the pool connection 
db.query('SELECT NOW()')
    .then((res) => {
        console.log("Connected to postgreSQL successfully at: ", res.rows[0].now)
    })
    .catch((err) => {
        console.error("DB Connection failed!!!", err.message)
    })


app.listen(PORT, () => {
  console.log(`Hello World! Server is running on port ${PORT}`);
});
