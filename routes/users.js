const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { updatedUserValidation } = require('../validation/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updatedUserValidation, updateUser);

module.exports = router;
