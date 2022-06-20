const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./UnauthorizedError');
const User = require('../models/user');
require('dotenv').config();
const error = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) });
  } catch (err) {
    next(new UnauthorizedError(error.incorrectLoginOrPasswordError));
  }
};
