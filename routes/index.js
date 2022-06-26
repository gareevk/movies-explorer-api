const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const { createUser } = require('../middlewares/Register');
const { login } = require('../middlewares/SignIn');
const auth = require('../middlewares/auth');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/', auth, users);
router.use('/', auth, movies);

module.exports = router;
