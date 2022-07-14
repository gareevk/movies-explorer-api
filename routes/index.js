const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { limiter } = require('../middlewares/rateLimit');
const { createUserValidation, loginValidation } = require('../validation/validation');
const { createUser } = require('../middlewares/Register');
const { login } = require('../middlewares/SignIn');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const error = require('../utils/constants');

//router.use(limiter);

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/', auth, users);
router.use('/', auth, movies);

router.use('*', (req, res, next) => {
  next(new NotFoundError(error.pageNotFoundError));
});

module.exports = router;
