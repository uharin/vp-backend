import createError from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  // Server error logging
  console.error('API Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode: err.status || 500
  });

  // Client error response
  res.status(err.status || 500).json({
    error: {
      message: err.expose ? err.message : 'Internal Server Error',
      status: err.status || 500,
      details: err.details || null
    }
  });
};

// Utility function to create custom errors
export const createCustomError = (status, message, details = null) => {
  const error = createError(status, message);
  error.details = details;
  return error;
};
