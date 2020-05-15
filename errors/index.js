const IERROR = require('./IERROR')
module.exports = errorHandler = (err, isDebug = false) => {
  isDebug && console.log(err)

  const message = {
    name: err.name,
    detail: err.message
  }

  switch (err.name) {
    case IERROR.VALIDATION_ERROR:
      return {
        status: 400,
        message,
      }
    case IERROR.USER_PERMISSION_DENIED:
      return {
        status: 403,
        message
      }
    case IERROR.USER_NOT_FOUND:
      return {
        status: 404,
        message
      }
    default:
      return {
        status: 500,
        message,
      }
  }
}
