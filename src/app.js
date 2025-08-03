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

app.use((_req, _res, next) => {
  const error = new Error("Requested resource not found!");
  error.status = 404;
  error.error = "Not found";
  next(error);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    success: false,
    status: err.status,
    message: err.message,
    error: err?.errors,
  });
});

module.exports = app;
