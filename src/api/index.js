'use strict'

module.exports = (app, options) => {
  app.get('/api/test', (req, res, next) => {
    next(new Error('Something went wrong :-('))
  })
}

