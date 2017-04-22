'use strict'

const ResponseInterceptor = require('./ResponseInterceptor')

module.exports = (app, options) => {
  app.get('/', (req, res, next) => {
    ResponseInterceptor({
      hello: 'World'
    }, res)
  })

  app.get('/test', (req, res, next) => {
    next(new Error('Something went wrong :-('))
  })
}

