const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const { createUser } = require('./middlewares/Register');
const { login } = require('./middlewares/SignIn');
const NotFoundError = require('./middlewares/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsValidation } = require('./middlewares/corsValidation');
const { createUserValidation, loginValidation } = require('./middlewares/validation');
const error = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { MONGODB_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

app.use(corsValidation);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URL);

app.use(express.json());

app.use(requestLogger);

app.use(helmet());

app.post('/signup', createUserValidation, createUser);

app.post('/signin', loginValidation, login);

app.use(auth);

app.use('/', require('./routes/index'));

app.use('*', (req, res, next) => {
  next(new NotFoundError(error.pageNotFoundError));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: err.message });
  next();
});

app.listen(PORT);
