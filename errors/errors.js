const { NotFoundError } = require('./notFoundError');
const { ConflictError } = require('./conflictError');
const { AuthorizationError } = require('./authorizationError');
const { ValidationError } = require('./validationError');
const { PermissionError } = require('./permissionError');
const { InternalServerError } = require('./internalServerError');

const USER_NOT_FOUND_ERROR = new NotFoundError('Пользователь по указанному _id не найден.');
const USER_EXIST_ERROR = new ConflictError('Пользователь с таким email уже существует');
const USER_AUTH_ERROR = new AuthorizationError('Неправильные почта или пароль');
const AUTH_ERROR = new AuthorizationError('Необходима авторизация');
const VALIDATION_ERROR = new ValidationError('Переданы некорректные данные.');
const MOVIE_NOT_FOUND_ERROR = new NotFoundError('Фильм с указанным _id не найден');
const MOVIE_PERMISSION_ERROR = new PermissionError('Нет прав для удаления этого фильма');
const INTERNAL_SERVER_ERROR = new InternalServerError('На сервере произошла ошибка');
const PAGE_NOT_FOUND_ERROR = new NotFoundError('Страница не найдена');

module.exports = {
  USER_NOT_FOUND_ERROR,
  USER_EXIST_ERROR,
  USER_AUTH_ERROR,
  AUTH_ERROR,
  VALIDATION_ERROR,
  MOVIE_NOT_FOUND_ERROR,
  MOVIE_PERMISSION_ERROR,
  INTERNAL_SERVER_ERROR,
  PAGE_NOT_FOUND_ERROR,
};
