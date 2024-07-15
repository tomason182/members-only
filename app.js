require("dotenv").config();

const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("node:path");
const port = process.env.PORT || 3000;
const main = require("./config/db");

// Add routes
const indexRoute = require("./routes/index");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

// Connect to database
main().catch((err) => console.log(`Error connecting with database: ${err}`));

// Initialize express application
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoute);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
