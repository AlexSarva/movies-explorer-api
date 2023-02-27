const { celebrate, Joi } = require('celebrate');
const { UrlCheckRegex, OnlyRU, OnlyEN } = require('../constants/validate');

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(UrlCheckRegex),
    trailer: Joi.string().required().pattern(UrlCheckRegex),
    thumbnail: Joi.string().required().pattern(UrlCheckRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(OnlyRU),
    nameEN: Joi.string().required().regex(OnlyEN),
  }),
});

module.exports = {
  deleteMovieValidation,
  addMovieValidation,
};
