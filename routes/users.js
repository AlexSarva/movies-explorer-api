const router = require('express').Router();
const {
  editUserInfo, getMeInfo,
} = require('../controllers/users');
const { editUserValidation } = require('../validation/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getMeInfo);
router.patch('/me', auth, editUserValidation, editUserInfo);

module.exports = router;
