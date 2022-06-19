const bcrypt = require('bcryptjs');
const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');
const User = require('../models/user');

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const emailValidation = await User.findOne({ email });
    if (emailValidation) {
      next(new ConflictError('Такой пользователь уже существует'));
      return;
    }
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
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
};
