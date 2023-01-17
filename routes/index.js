require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const corsCustom = require('../middlewares/cors');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { NotFoundError } = require('../errors/notFoundError');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(corsCustom);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);

app.use('/', require('./auth'));

app.use('/users', require('./users'));
app.use('/movies', require('./movies'));

app.use('*', auth, () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

module.exports = app;
