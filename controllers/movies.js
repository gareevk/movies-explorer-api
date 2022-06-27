const ObjectId = require('objectid');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ConflictError = require('../errors/ConflictError');
const error = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    if (req.params.movieId.length !== 24 || !ObjectId.isValid(req.params.movieId)) {
      next(new BadRequestError(error.incorrectMovieId));
      return;
    }
    const deleteMovie = await Movie.findById(req.params.movieId);
    if (!deleteMovie) {
      next(new NotFoundError(error.movieNotFoundError));
      return;
    }
    if (!deleteMovie.owner.toString().includes(req.user._id)) {
      next(new ForbiddenError(error.movieDeletePermissionError));
      return;
    }
    await Movie.findByIdAndRemove(req.params.movieId);
    res.status(200).send({ data: deleteMovie });
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      trailerLink,
      thumbnail,
      movieId,
    } = req.body;
    const movieValidation = await Movie.findOne({ movieId });
    if (movieValidation) {
      next(new ConflictError(error.movieExistsError));
      return;
    }
    const owner = req.user._id;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      trailerLink,
      thumbnail,
      movieId,
      owner,
    });
    res.status(200).send({ data: newMovie });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(error.incorrectInputError));
      return;
    }
    next(err);
  }
};
