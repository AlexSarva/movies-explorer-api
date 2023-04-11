const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { USER_AUTH_ERROR } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(USER_AUTH_ERROR);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(USER_AUTH_ERROR);
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUser;

module.exports = mongoose.model('user', userSchema);
