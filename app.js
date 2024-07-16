require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
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

/// SET UP SESSIONS COOKIES ///
// Set up create-mongo session storage
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collectionName: "sessions",
  touchAfter: 8 * 3600, // 8 hs in sec.
  crypto: {
    secret: process.env.CONN_MONGO_SECRET,
  },
});

// Set up express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, // If true set cookie to everybody. False set cookie when log in?
    store: sessionStore,
    cookie: {
      secure: false, // Should be true for https
      maxAge: 24 * 3600 * 1000, // milliseconds
    },
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Import passport config
require("./config/passport");

app.use("/", indexRoute);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
