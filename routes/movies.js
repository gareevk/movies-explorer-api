const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegEx = require('../utils/urlValidation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2),
    image: Joi.string().required().pattern(urlRegEx),
    trailerLink: Joi.string().required().pattern(urlRegEx),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    movieId: Joi.string().required().min(2),
    nameRU: Joi.string().required().min(2).pattern(/[\w?!,.а-яё0-9\s]+/i),
    nameEN: Joi.string().required().min(2).pattern(/[\w?!,.a-z0-9\s]+/i),
  }),
}), createMovie);

module.exports = router;
