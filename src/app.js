const express = require("express");
const applyMiddleware = require("./middleware");
const applicationRoutes = require("./routes");

const app = express();
applyMiddleware(app);

// application routes
app.use(applicationRoutes);

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// not found middleware
app.use((_req, _res, next) => {
  const error = new Error("Requested resource not found!");
  error.status = 404;
  error.errors = [
    {
      message: "Not found",
      code: 404,
    },
  ];

  next(error);
});

// global error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    success: false,
    status: err.status,
    message: err.message,
    errors: err?.errors || err.error,
  });
});

module.exports = app;
