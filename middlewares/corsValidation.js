/* eslint-disable object-shorthand */
/* eslint-disable linebreak-style */
const allowedCors = require('../utils/allowedCors');

// eslint-disable-next-line consistent-return
module.exports.corsValidation = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  console.log(origin);
  console.log(method);
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
