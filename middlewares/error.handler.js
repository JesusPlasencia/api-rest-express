function loggingErrors(err, req, res, next) {
  // console.log('loggingErrors');
  // console.log(err);
  next(err);
}

function errorHandler(err, req, res) {
  //console.log('errorHandler');
  res.status(500).json({
    message: err,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = {
  loggingErrors,
  errorHandler,
  boomErrorHandler,
};
