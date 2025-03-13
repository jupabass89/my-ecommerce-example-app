import { NextFunction, Request, Response } from "express";

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// File handling
app.use("/", upload.single("file"));

// Adding routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // ✅ Log error for debugging
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).send({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
