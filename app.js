require("dotenv").config();

const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const port = process.env.PORT || 3000;
const main = require("./config/db");

// Add routes
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

// Connect to database
main().catch((err) => console.log(`Error connecting with database: ${err}`));

// Initialize express application
const app = express();

app.use("/users", userRoutes);
app.use("/message", messageRoutes);

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
