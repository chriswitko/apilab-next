'use strict'

const status = require('http-status')

const ResponseInterceptor = (data, res) => {
  if (data) {
    return res.status(status.OK).json(data)
  } else {
    return res.status(status.BAD_REQUEST).json({
      error: {
        message: 'No content',
        code: 400
      }
    })
  }
}

module.exports = ResponseInterceptor
