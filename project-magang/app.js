const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const shopRouter = require("./routes/shop");

dotenv.config();

const app = express(); // ⬅️ WAJIB DULUAN sebelum pakai app.use

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: "fazari-rahasia",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

// User global untuk semua view
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Routes
app.use("/", indexRouter);
app.use("/", dashboardRouter);
app.use("/products", productsRouter);
app.use("/", ordersRouter);
app.use("/", shopRouter);
app.use("/users", usersRouter);
app.use(express.static(path.join(__dirname, "public/stylesheets")));
app.use("/scripts", express.static(path.join(__dirname, "public/scripts")));

module.exports = app;
