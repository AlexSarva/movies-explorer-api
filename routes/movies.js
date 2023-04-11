const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { deleteMovieValidation, addMovieValidation } = require('../validation/movies');
const auth = require('../middlewares/auth');

router.get('/', auth, getMovies);
router.delete('/:id', auth, deleteMovieValidation, deleteMovie);
router.post('/', auth, addMovieValidation, createMovie);

module.exports = router;
