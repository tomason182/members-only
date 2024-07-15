require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const main = require("./config/db");
const userRoutes = require("./routes/users");

// Connect to database
main().catch((err) => console.log(`Error connecting with database: ${err}`));

// Initialize express application
const app = express();

app.use("/users", userRoutes);

app.listen(port, () => console.log(`Server started at port ${port}`));
