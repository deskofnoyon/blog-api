const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");

const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(cors());
  app.use(express.static("public"));
};

module.exports = applyMiddleware;
