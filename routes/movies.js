const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { UrlCheckRegex, OnlyEN, OnlyRU } = require('../constants/validate');

router.get('/', auth, getMovies);
router.delete('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteMovie);
router.post('/', auth, celebrate({
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
    nameRU: Joi.string().required().pattern(OnlyRU),
    nameEN: Joi.string().required().pattern(OnlyEN),
  }),
}), createMovie);

module.exports = router;
