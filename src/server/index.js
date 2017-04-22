'use strict'
const {EventEmitter} = require('events')
const server = require('./server')
const config = require('../config/')
const mediator = new EventEmitter()

const initRepository = (db, repository) => {
  let rep
  repository.connect(db)
    .then(repo => {
      console.log('Connected. Starting Server')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
}

const startServerWithDatabase = (repository) => {
  mediator.on('db.ready', (db) => {
    initRepository(db, repository)
  })

  mediator.on('db.error', (err) => {
    console.error(err)
  })

  config.db.connect(config.dbSettings, mediator)
}

const startStaticServer = _ => {
  return server.start({
    port: config.serverSettings.port,
    ssl: config.serverSettings.ssl
  })
}

module.exports = Object.assign({}, {startStaticServer, startServerWithDatabase})

