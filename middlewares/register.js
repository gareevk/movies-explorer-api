const bcrypt = require('bcryptjs');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const User = require('../models/user');
const error = require('../utils/constants');

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    const newUser = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };
    res.status(201).send({ data: newUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(error.incorrectInputError));
    }
    if (err.code === 11000) {
      next(new ConflictError(error.userExistsError));
    }
    next(err);
  }
};
