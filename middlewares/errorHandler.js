const { InternalServerError } = require('../errors/internalServerError');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode, message,
  } = err;

  const internalServerError = new InternalServerError('На сервере произошла ошибка');

  res.status(!statusCode ? 500 : statusCode).send({
    message: statusCode !== 500
      ? message
      : internalServerError.message,
  });

  next();
};

module.exports = errorHandler;
