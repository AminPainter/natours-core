import { AppError } from '../utils';

const handleInvalidJWTError = () =>
  new AppError('Invalid token. Please login again!');
const handleExpiredJWTError = () =>
  new AppError('Your token has expired. Please login again!');
const handleCastErrorDB = err =>
  new AppError(`Mismatched data type for the field: ${err.path}`);
const handleValidationErrorDB = err =>
  new AppError(`${Object.values(err.errors)[0].message}`);
const handleDuplicateKeyErrorDB = err =>
  new AppError(
    `Please user another value for the fields: ${Object.keys(err.keyValue).join(
      ', '
    )}`
  );

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  let error = Object.assign(err);

  if (error.name === 'TokenExpiredError') error = handleExpiredJWTError();
  else if (error.name === 'JsonWebTokenError') error = handleInvalidJWTError();
  else if (error.name === 'CastError') error = handleCastErrorDB(error);
  else if (error.name === 'ValidationError')
    error = handleValidationErrorDB(error);
  else if (error.code === 11000) error = handleDuplicateKeyErrorDB(error);

  if (error.isOperational)
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

  console.log(error);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};
