export const DEFAULT_ERRORS = {
  BAD_REQUEST: { code: "BAD_REQUEST", message: "Bad request", statusCode: 400 },
  UNAUTHORIZED: { code: "UNAUTHORIZED", message: "Invalid credentials", statusCode: 401 },
  FORBIDDEN: { code: "FORBIDDEN", message: "Permission denied", statusCode: 403 },
  NOT_FOUND: { code: "NOT_FOUND", message: "Not found", statusCode: 404 },
  SERVER_ERROR: { code: "SERVER_ERROR", message: "Internal server error", statusCode: 500 },
};

export class ApiError extends Error {
  constructor(error, customMessage = null) {
    super(customMessage || error.message);
    this.code = error.code;
    this.statusCode = error.statusCode;
  }
}

// ✅ FINAL CLEAN HELPERS
export const Errors = {
  badRequest: (msg) => new ApiError(DEFAULT_ERRORS.BAD_REQUEST, msg),
  unauthorized: (msg) => new ApiError(DEFAULT_ERRORS.UNAUTHORIZED, msg),
  forbidden: (msg) => new ApiError(DEFAULT_ERRORS.FORBIDDEN, msg),
  notFound: (msg) => new ApiError(DEFAULT_ERRORS.NOT_FOUND, msg),
  server: (msg) => new ApiError(DEFAULT_ERRORS.SERVER_ERROR, msg),
};