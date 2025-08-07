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
  static badRequest(message = "Bad Request", errors = null) {
    return new AppError(message, 400, errors);
  }

  /**
   * Creates an Unauthorized error (401)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static unauthorized(message = "Unauthorized") {
    return new AppError(message, 401);
  }

  /**
   * Creates a Forbidden error (403)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static forbidden(message = "Forbidden") {
    return new AppError(message, 403);
  }

  /**
   * Creates a Not Found error (404)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static notFound(message = "Not Found") {
    return new AppError(message, 404);
  }

  /**
   * Creates a Conflict error (409)
   * @param {string} message - Error message
   * @param {Array|Object} [errors=null] - Conflict details
   * @returns {AppError} AppError instance
   */
  static conflict(message = "Conflict", errors = null) {
    return new AppError(message, 409, errors);
  }

  /**
   * Creates an Unprocessable Entity error (422)
   * @param {string} message - Error message
   * @param {Array|Object} [errors=null] - Validation errors
   * @returns {AppError} AppError instance
   */
  static unprocessableEntity(message = "Unprocessable Entity", errors = null) {
    return new AppError(message, 422, errors);
  }

  /**
   * Creates an Internal Server Error (500)
   * @param {string} message - Error message
   * @returns {AppError} AppError instance
   */
  static internalServer(message = "Internal Server Error") {
    return new AppError(message, 500);
  }
}

module.exports = AppError;
