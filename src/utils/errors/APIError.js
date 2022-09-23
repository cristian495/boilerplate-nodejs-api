class APIError extends Error {
  constructor({ message, httpError = 500, detail = "" }) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.httpError = httpError;
    this.detail = detail
    Error.captureStackTrace(this);
  }
}

module.exports = APIError;
