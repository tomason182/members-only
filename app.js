require("dotenv").config();

const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("node:path");
const port = process.env.PORT || 3000;
const main = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./config/passport");
const logger = require("morgan");

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
app.use(express.urlencoded({ extended: true }));

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // If true set cookie to everybody. False set cookie when log in?
    store: sessionStore,
    cookie: {
      secure: false, // Should be true for https
      maxAge: 24 * 3600 * 1000, // milliseconds
    },
  })
);

app.use(passport.authenticate("session"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.use("/", indexRoute);
app.use("/", userRoutes);
app.use("/messages", messageRoutes);

// Chat, Why I am not getting any result when trying to console.log the req parameters?

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
