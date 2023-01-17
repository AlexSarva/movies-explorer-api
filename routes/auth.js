const router = require('express').Router();
const {
  createUser, login,
} = require('../controllers/users');
const {
  signInValidation, signUpValidation,
} = require('../validation/auth');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

module.exports = router;
