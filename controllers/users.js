const User = require('../models/user');
require('dotenv').config();
const BadRequestError = require('../middlewares/BadRequestError');
const ConflictError = require('../middlewares/ConflictError');

module.exports.updateUser = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const { name, email } = req.body;
    const userValidation = await User.findOne({ email });
    if (userValidation) {
      next(new ConflictError('Пользователь с таким email уже существует'));
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    res.status(200).send({ data: updatedUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        next(new BadRequestError('Пользователь не найден'));
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id пользователя'));
      }
      next(err);
    });
};
