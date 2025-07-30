const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { default: helmet } = require("helmet");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use(express.static("public"));

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

module.exports = app;
