const User = require('../models/user');
require('dotenv').config();
const BadRequestError = require('../middlewares/BadRequestError');
const ConflictError = require('../middlewares/ConflictError');
const error = require('../utils/constants');

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userValidation = await User.findOne({ email });
    if (userValidation) {
      next(new ConflictError(error.emailExistsError));
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
      next(new BadRequestError(error.incorrectInputError));
    }
    next(err);
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        next(new BadRequestError(error.userNotFoundError));
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(error.incorrectUserIdError));
      }
      next(err);
    });
};
