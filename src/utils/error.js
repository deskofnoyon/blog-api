const AppError = require("./AppError");

const notFound = (msg = "Resource not found") => {
  return new AppError(404, msg);
};

const badRequest = (msg = "Bad request") => {
  return new AppError(400, msg);
};

const unauthorized = (msg = "Unauthorized") => {
  return new AppError(401, msg);
};

const forbidden = (msg = "Forbidden") => {
  return new AppError(403, msg);
};

const internalServerError = (msg = "Internal server error") => {
  return new AppError(500, msg);
};

const serviceUnavailable = (msg = "Service unavailable") => {
  return new AppError(503, msg);
};

const badGateway = (msg = "Bad gateway") => {
  return new AppError(502, msg);
};

const gatewayTimeout = (msg = "Gateway timeout") => {
  return new AppError(504, msg);
};

const methodNotAllowed = (msg = "Method not allowed") => {
  return new AppError(405, msg);
};

const notImplemented = (msg = "Not implemented") => {
  return new AppError(501, msg);
};

module.exports = {
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  internalServerError,
  serviceUnavailable,
  badGateway,
  gatewayTimeout,
  methodNotAllowed,
  notImplemented,
};
