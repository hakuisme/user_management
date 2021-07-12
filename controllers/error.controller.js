module.exports = (err, req, res, next) => {
  if (err.code === 404 || err.code === 500 || err.code === 401 || err.code === 11000) {
    let codex = 200
    err.headerCode = codex
    err.success = err.success || false
  } else {
    err.headerCode = err.code || 200
    err.success = err.success || false
    if (err.code === undefined) {
      err.code = 500
      // err.message = 'Terjadi Kesalahan Internal'
    }
  }

  res.status(err.headerCode).json({
    code: err.code,
    success: err.success,
    message: err.message
  })
}
