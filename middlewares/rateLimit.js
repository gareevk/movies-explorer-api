const rateLimit = require('express-rate-limit');
const limiterConfig = require('../utils/config');

const limiter = rateLimit(limiterConfig);

module.exports = { limiter };
