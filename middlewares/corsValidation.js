const { allowedCors } = require('../utils/constants');

module.exports.corsValidation = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  console.log(method);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }

  console.log(allowedCors.includes(origin));
  if (allowedCors.includes(origin)) {
    console.log(allowedCors.includes(origin));
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    console.log(allowedCors.includes(origin));
  }

  next();
};
