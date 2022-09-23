const returnError = (err, req, res, next) => {
  res
    .status(err.httpError || 500)
    .send({
      success: false,
      code: err.httpError || 500,
      message: err.message,
      detail: err.detail || "Error en el servicio",
    });
};

function logError(err, req, res, next) {
  console.log(err);
  next(err);
}

module.exports = {
  logError,
  returnError,
};
