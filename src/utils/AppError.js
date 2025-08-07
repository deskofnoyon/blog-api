/**
 * Custom Application Error class
 * Designed to work with the global error handler in app.js
 */
class AppError extends Error {
  /**
   * Creates a new AppError instance
   * @param {number} [status=500] - HTTP status code
   * @param {string} message - Error message
   * @param {Array|Object} [errors=null] - Additional error details
   */
  constructor(status = 500, message, errors = null) {
    super(message);

    this.name = "AppError";
    this.status = status;
    this.message = message;
    this.errors = errors;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * Creates a Bad Request error (400)
   * @param {string} message - Error message
   * @param {Array|Object} [errors=null] - Validation errors
   * @returns {AppError} AppError instance
   */
  static badRequest(message = "Bad request", errors = null) {
    return new AppError(400, message, errors);
  }

  /**
   * Creates an Unauthorized error (401)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static unauthorized(message = "Unauthorized") {
    return new AppError(401, message);
  }

  /**
   * Creates a Forbidden error (403)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static forbidden(message = "Forbidden") {
    return new AppError(403, message);
  }

  /**
   * Creates a Not Found error (404)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static notFound(message = "Resource not found") {
    return new AppError(404, message);
  }

  /**
   * Creates a Method Not Allowed error (405)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static methodNotAllowed(message = "Method not allowed") {
    return new AppError(405, message);
  }

  /**
   * Creates a Conflict error (409)
   * @param {string} message - Error message
   * @param {Array|Object} [errors=null] - Conflict details
   * @returns {AppError} AppError instance
   */
  static conflict(message = "Conflict", errors = null) {
    return new AppError(409, message, errors);
  }

  /**
   * Creates an Unprocessable Entity error (422)
   * @param {string} message - Error message
   * @param {Array|Object} [errors=null] - Validation errors
   * @returns {AppError} AppError instance
   */
  static unprocessableEntity(message = "Unprocessable Entity", errors = null) {
    return new AppError(422, message, errors);
  }

  /**
   * Creates an Internal Server Error (500)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static internalServer(message = "Internal server error") {
    return new AppError(500, message);
  }

  /**
   * Creates a Not Implemented error (501)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static notImplemented(message = "Not implemented") {
    return new AppError(501, message);
  }

  /**
   * Creates a Bad Gateway error (502)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static badGateway(message = "Bad gateway") {
    return new AppError(502, message);
  }

  /**
   * Creates a Service Unavailable error (503)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static serviceUnavailable(message = "Service unavailable") {
    return new AppError(503, message);
  }

  /**
   * Creates a Gateway Timeout error (504)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static gatewayTimeout(message = "Gateway timeout") {
    return new AppError(504, message);
  }

  /**
   * Creates an HTTP Version Not Supported error (505)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static httpVersionNotSupported(message = "HTTP Version Not Supported") {
    return new AppError(505, message);
  }

  /**
   * Creates a Variant Also Negotiates error (506)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static variantAlsoNegotiates(message = "Variant Also Negotiates") {
    return new AppError(506, message);
  }
}

module.exports = AppError;
