const Movie = require('../models/movie');
const { VALIDATION_ERROR, MOVIE_NOT_FOUND_ERROR, MOVIE_PERMISSION_ERROR } = require('../errors/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(VALIDATION_ERROR);
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(MOVIE_NOT_FOUND_ERROR)
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw MOVIE_PERMISSION_ERROR;
      }
      return movie;
    })
    .then((card) => Movie.findByIdAndRemove(card._id)
      .then(() => {
        res.status(200).send({ message: 'Фильм успешно удален' });
      })
      .catch(next))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(VALIDATION_ERROR);
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
