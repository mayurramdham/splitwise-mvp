import Logger from "../utils/Logger.js";

const errorHandler = (err, req, res, next) => {
  Logger.error(`${req.method} ${req.url} - ${err.message}`, err);
  return res.status(err.statusCode || 500).json({
    success: false,
    code: err.code || "SERVER_ERROR",
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;