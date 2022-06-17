/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
const ObjectId = require('mongoose').Types.ObjectId;
const Movie = require('../models/movie');
const BadRequestError = require('../middlewares/BadRequestError');
const NotFoundError = require('../middlewares/NotFoundError');
const ForbiddenError = require('../middlewares/ForbiddenError');
const ConflictError = require('../middlewares/ConflictError');

module.exports.getMovies = (req, res, next) => {
  console.log('get');
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    if (req.params.movieId.length !== 24 || !ObjectId.isValid(req.params.movieId)) {
      next(new BadRequestError('Передан некорректный id фильма'));
      return;
    }
    const deleteMovie = await Movie.findById(req.params.movieId);
    if (!deleteMovie) {
      next(new NotFoundError('Фильм не найден'));
      return;
    }
    if (!deleteMovie.owner.toString().includes(req.user._id)) {
      next(new ForbiddenError('У вас нет прав на удаление данного фильма'));
      return;
    }
    await Movie.findByIdAndRemove(req.params.movieId);
    res.status(200).send({ data: deleteMovie });
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  console.log(req.body);
  try {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, link, thumbnail, movieId } = req.body;
    const movieValidation = await Movie.findOne({ movieId });
    if (movieValidation) {
      next(new ConflictError('Такой фильм уже существует'));
      return;
    }
    const owner = req.user._id;
    const newMovie = await Movie.create({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailer: trailer,
      nameRU: nameRU,
      nameEN: nameEN,
      link: link,
      thumbnail: thumbnail,
      movieId: movieId,
      owner: owner,
    });
    console.log(newMovie);
    res.status(200).send({ data: newMovie });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};
