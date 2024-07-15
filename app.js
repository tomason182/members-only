require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const main = require("./config/db");
const app = express();

// Connect to database
main().catch((err) => console.log(`Error connecting with database: ${err}`));

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.listen(port, () => console.log(`Server started at port ${port}`));
