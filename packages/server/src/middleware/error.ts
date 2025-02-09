import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let error = { ...err };

  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};
