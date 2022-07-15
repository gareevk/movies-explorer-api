const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGODB_URL } = require('./utils/config');
//const { corsValidation } = require('./middlewares/corsValidation');

const app = express();

//app.use(corsValidation);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URL);

app.use(express.json());

app.use(requestLogger);

app.use(helmet());

app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: err.message });
  next();
});

app.listen(PORT);
