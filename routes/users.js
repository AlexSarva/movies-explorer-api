const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editUserInfo, getMeInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getMeInfo);
router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), editUserInfo);

module.exports = router;
