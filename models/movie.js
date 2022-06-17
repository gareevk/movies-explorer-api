/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const urlRegEx = require('../utils/urlValidation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: urlRegEx,
  },
  trailer: {
    type: String,
    required: true,
    validate: urlRegEx,
  },
  nameRU: {
    type: String,
    required: true,
    validate: /[\w?!,.а-яё0-9\s]+/ig,
  },
  nameEN: {
    type: String,
    required: true,
    validate: /[\w?!,.a-z0-9\s]+/ig,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: urlRegEx,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
