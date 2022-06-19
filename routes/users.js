const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).email(),
  }),
}), updateUser);

module.exports = router;
