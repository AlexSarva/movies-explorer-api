const jwt = require('jsonwebtoken');
const { AUTH_ERROR } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const TOKEN = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const extractBearerToken = (tkn) => tkn.replace('Bearer ', '');

const auth = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    authorization = req.cookies.jwt;
  }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw AUTH_ERROR;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, TOKEN);
  } catch (err) {
    next(AUTH_ERROR);
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
