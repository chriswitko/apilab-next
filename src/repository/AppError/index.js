'use strict'
const AppError = (message = 'An error has occured', code = 500) => {
  return {
    error: {
      message,
      code
    }
  }
}

module.exports = AppError
