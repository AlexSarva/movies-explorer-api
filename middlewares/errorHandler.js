const { INTERNAL_SERVER_ERROR } = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode, message,
  } = err;

  res.status(!statusCode ? 500 : statusCode).send({
    message: statusCode !== 500
      ? message
      : INTERNAL_SERVER_ERROR.message,
  });

  next();
};

module.exports = errorHandler;
