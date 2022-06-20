const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser } = require('./middlewares/register');
const { login } = require('./middlewares/login');
const NotFoundError = require('./middlewares/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsValidation } = require('./middlewares/corsValidation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(corsValidation);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
