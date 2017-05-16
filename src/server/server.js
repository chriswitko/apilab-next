const express = require('express')
const next = require('next')
const morgan = require('morgan')
const helmet = require('helmet')
const api = require('../api')
const movies = require('../api/movies')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()

const start = (options) => {
  return new Promise((resolve, reject) => {
    app.prepare()
      .then(() => {
        if (!options.repo) {
          reject(new Error('The server must be started with a connected repository'))
        }
        if (!options.port) {
          reject(new Error('The server must be started with an available port'))
        }

        const server = express()
        server.use(morgan('dev'))
        server.use(helmet())

        api(server, options)
        movies(server, options)

        server.get('*', (req, res) => {
          return handle(req, res)
        })

        server.use((err, req, res, next) => {
          reject(new Error('Something went wrong!, err:' + err))
          res.status(500).send('Something went wrong!')
        })

        server.listen(options.port, () => resolve(server))
      })
      .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
      })
  })
}

module.exports = Object.assign({}, {start})
