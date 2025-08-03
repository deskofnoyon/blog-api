// /config/logger.js

const winston = require("winston");

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Set level based on environment
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

// Define colors for each level
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Add the colors to Winston
winston.addColors(colors);

// Define the log format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Use JSON format for logs, which is structured and machine-readable
  winston.format.json()
);

// Define transports (destinations for logs)
const transports = [
  // In development, log to the console with colorized output
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize({ all: true })),
  }),
  // In production, log errors to an 'error.log' file
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  // Log all levels to an 'all.log' file
  new winston.transports.File({ filename: "logs/all.log" }),
];

// Create the logger instance
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  // Do not exit on handled exceptions
  exitOnError: false,
});

module.exports = logger;
