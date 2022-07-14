const {
  MONGODB_URL = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env;

const limiterConfig = {
  windowMs: 15 * 60 * 100,
  max: 1000,
  message: 'Слишком много запросов с вашего IP, попробуйте еще раз позже',
};

module.exports = { MONGODB_URL, PORT, limiterConfig };
