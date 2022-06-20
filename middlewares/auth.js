const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('./UnauthorizedError');
const error = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new UnauthorizedError(error.authRequiredError));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(error.authRequiredError));
  }
  req.user = payload;

  next();
};
