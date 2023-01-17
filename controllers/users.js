const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { USER_NOT_FOUND_ERROR, VALIDATION_ERROR, USER_EXIST_ERROR } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const TOKEN = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const getMeInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(USER_NOT_FOUND_ERROR)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const tokenType = 'Bearer';

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = tokenType.concat(' ', jwt.sign({ _id: user._id }, TOKEN, { expiresIn: '1w' }));
      res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
        .status(200)
        .send({
          token,
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(VALIDATION_ERROR);
        return;
      }
      if (err.code === 11000) {
        next(USER_EXIST_ERROR);
        return;
      }
      next(err);
    });
};

const editUserInfo = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(USER_NOT_FOUND_ERROR)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(USER_EXIST_ERROR);
        return;
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(VALIDATION_ERROR);
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  editUserInfo,
  login,
  getMeInfo,
};
